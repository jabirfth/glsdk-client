import { Observable, Subject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { Injectable } from '@angular/core';

import { User } from '../shared/sdk/models';
import { LoopBackFilter } from '../shared/sdk/models/BaseModels';
import { UserApi } from '../shared/sdk/services/custom';

@Injectable()
export class UserService {

  private usersChangeSubject = new Subject<void>();

  constructor(
    private userApi: UserApi,
  ) {
  }

  createOrUpdateUserWithRoles(user: User): Observable<User> {
    let savedUser;
    return this.userApi.upsert(user).pipe(
      switchMap((result: User) => {
        savedUser = result;
        return this.userApi.replaceRoles(savedUser.id, user.roles.map(role => role.id));
      }),
      map(() => Object.assign({}, user, { id: savedUser.id })));
  }

  getUsers(filter: LoopBackFilter): Observable<User[]> {
    return this.userApi.find(Object.assign({}, filter, { include: ['roles'] }));
  }

  countUsers(where: any): Observable<number> {
    return this.userApi.count(where)
      .pipe(map(result => result.count));
  }

  removeUser(user: User): Observable<void> {
    return this.userApi.deleteById<void>(user.id);
  }

  get usersChange() {
    return this.usersChangeSubject;
  }

  getUserById(userId: number): Observable<User> {
    return this.userApi.findById(userId);
  }
}
