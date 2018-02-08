import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { User } from '../../../shared/sdk/models';
import { UserService } from '../../../services/user.service';
import { Role } from '../../../shared/sdk/models/Role';
import { RoleService } from '../../../services/role.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {

  user = {} as User;
  roles: Observable<Role[]>;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private roleService: RoleService,
  ) {
  }

  ngOnInit() {
    this.route.paramMap
      .filter((paramMap: ParamMap) => paramMap.get('id') !== null)
      .switchMap((paramMap: ParamMap) => this.userService.getUserById(parseInt(paramMap.get('id'), 10)))
      .subscribe((user: User) => {
        this.user = user;
      });
    this.roles = this.roleService.getRoles();
  }

  createOrUpdateUser() {
    this.userService.createOrUpdateUserWithRoles(this.user).subscribe(
      () => {
        this.router.navigate(['/users']);
      },
      (err) => {
        console.error(err);
        alert(err.message);
      },
    );
  }

  updateRoles(role, checked) {
    if (checked) {
      this.user.roles = (this.user.roles || []).concat([role]);
    } else {
      this.user.roles = this.user.roles.filter(current => role.id !== current.id);
    }
  }

}
