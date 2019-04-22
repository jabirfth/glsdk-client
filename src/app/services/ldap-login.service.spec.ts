import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, getTestBed, TestBed } from '@angular/core/testing';

import { environment } from '../../environments/environment';
import { SDKToken } from '../shared/sdk/models/BaseModels';
import { LdapLoginService } from './ldap-login.service';

describe('LdapLoginService', () => {

  let injector: TestBed;
  let service: LdapLoginService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
      ],
      providers: [
        LdapLoginService,
      ],
    });
    injector = getTestBed();
    service = injector.get(LdapLoginService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should post to /auth/ldap and convert response into SDKToken when login is successful', async(() => {
    const username = 'username';
    const password = 'password';
    const userId = 2;
    const accessToken = 'qxpRhdll0ab32HRf3ZNOF2TsAkf2V8i09tF7r7z6dr5BgIxC5fo7Y2iC9TAvaPDD';

    service.login(username, password).subscribe((token: SDKToken) => {
      expect(token).toEqual(jasmine.any(SDKToken));
      expect(token.userId).toEqual(userId);
      expect(token.id).toEqual(accessToken);
    });

    const expectedRequest = httpMock.expectOne({
      url: `${environment.loopback.baseUrl}/auth/ldap`,
      method: 'POST',
    });
    expect(expectedRequest.request.body).toEqual({ username, password });
    expectedRequest.flush({ userId, access_token: accessToken });
  }));

});
