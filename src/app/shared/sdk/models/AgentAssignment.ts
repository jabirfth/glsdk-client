/* tslint:disable */
import {
  Department,
  AgentRank,
  Agent
} from '../index';

declare var Object: any;
export interface AgentAssignmentInterface {
  "beginDate": Date;
  "endDate"?: Date;
  "agentId": string;
  "rankId": string;
  "departmentId": string;
  "id"?: number;
  department?: Department;
  rank?: AgentRank;
  agent?: Agent;
}

export class AgentAssignment implements AgentAssignmentInterface {
  "beginDate": Date;
  "endDate": Date;
  "agentId": string;
  "rankId": string;
  "departmentId": string;
  "id": number;
  department: Department;
  rank: AgentRank;
  agent: Agent;
  constructor(data?: AgentAssignmentInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `AgentAssignment`.
   */
  public static getModelName() {
    return "AgentAssignment";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of AgentAssignment for dynamic purposes.
  **/
  public static factory(data: AgentAssignmentInterface): AgentAssignment{
    return new AgentAssignment(data);
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
      name: 'AgentAssignment',
      plural: 'AgentAssignments',
      path: 'AgentAssignments',
      properties: {
        "beginDate": {
          name: 'beginDate',
          type: 'Date'
        },
        "endDate": {
          name: 'endDate',
          type: 'Date'
        },
        "agentId": {
          name: 'agentId',
          type: 'string'
        },
        "rankId": {
          name: 'rankId',
          type: 'string'
        },
        "departmentId": {
          name: 'departmentId',
          type: 'string'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
      },
      relations: {
        department: {
          name: 'department',
          type: 'Department',
          model: 'Department'
        },
        rank: {
          name: 'rank',
          type: 'AgentRank',
          model: 'AgentRank'
        },
        agent: {
          name: 'agent',
          type: 'Agent',
          model: 'Agent'
        },
      }
    }
  }
}
