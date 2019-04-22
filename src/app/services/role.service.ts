import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';

import { Role } from '../shared/sdk/models/Role';
import { RoleApi } from '../shared/sdk/services/custom/Role';

@Injectable()
export class RoleService {

  constructor(
    private roleApi: RoleApi,
  ) {
  }

  getRoles(): Observable<Role[]> {
    return this.roleApi.find();
  }

}
