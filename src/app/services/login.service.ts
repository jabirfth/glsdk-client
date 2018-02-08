import { Observable } from 'rxjs/Observable';
import { SDKToken } from '../shared/sdk/models/BaseModels';

export interface LoginService {

  login(...args: any[]): Observable<SDKToken>;

}
