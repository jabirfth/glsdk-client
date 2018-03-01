import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, PageEvent } from '@angular/material';
import { UserCriteria, UserDataSource } from './user.datasource';
import { UserService } from '../../../services/user.service';
import { CsvExportService } from '../../../services/csv-exporter.service';
import { AdminGuard } from '../../../guards/admin.guard';
import { User } from 'app/shared/sdk';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [UserDataSource],
})
export class UsersComponent implements OnInit {

  private _criteria: UserCriteria;
  private _usernameFilterExpression: string;

  displayedColumns = ['username', 'email', 'roles', 'actions'];
  pageEvent: PageEvent;

  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 100];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sorter: MatSort;

  constructor(
    private userService: UserService,
    private csvExportService: CsvExportService,
    public dataSource: UserDataSource,
    public adminGuard: AdminGuard,
  ) {
  }

  ngOnInit(): void {
    this.dataSource.init(this.paginator, this.sorter, this.criteria);
    this.userService.usersChange.subscribe(() => {
      this.dataSource.reload();
    });
  }

  get totalElements() {
    return this.dataSource.totalElements;
  }

  get criteria(): UserCriteria {
    return this._criteria;
  }

  set criteria(value: UserCriteria) {
    this._criteria = value;
    this.dataSource.changeCriteria(this.criteria);
  }

  get usernameFilterExpression() {
    return this._usernameFilterExpression;
  }

  set usernameFilterExpression(value) {
    this._usernameFilterExpression = value;
    this.criteria = Object.assign({}, this.criteria, { username : { like: `%${value}%` } });
    this.dataSource.changeCriteria(this.criteria);
  }

  export() : void {
    this.csvExportService.exportUsers(this.dataSource.pageFilter);
  }

  displayUserRoles(user: User): string {
    return user.roles.map(role => role.name).join(', ');
  }

  deleteUser(user): boolean {
    this.userService.removeUser(user).subscribe();
    return false;
  }
}
