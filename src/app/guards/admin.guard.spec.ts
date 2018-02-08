import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/of';
import { AdminGuard } from './admin.guard';
import { Observable } from 'rxjs/Observable';

describe('AdminGuard', () => {

  describe('canActivate()', () => {

    it('should return false when user is not an admin', () => {
      // Given
      const roles = [{ name: 'role1' }, { name: 'role2' }];
      const authorizationServiceMock = jasmine.createSpyObj('authorizationService', {
        getCurrentUser: Observable.of({ roles }),
      });
      const adminGuard = new AdminGuard(authorizationServiceMock);

      // When
      const observable = adminGuard.canActivate();

      // Then
      observable.subscribe((result) => {
        expect(result).toBeFalsy();
        expect(authorizationServiceMock.getCurrentUser).toHaveBeenCalled();
      });
    });

    it('should return true when user is an admin', () => {
      // Given
      const roles = [{ name: 'role1' }, { name: 'admin' }];
      const authorizationServiceMock = jasmine.createSpyObj('authorizationService', {
        getCurrentUser: Observable.of({ roles }),
      });
      const adminGuard = new AdminGuard(authorizationServiceMock);

      // When
      const observable = adminGuard.canActivate();

      // Then
      observable.subscribe((result) => {
        expect(result).toBeTruthy();
        expect(authorizationServiceMock.getCurrentUser).toHaveBeenCalled();
      });
    });

  });

});
