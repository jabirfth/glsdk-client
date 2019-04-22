import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { SDKToken } from '../shared/sdk/models/BaseModels';
import { LoginService } from './login.service';

const ldapAuthEndpoint = `${environment.loopback.baseUrl}/api/users/login`;

@Injectable()
export class DatabaseLoginService implements LoginService {

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  login(username: string, password: string): Observable<SDKToken> {
    return this.httpClient.post(ldapAuthEndpoint, { username, password }).pipe(
      map(
        (response: { id: string, userId: string }) => {
          return new SDKToken({ id: response.id, userId: response.userId });
        },
      ));
  }

}
