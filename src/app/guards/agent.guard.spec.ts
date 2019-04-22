import { of as observableOf } from 'rxjs';

import { AgentGuard } from './agent.guard';

describe('AgentGuard', () => {

  describe('canActivate()', () => {

    it('should return false when user is not an agent', () => {
      // Given
      const roles = [{ name: 'role1' }, { name: 'role2' }];
      const authorizationServiceMock = jasmine.createSpyObj('authorizationService', {
        getCurrentUser: observableOf({ roles }),
      });
      const agentGuard = new AgentGuard(authorizationServiceMock);

      // When
      const observable = agentGuard.canActivate();

      // Then
      observable.subscribe((result) => {
        expect(result).toBeFalsy();
        expect(authorizationServiceMock.getCurrentUser).toHaveBeenCalled();
      });
    });

    it('should return true when user is an agent', () => {
      // Given
      const roles = [{ name: 'role1' }, { name: 'agent' }];
      const authorizationServiceMock = jasmine.createSpyObj('authorizationService', {
        getCurrentUser: observableOf({ roles }),
      });
      const agentGuard = new AgentGuard(authorizationServiceMock);

      // When
      const observable = agentGuard.canActivate();

      // Then
      observable.subscribe((result) => {
        expect(result).toBeTruthy();
        expect(authorizationServiceMock.getCurrentUser).toHaveBeenCalled();
      });
    });

  });

});
