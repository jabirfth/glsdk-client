/* tslint:disable */

declare var Object: any;
export interface DepartmentInterface {
  "id": string;
  "label"?: string;
  "shortLabel"?: string;
}

export class Department implements DepartmentInterface {
  "id": string;
  "label": string;
  "shortLabel": string;
  constructor(data?: DepartmentInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Department`.
   */
  public static getModelName() {
    return "Department";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Department for dynamic purposes.
  **/
  public static factory(data: DepartmentInterface): Department{
    return new Department(data);
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
      name: 'Department',
      plural: 'Departments',
      path: 'Departments',
      properties: {
        "id": {
          name: 'id',
          type: 'string'
        },
        "label": {
          name: 'label',
          type: 'string'
        },
        "shortLabel": {
          name: 'shortLabel',
          type: 'string'
        },
      },
      relations: {
      }
    }
  }
}
