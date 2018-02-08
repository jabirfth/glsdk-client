/* tslint:disable */
import {
  Order,
  Agent
} from '../index';

declare var Object: any;
export interface OrderContributionInterface {
  "amount": number;
  "agentId": string;
  "orderId": number;
  "id"?: number;
  order?: Order;
  agent?: Agent;
}

export class OrderContribution implements OrderContributionInterface {
  "amount": number;
  "agentId": string;
  "orderId": number;
  "id": number;
  order: Order;
  agent: Agent;
  constructor(data?: OrderContributionInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `OrderContribution`.
   */
  public static getModelName() {
    return "OrderContribution";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of OrderContribution for dynamic purposes.
  **/
  public static factory(data: OrderContributionInterface): OrderContribution{
    return new OrderContribution(data);
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
      name: 'OrderContribution',
      plural: 'OrderContributions',
      path: 'OrderContributions',
      properties: {
        "amount": {
          name: 'amount',
          type: 'number'
        },
        "agentId": {
          name: 'agentId',
          type: 'string'
        },
        "orderId": {
          name: 'orderId',
          type: 'number'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
      },
      relations: {
        order: {
          name: 'order',
          type: 'Order',
          model: 'Order'
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
