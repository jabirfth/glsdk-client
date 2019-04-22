import { Injectable } from '@angular/core';

import { Agent } from '../../models/Agent';
import { AgentAssignment } from '../../models/AgentAssignment';
import { AgentRank } from '../../models/AgentRank';
import { City } from '../../models/City';
import { Department } from '../../models/Department';
import { Order } from '../../models/Order';
import { OrderContribution } from '../../models/OrderContribution';
import { Road } from '../../models/Road';
import { Role } from '../../models/Role';
import { RoleMapping } from '../../models/RoleMapping';
import { StorageContainer } from '../../models/StorageContainer';
import { User } from '../../models/User';

export interface Models { [name: string]: any }

@Injectable()
export class SDKModels {

  private models: Models = {
    User: User,
    RoleMapping: RoleMapping,
    Role: Role,
    City: City,
    AgentRank: AgentRank,
    Road: Road,
    Agent: Agent,
    Department: Department,
    StorageContainer: StorageContainer,
    AgentAssignment: AgentAssignment,
    Order: Order,
    OrderContribution: OrderContribution,
    
  };

  public get(modelName: string): any {
    return this.models[modelName];
  }

  public getAll(): Models {
    return this.models;
  }

  public getModelNames(): string[] {
    return Object.keys(this.models);
  }
}
