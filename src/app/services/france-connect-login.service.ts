import { EMPTY, Observable } from 'rxjs';

import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { SDKToken } from '../shared/sdk/models/BaseModels';
import { LoginService } from './login.service';

const config = environment.franceConnect;

@Injectable()
export class FranceConnectLoginService implements LoginService {

  login(): Observable<SDKToken> {
    window.location.href = config.authorizeEndpoint;
    return EMPTY;
  }

}
