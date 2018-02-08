import { MatPaginator, MatSort } from '@angular/material';
import { OrderService } from '../../../services/order.service';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Order } from '../../../shared/sdk/models/Order';
import { OrderContribution } from '../../../shared/sdk/models';

export class OrderContributionDatasource implements DataSource<OrderContribution> {

  subject: BehaviorSubject<OrderContribution[]>;

  constructor(
    private order: Order,
    private service: OrderService,
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

  connect(): Observable<OrderContribution[]> {
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
    this.service.getContributions(this.order, { offset, limit, order })
      .subscribe((items: OrderContribution[]) => {
        this.subject.next(items);
      });
  }

  disconnect(): void {
    this.subject.complete();
  }

}
