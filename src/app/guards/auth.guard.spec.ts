import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {

  describe('canActivate()', () => {

    it('should return false is not authenticated', () => {
      // Given
      const authorizationServiceMock = jasmine.createSpyObj('authorizationService', {
        isAuthenticated: false,
      });
      const authGuard = new AuthGuard(authorizationServiceMock);

      // When
      const observable = authGuard.canActivate();

      // Then
      observable.subscribe((result) => {
        expect(result).toBeFalsy();
        expect(authorizationServiceMock.isAuthenticated).toHaveBeenCalled();
      });
    });

    it('should return true when user is authenticated', () => {
      // Given
      const authorizationServiceMock = jasmine.createSpyObj('authorizationService', {
        isAuthenticated: true,
      });
      const authGuard = new AuthGuard(authorizationServiceMock);

      // When
      const observable = authGuard.canActivate();

      // Then
      observable.subscribe((result) => {
        expect(result).toBeTruthy();
        expect(authorizationServiceMock.isAuthenticated).toHaveBeenCalled();
      });
    });

  });

});
