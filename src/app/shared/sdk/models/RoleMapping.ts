/* tslint:disable */
import {
  User,
  Role
} from '../index';

declare var Object: any;
export interface RoleMappingInterface {
  "id"?: number;
  "principalType"?: string;
  "principalId"?: number;
  "roleId"?: number;
  role?: User;
  user?: Role;
}

export class RoleMapping implements RoleMappingInterface {
  "id": number;
  "principalType": string;
  "principalId": number;
  "roleId": number;
  role: User;
  user: Role;
  constructor(data?: RoleMappingInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `RoleMapping`.
   */
  public static getModelName() {
    return "RoleMapping";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of RoleMapping for dynamic purposes.
  **/
  public static factory(data: RoleMappingInterface): RoleMapping{
    return new RoleMapping(data);
  }
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'RoleMapping',
      plural: 'RoleMappings',
      path: 'RoleMappings',
      properties: {
        "id": {
          name: 'id',
          type: 'number'
        },
        "principalType": {
          name: 'principalType',
          type: 'string'
        },
        "principalId": {
          name: 'principalId',
          type: 'number'
        },
        "roleId": {
          name: 'roleId',
          type: 'number'
        },
      },
      relations: {
        role: {
          name: 'role',
          type: 'User',
          model: 'User'
        },
        user: {
          name: 'user',
          type: 'Role',
          model: 'Role'
        },
      }
    }
  }
}
