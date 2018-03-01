import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthorizationService } from '../services/authorization.service';

@Directive({ selector: '[appShowToRoles]' })
export class ShowToRolesDirective {

  rolesArray: string[];

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authorizationService: AuthorizationService,
  ) { }

  @Input()
  set appShowToRoles(rolesArray: string[]) {
    this.rolesArray = rolesArray;
  }

  ngOnInit() {
    this.authorizationService.getCurrentUser().subscribe((user) => {
      if (user) {
        const userRoles = user.roles.map(role => role.name);
        const commonRoles = userRoles.filter((userRole) => {
          return this.rolesArray.indexOf(userRole) !== -1;
        });
        if (commonRoles.length > 0) {
          return this.viewContainer.createEmbeddedView(this.templateRef);
        }
      }
      this.viewContainer.clear();
    });
  }

}
