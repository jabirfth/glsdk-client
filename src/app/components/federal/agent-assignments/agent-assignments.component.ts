import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AgentService } from '../../../services/agent.service';
import { MatPaginator, MatSort } from '@angular/material';
import { Agent } from '../../../shared/sdk/models/Agent';
import { AgentAssignmentDataSource } from './agent-assignment.datasource';
import { AgentAssignment } from '../../../shared/sdk/models/AgentAssignment';

@Component({
  selector: 'app-agent-assignments',
  templateUrl: './agent-assignments.component.html',
  styleUrls: ['./agent-assignments.component.scss'],
})
export class AgentAssignmentsComponent implements OnInit {

  @Input() agent: Agent;
  dataSource: AgentAssignmentDataSource;
  displayedColumns = ['rank', 'department', 'beginDate', 'endDate', 'actions'];
  totalElement: number;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 100];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private agentService: AgentService,
  ) {
  }

  ngOnInit(): void {
    this.loadAssignments();
    this.agentService.agentAssignmentsChange.subscribe(() => {
      this.loadAssignments();
    });
  }

  private loadAssignments(): void {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
    this.dataSource = new AgentAssignmentDataSource(this.agent, this.agentService, this.paginator, this.sort);
    this.agentService.countAgentAssignments(this.agent)
      .subscribe((count: number) => this.totalElement = count);
  }

  deleteAssignment(assignment: AgentAssignment): boolean {
    this.agentService.removeAssignment(assignment).subscribe();
    return false;
  }

}
