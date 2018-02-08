import { Component, Input, OnInit } from '@angular/core';
import { Order, OrderContribution } from '../../../shared/sdk/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-order-contributions-form',
  templateUrl: './order-contributions-form.component.html',
  styleUrls: ['./order-contributions-form.component.css'],
})
export class OrderContributionsFormComponent implements OnInit {

  @Input() order: Order;
  form: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private orderService: OrderService) {
    this.form = this.formBuilder.group({
      agent: [null, Validators.required],
      amount: [null, Validators.required],
    });
  }

  ngOnInit() {
  }

  createOrUpdateOrderContribution(): boolean {

    if (this.form.valid) {
      const contribution = new OrderContribution({
        orderId: this.order.id,
        agentId: this.form.value.agent,
        amount: this.form.value.amount,
      });
      this.orderService.createContribution(contribution).subscribe((crontributionCreated) => {
        this.form.markAsUntouched();
        this.form.markAsPristine();
        this.form.reset();
      });

      return false;
    }

  }

}
