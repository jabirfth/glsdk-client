import { Component, OnInit, ViewChild } from '@angular/core';
import { AgentService } from '../../../services/agent.service';
import { MatPaginator, MatSort } from '@angular/material';
import { AgentDataSource } from './agent.datasource';
import { Agent } from '../../../shared/sdk/models/Agent';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agents',
  templateUrl: './agents.component.html',
  styleUrls: ['./agents.component.scss'],
})
export class AgentsComponent implements OnInit {

  dataSource: AgentDataSource;
  displayedColumns = ['id', 'firstName', 'lastName', 'email', 'actions'];
  totalElement: number;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 100];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private agentService: AgentService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.loadAgents();
    this.agentService.agentsChange.subscribe(() => {
      this.loadAgents();
    });
  }

  loadAgents(): void {
    this.dataSource = new AgentDataSource(this.agentService, this.paginator, this.sort);
    this.agentService.countAgents()
      .subscribe((count: number) => this.totalElement = count);
  }

  selectAgent(agent: Agent): boolean {
    this.router.navigate(['agents', agent.id]);
    return false;
  }

  deleteAgent(agent: Agent): boolean {
    this.agentService.removeAgent(agent).subscribe();
    return false;
  }
}
