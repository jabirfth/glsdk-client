import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { SDKToken } from '../shared/sdk/models/BaseModels';
import { LoginService } from './login.service';

const ldapAuthEndpoint = `${environment.loopback.baseUrl}/auth/ldap`;

@Injectable()
export class LdapLoginService implements LoginService {

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  login(username: string, password: string): Observable<SDKToken> {
    return this.httpClient.post(ldapAuthEndpoint, { username, password })
      .map(
        (response: { access_token: string, userId: string }) =>
          new SDKToken({ id: response.access_token, userId: response.userId }),
      );
  }

}
