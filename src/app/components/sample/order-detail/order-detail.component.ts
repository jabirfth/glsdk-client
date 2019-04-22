
import { switchMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { OrderService } from '../../../services/order.service';
import { Order } from '../../../shared/sdk/models/Order';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css'],
})
export class OrderComponent implements OnInit {

  order: Order;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.orderService.findById(params.get('id'))))
      .subscribe((order: Order) => this.order = order);
  }
}
