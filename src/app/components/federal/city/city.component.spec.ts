import { ActivatedRoute, convertToParamMap, ParamMap } from '@angular/router';
import { of as observableOf, Observable } from 'rxjs';
import { CityComponent } from './city.component';
import { CityService } from '../../../services/city.service';
import { City } from 'app/shared/sdk';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement, Directive, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { MatIconModule, MatListModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent } from 'ng2-mock-component';

@Directive({
  selector: '[appShowToRoles]',
})
export class ShowToRolesDirectiveStub {
  @Input()
  set appShowToRoles(rolesArray: string[]) { }
}

describe('CityComponent', () => {

  describe('ngOnInit()', () => {

    const cityCode = 1;
    const city = {
      code: '12345',
      name: 'Ville',
      postalCode: '34130',
    } as City;

    let component: CityComponent;
    let activatedRouteMock: ActivatedRoute;
    let cityServiceMock: CityService;

    beforeEach(() => {
      activatedRouteMock = {
        get paramMap(): Observable<ParamMap> {
          return null;
        },
      } as ActivatedRoute;
      cityServiceMock = jasmine.createSpyObj('cityService', {
        getCityByCode: observableOf(city),
      });
      component = new CityComponent(activatedRouteMock, cityServiceMock);
    });

    it('should get city ID in path and get city details from service', () => {
      // Given
      const paramMapSpy = spyOnProperty(activatedRouteMock, 'paramMap', 'get').and
        .returnValue(observableOf(convertToParamMap({ code: cityCode })));

      // When
      component.ngOnInit();

      // Then
      expect(paramMapSpy).toHaveBeenCalled();
      expect(cityServiceMock.getCityByCode).toHaveBeenCalledWith(cityCode);
      expect(component.city).toBe(city);
    });

  });

  describe('template', () => {

    let fixture: ComponentFixture<CityComponent>;
    let comp: CityComponent;
    let de: DebugElement;
    const city = {
      code: '12345',
      name: 'city',
      postalCode: '34130',
      mayorName: 'Didier',
      inhabitants: '123',
    } as City;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          CityComponent,
          MockComponent({ selector: 'app-roads', inputs: ['city'] }),
          ShowToRolesDirectiveStub,
        ],
        imports: [
          MatIconModule,
          MatListModule,
          NoopAnimationsModule,
          RouterTestingModule,
        ],
        schemas: [
          NO_ERRORS_SCHEMA,
        ],
        providers: [
          {
            provide: CityService,
            useValue: {
              getCityByCode(): Observable<City> {
                return observableOf(city);
              },
            },
          },
        ],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(CityComponent);
      de = fixture.debugElement;
      comp = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create the component', async(() => {
      expect(fixture).toBeTruthy();
    }));

    it('should display city details', async(() => {
      // Given
      const titleElement = de.query(By.css('h3')).nativeElement;
      const detailSectionElement = de.query(By.css('mat-list')).nativeElement;

      // Then
      expect(titleElement.innerText).toContain(city.name);
      expect(detailSectionElement.innerText).toContain(city.postalCode);
      expect(detailSectionElement.innerText).toContain(city.inhabitants);
      expect(detailSectionElement.innerText).toContain(city.mayorName);
    }));

  });

});
