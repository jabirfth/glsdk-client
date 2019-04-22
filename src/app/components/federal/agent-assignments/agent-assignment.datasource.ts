import { Agent } from '../../../shared/sdk/models/Agent';
import { BehaviorSubject ,  Observable } from 'rxjs';
import { AgentService } from '../../../services/agent.service';
import { MatPaginator, MatSort } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { AgentAssignment } from '../../../shared/sdk/models/AgentAssignment';

export class AgentAssignmentDataSource implements DataSource<AgentAssignment> {

  subject: BehaviorSubject<AgentAssignment[]>;

  constructor(
    private agent: Agent,
    private agentService: AgentService,
    private paginator: MatPaginator,
    private sorter?: MatSort,
  ) {
    this.paginator.page.subscribe(() => this.loadPage());
    if (sorter) {
      this.sorter.sortChange.subscribe(() => {
        this.loadPage();
      });
    }
  }

  connect(): Observable<AgentAssignment[]> {
    this.subject = new BehaviorSubject([]);
    this.loadPage();
    return this.subject;
  }

  private loadPage() {
    const offset = this.paginator.pageIndex * this.paginator.pageSize;
    const limit = this.paginator.pageSize;
    let order;
    if (this.sorter && this.sorter.direction) {
      order = `${this.sorter.active} ${this.sorter.direction}`;
    }
    this.agentService.getAgentAssignments(this.agent, { offset, limit, order })
      .subscribe((assignments: AgentAssignment[]) => {
        this.subject.next(assignments);
      });
  }

  disconnect(): void {
    this.subject.complete();
  }

}
