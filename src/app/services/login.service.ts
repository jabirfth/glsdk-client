import { Observable } from 'rxjs';

import { SDKToken } from '../shared/sdk/models/BaseModels';

export interface LoginService {

  login(...args: any[]): Observable<SDKToken>;

}
