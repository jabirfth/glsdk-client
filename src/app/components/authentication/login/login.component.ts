import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import {
    AuthorizationProvider, AuthorizationService,
} from '../../../services/authorization.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  host: {
    class: 'l-flexCentered',
  },
})
export class LoginComponent {

  username: string;
  password: string;
  mode: string = 'ldap';
  errorMessage: string;
  submitDisabled = false;

  constructor(
    private authorizationService: AuthorizationService,
    private router: Router,
  ) {
  }

  login(): void {
    delete this.errorMessage;
    this.submitDisabled = true;
    this.authorizationService.login(this.getProvider(), this.username, this.password)
      .subscribe(
        () => {
          this.router.navigate(['/']);
        },
        (err: HttpErrorResponse) => {
          this.errorMessage = err.message;
          this.submitDisabled = false;
        },
      );
  }

  private getProvider() {
    let provider = AuthorizationProvider.LDAP;
    if (this.mode === 'database') {
      provider = AuthorizationProvider.DATABASE;
    }
    return provider;
  }

  loginWithFranceConnect() {
    this.authorizationService.login(AuthorizationProvider.FRANCE_CONNECT);
  }

}
