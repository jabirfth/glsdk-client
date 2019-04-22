
import { of as observableOf,  Observable } from 'rxjs';
import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthorizationService } from '../services/authorization.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private authorizationService: AuthorizationService,
  ) {}

  canActivate() {
    return observableOf(this.authorizationService.isAuthenticated());
  }

}
