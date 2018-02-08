import { Injectable } from '@angular/core';
import { City } from '../shared/sdk/models/City';
import { Observable } from 'rxjs/Observable';
import { Road } from '../shared/sdk/models/Road';
import { RoadApi } from '../shared/sdk/services/custom/Road';
import { CityApi } from '../shared/sdk/services/custom/City';
import { LoopBackFilter } from '../shared/sdk/models/BaseModels';
import { Subject } from 'rxjs/Subject';

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
    return this.roadApi.count(null).map(result => result.count);
  }

  getRoadById(id: string): Observable<Road> {
    return this.roadApi.findById(id);
  }

  getRoadsByCity(city: City, filter?: LoopBackFilter): Observable<Road[]> {
    return this.cityApi.getRoads(city.code, filter);
  }

  countRoadsByCity(city: City): Observable<number> {
    return this.cityApi.countRoads(city.code)
      .map(result => result.count);
  }

  createOrUpdateRoad(road: Road): Observable<Road> {
    return this.roadApi.upsert(road);
  }

  get roadsChange() {
    return this.roadsChangeSubject;
  }

  removeRoad(road: Road) {
    return this.roadApi.deleteById(road.id)
      .do(() => {
        this.roadsChangeSubject.next();
      });
  }
}
