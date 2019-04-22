import { Angular2Csv } from 'angular2-csv';

import { Injectable } from '@angular/core';

import { LoopBackFilter } from '../shared/sdk/models/BaseModels';
import { CityService } from './city.service';
import { DepartmentService } from './department.service';
import { RoadService } from './road.service';
import { UserService } from './user.service';

@Injectable()
export class CsvExportService {

  constructor(
    private cityService: CityService,
    private roadService: RoadService,
    private userService: UserService,
    private departmentService: DepartmentService,
  ) {
  }

  exportCities(filter: LoopBackFilter): void {
    const exportFilter = Object.assign({}, filter, { limit: null, offset: null, skip: null });
    this.cityService.getCities(exportFilter).subscribe((cities) => {
      new Angular2Csv(cities, 'cities', {
        headers: ['Code', 'Name', 'NameMin', 'Postal Code', 'Mayor', 'Inhabitants', 'Income'],
        fieldSeparator: ';',
      });
    });
  }

  exportRoads(filter: LoopBackFilter): void {
    const exportFilter = Object.assign({}, filter, { limit: null, offset: null, skip: null });
    this.roadService.getRoads(exportFilter).subscribe((roads) => {
      new Angular2Csv(roads, 'roads', {
        headers: ['ID', 'City Code', 'Label'],
        fieldSeparator: ';',
      });
    });
  }

  exportDepartments(filter: LoopBackFilter): void {
    const exportFilter = Object.assign({}, filter, { limit: null, offset: null, skip: null });
    this.departmentService.getDepartments(exportFilter).subscribe((departments) => {
      new Angular2Csv(departments, 'departments', {
        headers: ['ID', 'Label', 'Short Label'],
        fieldSeparator: ';',
      });
    });
  }

  exportUsers(filter: LoopBackFilter): void {
    const exportFilter = Object.assign({}, filter, { limit: null, offset: null, skip: null });
    this.userService.getUsers(exportFilter).subscribe((users) => {
      new Angular2Csv(users, 'users', {
        headers: [],
        fieldSeparator: ';',
      });
    });
  }
}
