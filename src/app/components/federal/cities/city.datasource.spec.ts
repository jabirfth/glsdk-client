import { EMPTY, of as observableOf } from 'rxjs';

import { CityService } from '../../../services/city.service';
import { City } from '../../../shared/sdk/models/City';
import { CityDataSource } from './city.datasource';

describe('CityDataSource', () => {

  const cities = [
    {
      code: '12345',
      name: 'City1',
    },
    {
      code: '12346',
      name: 'City2',
    },
  ] as City[];

  let paginator;
  let cityServiceMock: CityService;
  let dataSource: CityDataSource;

  beforeEach(() => {
    cityServiceMock = jasmine.createSpyObj('cityService', {
      getCities: observableOf(cities),
      countCities: observableOf(cities.length),
    });
    paginator = {
      page: EMPTY,
      pageIndex: 0,
      pageSize: 10,
    };
    dataSource = new CityDataSource(cityServiceMock);
  });

  describe('init()', () => {

    it('should subscribe to page Observable', () => {
      // Given
      paginator.page = jasmine.createSpyObj('observable', ['subscribe']);

      // When
      dataSource.init(paginator);

      // Then
      expect(paginator.page.subscribe).toHaveBeenCalled();
    });

  });

  describe('connect()', () => {

    it('should load page and notify returned subject when no criteria', () => {
      // Given
      dataSource.init(paginator);

      // When
      const subject = dataSource.connect();
      let retrievedCities = null;
      subject.subscribe((page) => {
        retrievedCities = page;
      });

      // Then
      expect(subject).toBeTruthy();
      expect(cityServiceMock.getCities).toHaveBeenCalledWith({
        offset: 0,
        limit: paginator.pageSize,
        order: undefined,
        where: {},
      });
      expect(cityServiceMock.countCities).toHaveBeenCalledWith({});
      expect(retrievedCities).toBe(cities);
    });

    it('should load page and notify returned subject when criteria', () => {
      // Given
      const criteria = { name: '%plop%' };
      dataSource.init(paginator, null, criteria);

      // When
      const subject = dataSource.connect();
      let retrievedCities = null;
      subject.subscribe((page) => {
        retrievedCities = page;
      });

      // Then
      expect(subject).toBeTruthy();
      expect(cityServiceMock.getCities).toHaveBeenCalledWith({
        offset: 0,
        limit: paginator.pageSize,
        order: undefined,
        where: criteria,
      });
      expect(cityServiceMock.countCities).toHaveBeenCalledWith(criteria);
      expect(retrievedCities).toBe(cities);
    });

  });

});
