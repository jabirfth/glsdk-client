/* tslint:disable */
import {
  City
} from '../index';

declare var Object: any;
export interface RoadInterface {
  "id": number;
  "cityCode": string;
  "label"?: string;
  city?: City;
}

export class Road implements RoadInterface {
  "id": number;
  "cityCode": string;
  "label": string;
  city: City;
  constructor(data?: RoadInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Road`.
   */
  public static getModelName() {
    return "Road";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Road for dynamic purposes.
  **/
  public static factory(data: RoadInterface): Road{
    return new Road(data);
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
      name: 'Road',
      plural: 'Roads',
      path: 'Roads',
      properties: {
        "id": {
          name: 'id',
          type: 'number'
        },
        "cityCode": {
          name: 'cityCode',
          type: 'string'
        },
        "label": {
          name: 'label',
          type: 'string'
        },
      },
      relations: {
        city: {
          name: 'city',
          type: 'City',
          model: 'City'
        },
      }
    }
  }
}
