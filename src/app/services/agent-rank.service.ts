import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';

import { AgentRank } from '../shared/sdk/models/AgentRank';
import { AgentRankApi } from '../shared/sdk/services/custom/AgentRank';

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
