/* tslint:disable */

declare var Object: any;
export interface AgentRankInterface {
  "id": string;
  "label"?: string;
}

export class AgentRank implements AgentRankInterface {
  "id": string;
  "label": string;
  constructor(data?: AgentRankInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `AgentRank`.
   */
  public static getModelName() {
    return "AgentRank";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of AgentRank for dynamic purposes.
  **/
  public static factory(data: AgentRankInterface): AgentRank{
    return new AgentRank(data);
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
      name: 'AgentRank',
      plural: 'AgentRanks',
      path: 'AgentRanks',
      properties: {
        "id": {
          name: 'id',
          type: 'string'
        },
        "label": {
          name: 'label',
          type: 'string'
        },
      },
      relations: {
      }
    }
  }
}
