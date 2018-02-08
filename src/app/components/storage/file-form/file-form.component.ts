import { Component, Input } from '@angular/core';
import { StorageService } from '../../../services/storage.service';
import { StorageContainer } from '../../../shared/sdk/models/StorageContainer';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-file-form',
  templateUrl: './file-form.component.html',
  styleUrls: ['./file-form.component.scss'],
})
export class FileFormComponent {

  private _container: StorageContainer;
  uploader: FileUploader;

  constructor(
    private storageService: StorageService,
  ) {
  }

  get container() {
    return this._container;
  }

  @Input()
  set container(container: StorageContainer) {
    this._container = container;
    this.initUploaderForContainer();
  }

  private initUploaderForContainer(): void {
    if (this.container) {
      this.uploader = this.storageService.getUploader(this.container);
    } else {
      delete this.uploader;
    }
  }

}
