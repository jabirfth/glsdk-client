import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { Injectable } from '@angular/core';

import { Agent } from '../shared/sdk/models/Agent';
import { AgentAssignment } from '../shared/sdk/models/AgentAssignment';
import { LoopBackFilter } from '../shared/sdk/models/BaseModels';
import { AgentApi } from '../shared/sdk/services/custom/Agent';
import { AgentAssignmentApi } from '../shared/sdk/services/custom/AgentAssignment';

@Injectable()
export class AgentService {

  private agentAssignmentsChangeSubject = new Subject<void>();
  private agentsChangeSubject = new Subject<void>();

  constructor(
    private agentApi: AgentApi,
    private agentAssignmentApi: AgentAssignmentApi,
  ) {
  }

  getAgents(filter?: LoopBackFilter): Observable<Agent[]> {
    return this.agentApi.find(filter);
  }

  countAgents(): Observable<number> {
    return this.agentApi.count(null)
      .pipe(map(result => result.count));
  }

  getAgentById(agentId: string): Observable<Agent> {
    return this.agentApi.findById(agentId);
  }

  searchAgents(expression: string, limit?: number): Observable<Agent[]> {
    return this.agentApi.find({
      limit,
      where: {
        or: [
          { firstName : { like: `%${expression}%` } },
          { lastName : { like: `%${expression}%` } },
          { id : { like: `%${expression}%` } },
          { email : { like: `%${expression}%` } },
        ],
      },
    });
  }

  getAgentAssignments(agent: Agent, filter?: LoopBackFilter): Observable<AgentAssignment[]> {
    return this.agentApi.getAssignments(
      agent.id,
      Object.assign({}, filter, { include: ['department', 'rank'] }),
    );
  }

  countAgentAssignments(agent: Agent): Observable<number> {
    return this.agentApi.countAssignments(agent.id).pipe(
      map(result => result.count));
  }

  createAgentAssignment(assignment: AgentAssignment): Observable<AgentAssignment> {
    return this.agentApi.createAssignments(assignment.agentId, assignment).pipe(
      tap(() => this.agentAssignmentsChangeSubject.next()));
  }

  removeAssignment(assignment: AgentAssignment): Observable<AgentAssignment> {
    return this.agentAssignmentApi.deleteById<AgentAssignment>(assignment.id).pipe(
      tap(() => this.agentAssignmentsChangeSubject.next()));
  }

  get agentAssignmentsChange() {
    return this.agentAssignmentsChangeSubject;
  }

  get agentsChange() {
    return this.agentsChangeSubject;
  }

  removeAgent(agent: Agent) {
    return this.agentApi.deleteById(agent.id).pipe(
      tap(() => {
        this.agentsChangeSubject.next();
      }));
  }
}
