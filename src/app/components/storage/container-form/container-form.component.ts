import { Component } from '@angular/core';
import { StorageContainer } from '../../../shared/sdk/models/StorageContainer';
import { StorageService } from '../../../services/storage.service';

@Component({
  selector: 'app-container-form',
  templateUrl: './container-form.component.html',
  styleUrls: ['./container-form.component.scss'],
})
export class ContainerFormComponent {

  container = new StorageContainer();
  submitDisabled = false;

  constructor(
    private storageService: StorageService,
  ) {
  }

  createContainer() {
    this.submitDisabled = true;
    this.storageService.createContainer(this.container)
      .subscribe(
        () => {
          this.container = new StorageContainer();
          this.submitDisabled = false;
        },
        () => {
          this.submitDisabled = false;
        },
      );
  }

}
