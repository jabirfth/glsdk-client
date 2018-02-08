import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from './services/authorization.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { User } from './shared/sdk/models';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  title: string;
  sidebarOpened: boolean;
  user: Observable<User>;

  constructor(
    private authorizationService: AuthorizationService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private titleService: Title,
  ) {
  }

  login(): void {
    this.router.navigate(['/login']);
  }

  logout(): void {
    this.authorizationService.logout();
  }

  toggleSidenav(): void {
    this.sidebarOpened = !this.sidebarOpened;
  }

  initResponsive(): void {
    this.detectResponsive();
    window.addEventListener('resize', () => {
      this.detectResponsive();
    });
  }

  detectResponsive(): void {
    this.sidebarOpened = window.outerWidth > 1150;
  }

  get authenticated(): boolean {
    return this.authorizationService.isAuthenticated();
  }

  ngOnInit(): void {
    this.initResponsive();
    this.user = this.authorizationService.getCurrentUser();
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .map(() => this.activatedRoute)
      .map((route) => {
        let r = route;
        while (r.firstChild) r = r.firstChild;
        return r;
      })
      .filter(route => route.outlet === 'primary')
      .mergeMap(route => route.data)
      .subscribe((event) => {
        this.title = event['title'][window.navigator.language];
        this.titleService.setTitle(this.title);
      });
  }
}
