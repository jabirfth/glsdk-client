import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Injectable } from '@angular/core';

import { LoopBackFilter } from '../shared/sdk/models/BaseModels';
import { City } from '../shared/sdk/models/City';
import { CityApi } from '../shared/sdk/services/custom/City';

@Injectable()
export class CityService {

  constructor(private cityApi: CityApi) {
  }

  getCities(filter: LoopBackFilter): Observable<City[]> {
    return this.cityApi.find(filter);
  }

  countCities(where): Observable<number> {
    return this.cityApi.count(where)
      .pipe(map(result => result.count));
  }

  getCityByCode(code: string): Observable<City> {
    return this.cityApi.findById(code);
  }

  createOrUpdateCity(city: City): Observable<City> {
    return this.cityApi.upsert(city);
  }

  searchCities(expression: string, limit?: number): Observable<City[]> {
    return this.cityApi.find({
      limit,
      where: {
        name: { like: `%${expression}%` },
      },
    });
  }
}
