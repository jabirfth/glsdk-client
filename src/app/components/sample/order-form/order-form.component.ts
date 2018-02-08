import { Component, OnInit } from '@angular/core';
import { Order } from '../../../shared/sdk/models';
import { OrderService } from '../../../services/order.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css'],
})
export class OrderFormComponent implements OnInit {

  order: Order = new Order();

  constructor(private orderService: OrderService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.paramMap
      .filter((paramMap: ParamMap) => paramMap.get('id') !== null)
      .switchMap((paramMap: ParamMap) => this.orderService.findById(paramMap.get('id')))
      .subscribe((order: Order) => {
        this.order = order;
      });
  }

  createOrUpdate() {

    this.orderService.replaceOrCreate(this.order)
      .subscribe(
        (orderCreated) => {
          this.router.navigate(['/orders', orderCreated.id])
            .then(() => {
            });
        },
        (err) => {
          console.error(err);
          alert(err.message);
        },
      );
  }
}
