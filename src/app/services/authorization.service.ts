import { CookieService } from 'angular2-cookie/core';
import { Observable, ReplaySubject } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';

import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { SDKToken } from '../shared/sdk/models/BaseModels';
import { User } from '../shared/sdk/models/User';
import { LoopBackAuth } from '../shared/sdk/services/core/auth.service';
import { UserApi } from '../shared/sdk/services/custom/User';
import { DatabaseLoginService } from './bdd-login.service';
import { FranceConnectLoginService } from './france-connect-login.service';
import { LdapLoginService } from './ldap-login.service';
import { LoginService } from './login.service';

const accessTokenCookieKey = 'access_token';
const userIdCookieKey = 'userId';

@Injectable()
export class AuthorizationService {

  private currentUser = new ReplaySubject<User>(1);

  constructor(
    private cookieService: CookieService,
    private loopBackAuth: LoopBackAuth,
    private userApi: UserApi,
    private router: Router,
    private franceConnectLoginService: FranceConnectLoginService,
    private ldapLoginService: LdapLoginService,
    private databaseLoginService: DatabaseLoginService,
  ) {
    this.loadTokenFromLoopbackCookie();
  }

  private loadTokenFromLoopbackCookie() {
    const accessToken = this.cookieService.get(accessTokenCookieKey);
    const userId = this.cookieService.get(userIdCookieKey);
    if (accessToken && userId) {
      this.initLoopbackAuthToken(accessToken, parseInt(userId, 10));
      this.cookieService.remove(accessTokenCookieKey);
      this.cookieService.remove(userIdCookieKey);
    }
    this.loadUser().subscribe();
  }

  private resolveProviderLoginService(provider: AuthorizationProvider): LoginService {
    switch (provider) {
      case AuthorizationProvider.FRANCE_CONNECT:
        return this.franceConnectLoginService;
      case AuthorizationProvider.LDAP:
        return this.ldapLoginService;
      case AuthorizationProvider.DATABASE:
        return this.databaseLoginService;
    }
  }

  getCurrentUser(): Observable<User> {
    return this.currentUser;
  }

  login(provider: AuthorizationProvider, username?: string, password?: string): Observable<User> {
    return this.resolveProviderLoginService(provider).login(username, password).pipe(
      catchError((error: HttpErrorResponse): Observable<User> => {
        const message = error.status === 401 ?
          'Authentication failed' : `Unexpected error: ${error.message}`;
        throw new Error(message);
      }),
      tap((token: SDKToken) => this.initLoopbackAuthToken(token.id, token.userId)),
      switchMap(() => this.loadUser()));
  }

  logout(): void {
    this.userApi.logout().pipe(
      tap(() => this.currentUser.next(null)))
      .subscribe({
        complete: () => {
          this.router.navigate(['/login']);
        },
      });
  }

  isAuthenticated(): boolean {
    return this.loopBackAuth.getAccessTokenId() !== null;
  }

  getCurrentUserId(): string {
    return this.loopBackAuth.getCurrentUserId();
  }

  private initLoopbackAuthToken(accessToken: string, userId: Number): void {
    this.loopBackAuth.setToken({
      userId,
      id: accessToken,
      ttl: null,
      scopes: [],
      created: null,
      user: null,
      rememberMe: true,
    });
  }

  private loadUser(): Observable<User> {
    return this.userApi.getCurrent({ include: ['roles'] })
    .pipe(
      catchError((error: HttpErrorResponse): Observable<User> => {
        this.logout();
        throw error;
      }),
      tap(user => this.loopBackAuth.setUser(user)),
      tap(user => this.currentUser.next(user)),
    );
  }

}

export enum AuthorizationProvider {
  FRANCE_CONNECT,
  LDAP,
  DATABASE,
}
