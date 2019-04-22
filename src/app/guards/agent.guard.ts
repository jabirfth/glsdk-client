import { map } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { AuthorizationService } from '../services/authorization.service';

@Injectable()
export class AgentGuard implements CanActivate {

  constructor(
    private authorizationService: AuthorizationService,
  ) {}

  canActivate() {
    return this.authorizationService.getCurrentUser()
    .pipe(
      map(user => user && !!user.roles.find(role => role.name === 'agent')),
    );
  }

}
