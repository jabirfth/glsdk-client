import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Injectable } from '@angular/core';

import { LoopBackFilter } from '../shared/sdk/models/BaseModels';
import { Department } from '../shared/sdk/models/Department';
import { DepartmentApi } from '../shared/sdk/services/custom/Department';

@Injectable()
export class DepartmentService {

  constructor(
    private departmentApi: DepartmentApi,
  ) {
  }

  getDepartments(filter: LoopBackFilter): Observable<Department[]> {
    return this.departmentApi.find(filter);
  }

  countDepartments(): Observable<number> {
    return this.departmentApi.count(null)
      .pipe(map(result => result.count));
  }

  searchDepartments(expression: string, limit?: number): Observable<Department[]> {
    return this.departmentApi.find({
      limit,
      where: { label: { like: `%${expression}%` } },
    });
  }

}
