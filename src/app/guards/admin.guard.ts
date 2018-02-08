import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthorizationService } from '../services/authorization.service';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(
    private authorizationService: AuthorizationService,
  ) {}

  canActivate() {
    return this.authorizationService.getCurrentUser()
      .map(user => user && !!user.roles.find(role => role.name === 'admin'));
  }

}
