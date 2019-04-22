import { of as observableOf } from 'rxjs';

import { Road } from '../shared/sdk/models/Road';
import { CityApi } from '../shared/sdk/services/custom/City';
import { RoadApi } from '../shared/sdk/services/custom/Road';
import { RoadService } from './road.service';

const roads = [
  {
    id: 75,
    cityCode: '69003',
    label: 'AVENUE DE LA GARE',
  },
  {
    id: 76,
    cityCode: '69003',
    label: 'AVENUE DES AVORAUX',
  },
  {
    id: 28712,
    cityCode: '69388',
    label: 'AVENUE PAUL SANTY',
  },
] as Road[];

describe('RoadService', () => {

  let roadService: RoadService;

  let roadApiMock: RoadApi;
  let cityApiMock: CityApi;

  beforeEach(() => {
    roadApiMock = jasmine.createSpyObj('RoadApi', {
      find: observableOf(roads),
      count: observableOf({ count: roads.length }),
      deleteById: observableOf(null),
    });
    cityApiMock = jasmine.createSpyObj('CityApi', {
      getRoads: null,
    });

    roadService = new RoadService(roadApiMock, cityApiMock);
  });

  describe('getRoads()', () => {

    it('should pass call roadApi with filter and return the result', () => {
      // Given
      const filter = { limit: 5 };

      // When
      const observable = roadService.getRoads(filter);

      // Then
      expect(observable).toBeTruthy();
      observable.subscribe((result) => {
        expect(result).toEqual(roads);
        expect(roadApiMock.find).toHaveBeenCalledWith(filter);
      });
    });

  });

  describe('countRoads()', () => {

    it('should call roadApi and return an observable with the number of roads', () => {
      // Given
      const expectedCount = roads.length;

      // When
      const observable = roadService.countRoads();

      // Then
      expect(observable).toBeTruthy();
      observable.subscribe((result) => {
        expect(result).toEqual(expectedCount);
        expect(roadApiMock.count).toHaveBeenCalledWith(null);
      });
    });

  });

  describe('removeRoad()', () => {

    it('should call roadApi with road ID, trigger a roadsChange and return an observable', () => {
      // Given
      const road = roads[0];
      const roadsChangeObservable = roadService.roadsChange;

      // When
      const observable = roadService.removeRoad(road);

      // Then
      expect(observable).toBeTruthy();
      roadsChangeObservable.subscribe(() => {
        observable.subscribe(() => {
          expect(roadApiMock.deleteById).toHaveBeenCalledWith(road.id);
        });
      });
    });

  });

});
