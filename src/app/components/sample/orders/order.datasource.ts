import { MatPaginator, MatSort } from '@angular/material';
import { OrderService } from '../../../services/order.service';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Order } from '../../../shared/sdk/models/Order';

export class OrderDataSource implements DataSource<Order> {

  subject: BehaviorSubject<Order[]>;

  constructor(
    private service: OrderService,
    private paginator: MatPaginator,
    private sorter?: MatSort,
    private filter?: any,
  ) {
    this.paginator.page.subscribe(() => this.loadPage());
    if (sorter) {
      this.sorter.sortChange.subscribe(() => {
        this.loadPage();
      });
    }
  }

  connect(): Observable<Order[]> {
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
    this.service.find({ offset, limit, order, where: this.filter, include: ['contributions'] })
      .subscribe((items: Order[]) => {
        this.subject.next(items);
      });
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.subject.complete();
  }

}
