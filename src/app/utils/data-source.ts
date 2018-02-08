import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { LoopBackFilter } from '../shared/sdk/models/BaseModels';
import { Observable } from 'rxjs/Observable';

export abstract class MatTableDataSource<T, U> implements DataSource<T> {

  private paginator: MatPaginator;
  private sorter: MatSort;
  private criteria: U | {};

  totalElements = 0;
  subject = new BehaviorSubject<T[]>([]);
  pageFilter: LoopBackFilter;

  init(paginator: MatPaginator, sorter?: MatSort, criteria: U | {} = {}) {
    this.paginator = paginator;
    this.sorter = sorter;
    this.criteria = criteria;
    this.paginator.page.subscribe(() => this.reload());
    if (sorter) {
      this.sorter.sortChange.subscribe(() => {
        this.reload();
      });
    }
  }

  changeCriteria(criteria: U) {
    console.log('change', criteria);
    this.criteria = criteria;
    this.paginator.pageIndex = 0;
    this.reload();
  }

  connect(): Observable<T[]> {
    this.reload();
    return this.subject;
  }

  protected abstract getData(pageFilter: LoopBackFilter): Observable<T[]>;

  protected abstract countData(criteria: U | {}): Observable<number>;

  reload() {
    const offset = this.paginator.pageIndex * this.paginator.pageSize;
    const limit = this.paginator.pageSize;
    let order;
    if (this.sorter && this.sorter.direction) {
      order = `${this.sorter.active} ${this.sorter.direction}`;
    }
    this.pageFilter = Object.assign({}, this.pageFilter,{
      offset,
      limit,
      order,
      where: this.criteria,
    });
    this.getData(this.pageFilter)
      .subscribe((cities) => {
        this.subject.next(cities);
      });
    this.countData(this.criteria)
      .subscribe((count) => {
        this.totalElements = count;
      });
  }

  disconnect(): void {
    this.subject.complete();
  }

}
