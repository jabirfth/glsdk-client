import { MatTableDataSource } from '../../../utils/data-source';
import { Injectable } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../shared/sdk/models/User';
import { LoopBackFilter } from '../../../shared/sdk/models/BaseModels';
import { Observable } from 'rxjs';

@Injectable()
export class UserDataSource extends MatTableDataSource<User, UserCriteria> {

  constructor(
    private userService: UserService,
  ) {
    super();
  }

  protected getData(pageFilter: LoopBackFilter): Observable<User[]> {
    return this.userService.getUsers(pageFilter);
  }

  protected countData(criteria: {} | UserCriteria): Observable<number> {
    return this.userService.countUsers(criteria);
  }
}

export interface UserCriteria {
  name?: string;
}
