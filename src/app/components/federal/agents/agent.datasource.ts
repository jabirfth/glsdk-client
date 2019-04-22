import { Agent } from '../../../shared/sdk/models/Agent';
import { BehaviorSubject ,  Observable } from 'rxjs';
import { AgentService } from '../../../services/agent.service';
import { MatPaginator, MatSort } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';

export class AgentDataSource implements DataSource<Agent> {

  subject: BehaviorSubject<Agent[]>;

  constructor(
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

  connect(): Observable<Agent[]> {
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
    this.agentService.getAgents({ offset, limit, order })
      .subscribe((cities: Agent[]) => {
        this.subject.next(cities);
      });
  }

  disconnect(): void {
    this.subject.complete();
  }

}
