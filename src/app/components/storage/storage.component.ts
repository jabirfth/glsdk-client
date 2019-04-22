import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from '../../services/storage.service';
import { StorageContainer } from '../../shared/sdk/models/StorageContainer';

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.scss'],
})
export class StorageComponent implements OnInit {

  containers: Observable<StorageContainer[]>;
  selectedContainer: StorageComponent;

  constructor(
    private storageService: StorageService,
  ) {
  }

  ngOnInit(): void {
    this.containers = this.storageService.getContainers();
  }

}
