import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, PageEvent } from '@angular/material';
import { CityCriteria, CityDataSource } from './city.datasource';
import { CsvExportService } from '../../../services/csv-exporter.service';
import { AdminGuard } from '../../../guards/admin.guard';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss'],
  providers: [CityDataSource],
})
export class CitiesComponent implements OnInit {

  displayedColumns = ['code', 'postalCode', 'name', 'inhabitants', 'mayorName', 'actions'];
  pageEvent: PageEvent;
  totalElement: number;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 100];

  private _codeFilterExpression: string;
  private _postalCodeFilterExpression: string;
  private _nameFilterExpression: string;
  private _criteria: CityCriteria;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sorter: MatSort;

  constructor(
    public dataSource: CityDataSource,
    private csvExportService: CsvExportService,
    public adminGuard: AdminGuard,
  ) {
  }

  get totalElements() {
    return this.dataSource.totalElements;
  }

  get criteria(): CityCriteria {
    return this._criteria;
  }

  set criteria(value: CityCriteria) {
    this._criteria = value;
    this.dataSource.changeCriteria(this.criteria);
  }

  get codeFilterExpression(): string {
    return this._codeFilterExpression;
  }

  set codeFilterExpression(value: string) {
    this._codeFilterExpression = value;
    this.criteria = Object.assign({}, this.criteria , { code : { like: `%${value}%` } });
  }

  get postalCodeFilterExpression(): string {
    return this._postalCodeFilterExpression;
  }

  set postalCodeFilterExpression(value: string) {
    this._postalCodeFilterExpression = value;
    this.criteria = Object.assign({}, this.criteria , { postalCode : { like: `%${value}%` } });
  }

  get nameFilterExpression(): string {
    return this._nameFilterExpression;
  }

  set nameFilterExpression(value: string) {
    this._nameFilterExpression = value;
    this.criteria = Object.assign({}, this.criteria , { name : { like: `%${value}%` } });
  }

  ngOnInit(): void {
    this.dataSource.init(this.paginator, this.sorter, this.criteria);
  }

  export(): boolean {
    this.csvExportService.exportCities(this.dataSource.pageFilter);
    return false;
  }

}
