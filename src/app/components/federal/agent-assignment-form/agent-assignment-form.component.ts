import { Component, Input } from '@angular/core';
import { Agent } from '../../../shared/sdk/models/Agent';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AgentAssignment } from '../../../shared/sdk/models/AgentAssignment';
import { BehaviorSubject } from 'rxjs';
import { AgentRank } from '../../../shared/sdk/models/AgentRank';
import { AgentRankService } from '../../../services/agent-rank.service';
import { DepartmentService } from '../../../services/department.service';
import { Department } from '../../../shared/sdk/models/Department';
import { AgentService } from '../../../services/agent.service';

@Component({
  selector: 'app-agent-assignment-form',
  templateUrl: './agent-assignment-form.component.html',
  styleUrls: ['./agent-assignment-form.component.scss'],
})
export class AgentAssignmentFormComponent {

  @Input() agent: Agent;
  form: FormGroup;
  ranks = new BehaviorSubject<AgentRank[]>([]);
  departments = new BehaviorSubject<Department[]>([]);

  constructor(
    private formBuilder: FormBuilder,
    private agentService: AgentService,
    private rankService: AgentRankService,
    private departmentService: DepartmentService,
  ) {
    this.form = this.formBuilder.group({
      rank: [null, Validators.required],
      department: [null, Validators.required],
      beginDate: [null, Validators.required],
      endDate: [null],
    });
  }

  searchAgentRanks(e: KeyboardEvent): void {
    if (/^(Backspace|Delete|.)$/.test(e.key)) {
      this.rankService.searchAgentRanks(this.form.controls.rank.value, 20)
        .subscribe((results: AgentRank[]) => {
          this.ranks.next(results);
        });
    }
  }

  displayRankValue(agentRank: AgentRank): string {
    return agentRank ? agentRank.label : null;
  }

  searchDepartments(e: KeyboardEvent): void {
    if (/^(Backspace|Delete|.)$/.test(e.key)) {
      this.departmentService.searchDepartments(this.form.controls.department.value, 20)
        .subscribe((results: Department[]) => {
          this.departments.next(results);
        });
    }
  }

  displayDepartmentValue(department: Department): string {
    return department ? department.label : null;
  }

  validateDepartmentControl(): void {
    setTimeout(
      () => {
        if (!(this.form.controls.department.value instanceof Department)) {
          this.form.controls.department.setValue(null);
        }
      },
      300,
    );
  }

  validateRankControl(): void {
    setTimeout(
      () => {
        if (!(this.form.controls.rank.value instanceof AgentRank)) {
          this.form.controls.rank.setValue(null);
        }
      },
      300,
    );
  }

  createOrUpdateAgentAssignment(): boolean {
    const assignment = new AgentAssignment({
      agentId: this.agent.id,
      departmentId: this.form.controls.department.value.id,
      rankId: this.form.controls.rank.value.id,
      beginDate: this.form.controls.beginDate.value,
      endDate: this.form.controls.endDate.value,
    });
    this.agentService.createAgentAssignment(assignment)
      .subscribe((assignmentCreated: AgentAssignment) => {
        this.form.markAsUntouched();
        this.form.markAsPristine();
        this.form.reset();
      },         (error: Error) => {
        console.error('error when createAgentAssignment ', error);
        alert(error.message);
      });
    return false;
  }

}
