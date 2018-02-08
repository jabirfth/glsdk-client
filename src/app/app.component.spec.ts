import { async, TestBed } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { MatIconModule, MatListModule, MatSidenavModule, MatToolbarModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthorizationService } from './services/authorization.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Component } from '@angular/core';
import { MockComponent } from 'ng2-mock-component';

Object.defineProperty(document.body.style, 'transform', {
  value: () => {
    return {
      enumerable: true,
      configurable: true,
    };
  },
});

@Component({ template: '' })
class EmptyComponent {}

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        EmptyComponent,
        MockComponent({ selector: 'app-menu' }),
      ],
      imports: [
        MatIconModule,
        MatListModule,
        MatToolbarModule,
        RouterTestingModule.withRoutes([
          {
            path: '',
            component: EmptyComponent,
            data: {
              title: { 'en-US': 'Welcome', fr: 'Bienvenue' },
            },
          },
        ]),
        MatSidenavModule,
        NoopAnimationsModule,
      ],
      providers: [
        {
          provide: AuthorizationService,
          useClass: class {

          },
        },
      ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  // it(`should have as title 'app works!'`, fakeAsync(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const router: Router = TestBed.get(Router);
  //   router.navigateByUrl('/');
  //   tick(2000);
  //   console.log('coucou2');
  //   expect(fixture.nativeElement.innerHTML).toContain('Welcome');
  // }));

});
