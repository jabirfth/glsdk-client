import { Component, Input, OnInit } from '@angular/core';
import { StorageService } from '../../../services/storage.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { StorageFile } from '../../../models/storage-file';
import { StorageContainer } from '../../../shared/sdk/models/StorageContainer';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss'],
})
export class FilesComponent implements OnInit {

  private _container: StorageContainer;
  files: Observable<StorageFile[]>;

  constructor(
    private storageService: StorageService,
  ) {
    this.storageService.storageContainerFilesChange.subscribe(() => {
      this.loadContainerFiles();
    });
  }

  ngOnInit(): void {
    this.loadContainerFiles();
  }

  private loadContainerFiles(): void {
    if (this._container) {
      this.files = this.storageService.getContainerFiles(this._container);
    } else {
      this.files = Observable.of([]);
    }
  }

  downloadFile(file: StorageFile): boolean {
    this.storageService.downloadFile(file)
      .subscribe((blob) => {
        saveAs(blob, file.name as string);
      });
    return false;
  }

  @Input()
  set container(container: StorageContainer) {
    this._container = container;
    this.loadContainerFiles();
  }

  get container() {
    return this._container;
  }

  removeFile(file: StorageFile): boolean {
    this.storageService.removeFile(file);
    return false;
  }

}
