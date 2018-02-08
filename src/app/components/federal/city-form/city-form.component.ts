import { Component, OnInit } from '@angular/core';
import { CityService } from '../../../services/city.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { City } from '../../../shared/sdk/models/City';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-city-form',
  templateUrl: './city-form.component.html',
  styleUrls: ['./city-form.component.scss'],
})
export class CityFormComponent implements OnInit {

  incomeoptions = [
    { value:'O', viewValue:'O' },
    { value:'N', viewValue:'N' },
  ];

  city = new City();
  submitting = false;
  isCreate = true;

  constructor(
    private cityService: CityService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap
      .filter((paramMap: ParamMap) => paramMap.get('code') !== null)
      .switchMap((paramMap: ParamMap) => this.cityService.getCityByCode(paramMap.get('code')))
      .subscribe((city: City) => {
        this.city = city;
        this.isCreate = false;
      });
  }

  createOrUpdateCity(): void {
    this.submitting = true;
    this.cityService.createOrUpdateCity(this.city)
      .subscribe(
        (city: City) => {
          this.router.navigate(['/cities', city.code])
            .then(() => this.submitting = false);
        },
        (err) => {
          this.submitting = false;
          console.error(err);
          alert(err.message);
        },
      );
  }

}
