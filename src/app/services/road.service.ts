import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { Injectable } from '@angular/core';

import { LoopBackFilter } from '../shared/sdk/models/BaseModels';
import { City } from '../shared/sdk/models/City';
import { Road } from '../shared/sdk/models/Road';
import { CityApi } from '../shared/sdk/services/custom/City';
import { RoadApi } from '../shared/sdk/services/custom/Road';

@Injectable()
export class RoadService {

  private roadsChangeSubject = new Subject<void>();

  constructor(
    private roadApi: RoadApi,
    private cityApi: CityApi,
  ) {
  }

  getRoads(filter?: LoopBackFilter): Observable<Road[]> {
    return this.roadApi.find(filter);
  }

  countRoads(): Observable<number> {
    return this.roadApi.count(null).pipe(map(result => result.count));
  }

  getRoadById(id: string): Observable<Road> {
    return this.roadApi.findById(id);
  }

  getRoadsByCity(city: City, filter?: LoopBackFilter): Observable<Road[]> {
    return this.cityApi.getRoads(city.code, filter);
  }

  countRoadsByCity(city: City): Observable<number> {
    return this.cityApi.countRoads(city.code).pipe(
      map(result => result.count));
  }

  createOrUpdateRoad(road: Road): Observable<Road> {
    return this.roadApi.upsert(road);
  }

  get roadsChange() {
    return this.roadsChangeSubject;
  }

  removeRoad(road: Road) {
    return this.roadApi.deleteById(road.id).pipe(
      tap(() => {
        this.roadsChangeSubject.next();
      }));
  }
}
