import { Component } from '@angular/core';
import { LocaleUtils } from '../../../locale/LocaleUtils';
import { AgentGuard } from '../../guards/agent.guard';
import { AdminGuard } from '../../guards/admin.guard';
import { AuthGuard } from '../../guards/auth.guard';

@Component({
  selector: 'app-menu',
  templateUrl: 'menu.component.html',
  styleUrls: [
    'menu.component.scss',
  ],
})
export class MenuComponent {

  constructor(
    public adminGuard: AdminGuard,
    public agentGuard: AgentGuard,
    public authGuard: AuthGuard,
  ) {
  }

  changeLanguage(): void {
    LocaleUtils.switchLanguage();
  }

}
