import { Injectable } from '@angular/core';
import { AgentApi } from '../shared/sdk/services/custom/Agent';
import { Observable } from 'rxjs/Observable';
import { Agent } from '../shared/sdk/models/Agent';
import { LoopBackFilter } from '../shared/sdk/models/BaseModels';
import { AgentAssignment } from '../shared/sdk/models/AgentAssignment';
import { AgentAssignmentApi } from '../shared/sdk/services/custom/AgentAssignment';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/do';

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
      .map(result => result.count);
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
    return this.agentApi.countAssignments(agent.id)
      .map(result => result.count);
  }

  createAgentAssignment(assignment: AgentAssignment): Observable<AgentAssignment> {
    return this.agentApi.createAssignments(assignment.agentId, assignment)
      .do(() => this.agentAssignmentsChangeSubject.next());
  }

  removeAssignment(assignment: AgentAssignment): Observable<AgentAssignment> {
    return this.agentAssignmentApi.deleteById<AgentAssignment>(assignment.id)
      .do(() => this.agentAssignmentsChangeSubject.next());
  }

  get agentAssignmentsChange() {
    return this.agentAssignmentsChangeSubject;
  }

  get agentsChange() {
    return this.agentsChangeSubject;
  }

  removeAgent(agent: Agent) {
    return this.agentApi.deleteById(agent.id)
      .do(() => {
        this.agentsChangeSubject.next();
      });
  }
}
