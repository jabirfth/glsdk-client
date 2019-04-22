
import { switchMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CityService } from '../../../services/city.service';
import { City } from '../../../shared/sdk/models/City';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss'],
})
export class CityComponent implements OnInit {

  city: City;

  constructor(
    private route: ActivatedRoute,
    private cityService: CityService,
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.cityService.getCityByCode(params.get('code'))))
      .subscribe((city: City) => this.city = city);
  }
}
