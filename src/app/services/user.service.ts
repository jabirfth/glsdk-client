import { Injectable } from '@angular/core';
import { User } from '../shared/sdk/models';
import { UserApi } from '../shared/sdk/services/custom';
import { Observable } from 'rxjs/Observable';
import { LoopBackFilter } from '../shared/sdk/models/BaseModels';
import { Subject } from 'rxjs/Subject';
import { RoleMappingApi } from '../shared/sdk/services/custom/RoleMapping';

@Injectable()
export class UserService {

  private usersChangeSubject = new Subject<void>();

  constructor(
    private userApi: UserApi,
    private roleMappingApi: RoleMappingApi,
  ) {
  }

  createOrUpdateUserWithRoles(user: User): Observable<User> {
    let savedUser;
    return this.userApi.upsert(user)
      .switchMap((result) => {
        savedUser = result;
        return this.userApi.deleteRoles(savedUser.id);
      })
      .switchMap(() => this.roleMappingApi.createMany(
        user.roles.map(role => ({
          principalType: 'USER',
          principalId: savedUser.id,
          roleId: role.id,
        })),
      ))
      .map(() => Object.assign({}, user, { id: savedUser.id }));
  }

  getUsers(filter: LoopBackFilter): Observable<User[]> {
    return this.userApi.find(Object.assign({}, filter, { include: ['roles'] }));
  }

  countUsers(where: any): Observable<number> {
    return this.userApi.count(where)
      .map(result => result.count);
  }

  removeUser(user: User): Observable<void> {
    return this.userApi.deleteById(user.id);
  }

  get usersChange() {
    return this.usersChangeSubject;
  }

  getUserById(userId: number): Observable<User> {
    return this.userApi.findById(userId);
  }
}
