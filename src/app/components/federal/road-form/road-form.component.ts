
import { Component, OnInit } from '@angular/core';
import { RoadService } from '../../../services/road.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Road } from '../../../shared/sdk/models/Road';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-road-form',
  templateUrl: './road-form.component.html',
  styleUrls: ['./road-form.component.scss'],
})
export class RoadFormComponent implements OnInit {

  road = new Road();
  submitting = false;
  isCreate = true;

  constructor(
    private roadService: RoadService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap
      .filter((paramMap: ParamMap) => paramMap.get('id') !== null)
      .switchMap((paramMap: ParamMap) => this.roadService.getRoadById(paramMap.get('id')))
      .subscribe((road: Road) => {
        this.road = road;
        this.isCreate = false;
      });
  }

  createOrUpdateRoad(): void {
    this.submitting = true;
    this.roadService.createOrUpdateRoad(this.road)
      .subscribe(
        (road: Road) => {
          this.router.navigate(['/cities', road.cityCode])
            .then(() => this.submitting = false)
            .catch(err => console.error(err));
        },
        (err) => {
          this.submitting = false;
          console.error(err);
        },
      );
  }

}
