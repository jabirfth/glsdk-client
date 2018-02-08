import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { MatPaginator, MatSort, PageEvent } from '@angular/material';
import { OrderDataSource } from './order.datasource';
import { Order } from '../../../shared/sdk/models';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {

  dataSource: OrderDataSource;
  displayedColumns = ['name', 'amount', 'totalamount', 'actions'];

  pageEvent: PageEvent;
  totalElement: number;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 100];
  filters = {
    name: '',
  };
  where = {};

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sorter: MatSort;

  constructor(
    private orderService: OrderService,
  ) {
  }

  getContributionsAmountTotal(order: Order): number {
    return order.contributions
      .map(item => item.amount)
      .reduce((prev, next) => prev + next , 0);
  }

  ngOnInit(): void {
    this.search();
  }

  private search() {
    this.dataSource = new OrderDataSource(this.orderService, this.paginator, this.sorter, this.where);
    this.orderService.count(this.where)
      .subscribe((count: number) => this.totalElement = count);
  }

  filter(): void {
    let filterConditions = {};
    if (this.filters.name.length > 0) {
      filterConditions = Object.assign(filterConditions , { name : { like: `%${this.filters.name}%` } });
    }
    this.where = filterConditions;
    this.search();
  }
}
