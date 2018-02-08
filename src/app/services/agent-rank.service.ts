import { Injectable } from '@angular/core';
import { AgentRankApi } from '../shared/sdk/services/custom/AgentRank';
import { Observable } from 'rxjs/Observable';
import { AgentRank } from '../shared/sdk/models/AgentRank';

@Injectable()
export class AgentRankService {

  constructor(
    private agentRankApi: AgentRankApi,
  ) {
  }

  searchAgentRanks(expression: string, limit?: number): Observable<AgentRank[]> {
    return this.agentRankApi.find({
      limit,
      where: { label: { like: `%${expression}%` } },
    });
  }

}
