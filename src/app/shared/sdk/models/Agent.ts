/* tslint:disable */
import {
  AgentAssignment,
  OrderContribution
} from '../index';

declare var Object: any;
export interface AgentInterface {
  "id": string;
  "firstName"?: string;
  "lastName"?: string;
  "entranceDate"?: Date;
  "spinneret"?: string;
  "category"?: string;
  "status"?: string;
  "phoneNumber"?: string;
  "email"?: string;
  assignments?: AgentAssignment[];
  orderContributions?: OrderContribution[];
}

export class Agent implements AgentInterface {
  "id": string;
  "firstName": string;
  "lastName": string;
  "entranceDate": Date;
  "spinneret": string;
  "category": string;
  "status": string;
  "phoneNumber": string;
  "email": string;
  assignments: AgentAssignment[];
  orderContributions: OrderContribution[];
  constructor(data?: AgentInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Agent`.
   */
  public static getModelName() {
    return "Agent";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Agent for dynamic purposes.
  **/
  public static factory(data: AgentInterface): Agent{
    return new Agent(data);
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
      name: 'Agent',
      plural: 'Agents',
      path: 'Agents',
      properties: {
        "id": {
          name: 'id',
          type: 'string'
        },
        "firstName": {
          name: 'firstName',
          type: 'string'
        },
        "lastName": {
          name: 'lastName',
          type: 'string'
        },
        "entranceDate": {
          name: 'entranceDate',
          type: 'Date'
        },
        "spinneret": {
          name: 'spinneret',
          type: 'string'
        },
        "category": {
          name: 'category',
          type: 'string'
        },
        "status": {
          name: 'status',
          type: 'string'
        },
        "phoneNumber": {
          name: 'phoneNumber',
          type: 'string'
        },
        "email": {
          name: 'email',
          type: 'string'
        },
      },
      relations: {
        assignments: {
          name: 'assignments',
          type: 'AgentAssignment[]',
          model: 'AgentAssignment'
        },
        orderContributions: {
          name: 'orderContributions',
          type: 'OrderContribution[]',
          model: 'OrderContribution'
        },
      }
    }
  }
}
