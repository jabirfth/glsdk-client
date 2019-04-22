import { CityService } from '../../../services/city.service';
import { Observable } from 'rxjs';
import { City } from '../../../shared/sdk/models/City';
import { LoopBackFilter } from '../../../shared/sdk/models/BaseModels';
import { Injectable } from '@angular/core';
import { MatTableDataSource } from '../../../utils/data-source';

@Injectable()
export class CityDataSource extends MatTableDataSource<City, CityCriteria> {

  constructor(
    private cityService: CityService,
  ) {
    super();
  }

  protected getData(pageFilter: LoopBackFilter): Observable<City[]> {
    return this.cityService.getCities(pageFilter);
  }

  protected countData(criteria: CityCriteria): Observable<number> {
    return this.cityService.countCities(criteria);
  }

}

export interface CityCriteria {
  code?: string;
  postalCode?: string;
  name?: string;
}
