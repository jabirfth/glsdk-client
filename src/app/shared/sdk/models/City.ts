/* tslint:disable */
import {
  Road
} from '../index';

declare var Object: any;
export interface CityInterface {
  "code"?: string;
  "name": string;
  "nameMin": string;
  "postalCode"?: string;
  "mayorName"?: string;
  "inhabitants"?: string;
  "income"?: string;
  roads?: Road[];
}

export class City implements CityInterface {
  "code": string;
  "name": string;
  "nameMin": string;
  "postalCode": string;
  "mayorName": string;
  "inhabitants": string;
  "income": string;
  roads: Road[];
  constructor(data?: CityInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `City`.
   */
  public static getModelName() {
    return "City";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of City for dynamic purposes.
  **/
  public static factory(data: CityInterface): City{
    return new City(data);
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
      name: 'City',
      plural: 'Cities',
      path: 'Cities',
      properties: {
        "code": {
          name: 'code',
          type: 'string'
        },
        "name": {
          name: 'name',
          type: 'string'
        },
        "nameMin": {
          name: 'nameMin',
          type: 'string'
        },
        "postalCode": {
          name: 'postalCode',
          type: 'string'
        },
        "mayorName": {
          name: 'mayorName',
          type: 'string'
        },
        "inhabitants": {
          name: 'inhabitants',
          type: 'string'
        },
        "income": {
          name: 'income',
          type: 'string',
          default: 'N'
        },
      },
      relations: {
        roads: {
          name: 'roads',
          type: 'Road[]',
          model: 'Road'
        },
      }
    }
  }
}
