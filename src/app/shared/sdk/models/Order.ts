/* tslint:disable */
import {
  OrderContribution
} from '../index';

declare var Object: any;
export interface OrderInterface {
  "name": string;
  "amount": number;
  "id"?: number;
  contributions?: OrderContribution[];
}

export class Order implements OrderInterface {
  "name": string;
  "amount": number;
  "id": number;
  contributions: OrderContribution[];
  constructor(data?: OrderInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Order`.
   */
  public static getModelName() {
    return "Order";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Order for dynamic purposes.
  **/
  public static factory(data: OrderInterface): Order{
    return new Order(data);
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
      name: 'Order',
      plural: 'Orders',
      path: 'Orders',
      properties: {
        "name": {
          name: 'name',
          type: 'string'
        },
        "amount": {
          name: 'amount',
          type: 'number'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
      },
      relations: {
        contributions: {
          name: 'contributions',
          type: 'OrderContribution[]',
          model: 'OrderContribution'
        },
      }
    }
  }
}
