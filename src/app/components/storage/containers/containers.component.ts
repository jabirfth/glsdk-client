import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StorageService } from '../../../services/storage.service';
import { Observable } from 'rxjs';
import { StorageContainer } from '../../../shared/sdk/models/StorageContainer';

@Component({
  selector: 'app-containers',
  templateUrl: './containers.component.html',
  styleUrls: ['./containers.component.scss'],
})
export class ContainersComponent implements OnInit {

  @Input() containers: Observable<StorageContainer[]>;
  @Output() onContainerChange = new EventEmitter<StorageContainer>();

  constructor(
    private storageService: StorageService,
  ) {
    this.storageService.storageContainersChange.subscribe(() => {
      this.loadContainers();
    });
  }

  ngOnInit(): void {
    this.loadContainers();
  }

  private loadContainers() {
    this.containers = this.storageService.getContainers();
  }

  selectContainer(container: StorageContainer): void {
    this.onContainerChange.emit(container);
  }

}
