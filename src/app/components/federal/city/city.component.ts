import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CityService } from '../../../services/city.service';
import { City } from '../../../shared/sdk/models/City';
import 'rxjs/add/operator/switchMap';
import { AdminGuard } from '../../../guards/admin.guard';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss'],
})
export class CityComponent implements OnInit {

  city: City;
  canEdit: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private cityService: CityService,
    public adminGuard: AdminGuard,
  ) {
  }

  ngOnInit(): void {
    this.canEdit = this.adminGuard.canActivate();
    this.route.paramMap
      .switchMap((params: ParamMap) => this.cityService.getCityByCode(params.get('code')))
      .subscribe((city: City) => this.city = city);
  }
}
