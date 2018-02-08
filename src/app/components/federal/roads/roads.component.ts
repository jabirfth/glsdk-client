import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Road } from '../../../shared/sdk/models/Road';
import { RoadService } from '../../../services/road.service';
import { Router } from '@angular/router';
import { City } from '../../../shared/sdk/models/City';
import { MatPaginator, MatSort, PageEvent } from '@angular/material';
import { RoadDataSource } from './road.datasource';
import { AdminGuard } from '../../../guards/admin.guard';
import { CsvExportService } from '../../../services/csv-exporter.service';

@Component({
  selector: 'app-roads',
  templateUrl: './roads.component.html',
  styleUrls: ['./roads.component.scss'],
})
export class RoadsComponent implements OnInit {

  @Input() city: City;
  displayedColumns = ['id', 'label', 'type'];
  dataSource: RoadDataSource;
  pageEvent: PageEvent;

  totalElement: number;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 100];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sorter: MatSort;

  constructor(
    private roadService: RoadService,
    public adminGuard: AdminGuard,
    private csvExportService: CsvExportService,
  ) {
  }

  ngOnInit(): void {
    if (this.adminGuard.canActivate()) {
      this.displayedColumns.push('actions');
    }
    this.loadRoads();
    this.roadService.roadsChange.subscribe(() => {
      this.loadRoads();
    });
  }

  loadRoads(): void {
    let roadsCount;

    this.dataSource = new RoadDataSource(this.roadService, this.paginator, this.sorter, this.city);
    if (this.city) {
      roadsCount = this.roadService.countRoadsByCity(this.city);
    } else {
      roadsCount = this.roadService.countRoads();
    }

    roadsCount.subscribe((count: number) => this.totalElement = count);
  }

  export(): boolean {
    this.csvExportService.exportRoads(this.dataSource.currentFilter);
    return false;
  }

  deleteRoad(road: Road): boolean {
    this.roadService.removeRoad(road).subscribe();
    return false;
  }
}
