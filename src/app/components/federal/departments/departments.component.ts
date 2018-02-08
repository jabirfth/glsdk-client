import { Component, OnInit, ViewChild } from '@angular/core';
import { DepartmentService } from '../../../services/department.service';
import { MatPaginator, MatSort, PageEvent } from '@angular/material';
import { DepartmentDataSource } from './department.datasource';
import { CsvExportService } from '../../../services/csv-exporter.service';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss'],
})
export class DepartmentsComponent implements OnInit {

  displayedColumns = [
    'id',
    'label',
  ];
  dataSource: DepartmentDataSource;
  pageEvent: PageEvent;

  totalElement: number;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 100];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sorter: MatSort;

  constructor(
    private departmentService: DepartmentService,
    private csvExportService: CsvExportService,
  ) {
  }

  ngOnInit(): void {
    this.dataSource = new DepartmentDataSource(this.departmentService, this.paginator, this.sorter);
    this.departmentService.countDepartments()
      .subscribe((count: number) => this.totalElement = count);
  }

  search(text: string) {
    this.dataSource.searchValue = text;
  }

  export(): boolean {
    this.csvExportService.exportDepartments(this.dataSource.currentFilter);
    return false;
  }

}
