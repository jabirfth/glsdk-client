import { City } from '../../../shared/sdk/models/City';
import { MatPaginator, MatSort } from '@angular/material';
import { RoadService } from '../../../services/road.service';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable ,  BehaviorSubject } from 'rxjs';
import { Road } from '../../../shared/sdk/models/Road';
import { LoopBackFilter } from '../../../shared/sdk/models/BaseModels';

export class RoadDataSource implements DataSource<Road> {

  subject: BehaviorSubject<Road[]>;
  currentFilter: LoopBackFilter;

  constructor(
    private roadService: RoadService,
    private paginator: MatPaginator,
    private sorter?: MatSort,
    private city?: City,
  ) {
    this.paginator.page.subscribe(() => this.loadPage());
    if (sorter) {
      this.sorter.sortChange.subscribe(() => {
        this.loadPage();
      });
    }
  }

  connect(): Observable<Road[]> {
    this.subject = new BehaviorSubject([]);
    this.loadPage();
    return this.subject;
  }

  private loadPage() {
    const offset = this.paginator.pageIndex * this.paginator.pageSize;
    const limit = this.paginator.pageSize;
    let order;
    let roads;

    if (this.sorter && this.sorter.direction) {
      order = `${this.sorter.active} ${this.sorter.direction}`;
    }

    this.currentFilter = { offset, limit, order };
    if (this.city) {
      roads = this.roadService.getRoadsByCity(this.city, this.currentFilter);
    } else {
      roads = this.roadService.getRoads(this.currentFilter);
    }

    roads.subscribe((roads: Road[]) => {
      this.subject.next(roads);
    });
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.subject.complete();
  }

}
