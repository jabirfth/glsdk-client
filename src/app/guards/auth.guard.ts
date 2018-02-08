import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthorizationService } from '../services/authorization.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private authorizationService: AuthorizationService,
  ) {}

  canActivate() {
    return Observable.of(this.authorizationService.isAuthenticated());
  }

}
