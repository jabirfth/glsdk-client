import { Component, Input, OnInit } from '@angular/core';
import { Order, OrderContribution } from '../../../shared/sdk/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from '../../../services/order.service';
import { AgentService } from 'app/services/agent.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Agent } from 'app/shared/sdk';

@Component({
  selector: 'app-order-contributions-form',
  templateUrl: './order-contributions-form.component.html',
  styleUrls: ['./order-contributions-form.component.css'],
})
export class OrderContributionsFormComponent implements OnInit {

  @Input() order: Order;
  form: FormGroup;
  agents = new BehaviorSubject<Agent[]>([]);

  constructor(private formBuilder: FormBuilder,
              private orderService: OrderService,
              private agentService: AgentService) {
    this.form = this.formBuilder.group({
      agent: [null, Validators.required],
      amount: [null, Validators.required],
    });
  }

  ngOnInit() {
  }

  searchAgents(e: KeyboardEvent): void {
    if (/^(Backspace|Delete|.)$/.test(e.key)) {
      this.agentService.searchAgents(this.form.controls.agent.value, 20)
        .subscribe((results: Agent[]) => {
          this.agents.next(results);
        });
    }
  }

  displayAgentValue(agent: Agent): string {
    return agent ? (agent.id + ' ' + agent.firstName + ' ' + agent.lastName) : null;
  }

  validateAgentControl(): void {
    setTimeout(
      () => {
        if (!(this.form.controls.agent.value instanceof Agent)) {
          this.form.controls.agent.setValue(null);
        }
      },
      300,
    );
  }

  createOrUpdateOrderContribution(): boolean {

    if (this.form.valid) {
      const contribution = new OrderContribution({
        orderId: this.order.id,
        agentId: this.form.value.agent.id,
        amount: this.form.value.amount,
      });
      this.orderService
        .createContribution(contribution)
        .subscribe((crontributionCreated) => {
          this.form.markAsUntouched();
          this.form.markAsPristine();
          this.form.reset();
        },         (err) => {
          alert(err.message);
        });

      return false;
    }

  }

}
