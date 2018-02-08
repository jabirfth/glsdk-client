import { MatPaginator, MatSort } from '@angular/material';
import { DepartmentService } from '../../../services/department.service';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Department } from '../../../shared/sdk/models/Department';
import { LoopBackFilter } from '../../../shared/sdk/models/BaseModels';

export class DepartmentDataSource implements DataSource<Department> {

  private _searchValue: string;
  subject: BehaviorSubject<Department[]>;
  currentFilter: LoopBackFilter;

  constructor(
    private departmentService: DepartmentService,
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

  set searchValue(value: string) {
    this._searchValue = value;
    this.paginator.pageIndex = 0;
    this.loadPage();
  }

  connect(): Observable<Department[]> {
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

    this.currentFilter = Object.assign({}, this.currentFilter, { offset, limit, order });
    if (this._searchValue) {
      this.currentFilter.where = {
        label: {
          like: `%${this._searchValue}%`,
        },
      };
    } else {
      delete this.currentFilter.where;
    }
    this.departmentService
      .getDepartments(this.currentFilter)
      .subscribe((departments: Department[]) => {
        this.subject.next(departments);
      });
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.subject.complete();
  }

}
