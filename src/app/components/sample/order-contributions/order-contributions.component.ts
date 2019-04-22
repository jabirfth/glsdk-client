import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../../services/order.service';
import { OrderContribution } from '../../../shared/sdk/models/OrderContribution';

import { Order } from '../../../shared/sdk/models';
import { MatPaginator, MatSort } from '@angular/material';
import { OrderContributionDatasource } from './order-contribution.datasource';

@Component({
  selector: 'app-order-contributions',
  templateUrl: './order-contributions.component.html',
  styleUrls: ['./order-contributions.component.scss'],
})
export class OrderContributionsComponent implements OnInit {

  @Input() order: Order;

  dataSource: OrderContributionDatasource;
  displayedColumns = ['agent', 'amount', 'actions'];
  totalElement: number;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 100];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @ViewChild('transConfirmDelete') transConfirmDelete: ElementRef;

  constructor(private route: ActivatedRoute,
              private orderService: OrderService) {
  }

  ngOnInit(): void {
    this.loadContributions();
    this.orderService.orderContributionsChange.subscribe(() => {
      this.loadContributions();
    });
  }

  private loadContributions(): void {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
    this.dataSource = new OrderContributionDatasource(this.order, this.orderService, this.paginator, this.sort);
    this.orderService.countContributions(this.order)
      .subscribe((count: number) => this.totalElement = count);
  }

  deleteContribution(contribution: OrderContribution): boolean {
    const transConfirmDeleteMessage = this.transConfirmDelete.nativeElement.textContent;
    if (confirm(transConfirmDeleteMessage)) {
      this.orderService.deleteContribution(contribution).subscribe();
      return false;
    }
  }

}
