import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { StorageFile } from '../models/storage-file';
import { StorageContainerApi } from '../shared/sdk/services/custom/StorageContainer';
import { StorageContainer } from '../shared/sdk/models/StorageContainer';
import { FileUploader } from 'ng2-file-upload';
import { environment } from '../../environments/environment';
import { LoopBackAuth } from '../shared/sdk/services/core/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class StorageService {

  private storageContainersChangeSubject = new Subject<void>();
  private storageContainerFilesChangeSubject = new Subject<void>();

  constructor(
    private storageContainerApi: StorageContainerApi,
    private loopBackAuth: LoopBackAuth,
    private httpClient: HttpClient,
  ) {
  }

  get storageContainersChange(): Observable<void> {
    return this.storageContainersChangeSubject;
  }

  get storageContainerFilesChange(): Observable<void> {
    return this.storageContainerFilesChangeSubject;
  }

  getContainers(): Observable<StorageContainer[]> {
    return this.storageContainerApi.getContainers();
  }

  getContainerFiles(container: StorageContainer): Observable<StorageFile[]> {
    return this.storageContainerApi.getFiles(container.name);
  }

  createContainer(container: StorageContainer): Observable<StorageContainer> {
    return this.storageContainerApi.create(container)
      .do(() => this.storageContainersChangeSubject.next());
  }

  getUploader(container: StorageContainer): FileUploader {
    const fileUploader = new FileUploader({
      url: `${environment.loopback.baseUrl}/api/StorageContainers/${container.name}/upload`,
      headers: [
        {
          name: 'Authorization',
          value: this.loopBackAuth.getAccessTokenId(),
        },
      ],
    });
    fileUploader.onCompleteItem = () => {
      this.storageContainerFilesChangeSubject.next();
    };
    return fileUploader;
  }

  downloadFile(file: StorageFile): Observable<Blob> {
    const url =
      `${environment.loopback.baseUrl}/api/StorageContainers`
      + `/${file.container}/download/${file.name}`;

    return this.httpClient.get(
      url,
      {
        headers: new HttpHeaders().set('Authorization', this.loopBackAuth.getAccessTokenId()),
        responseType: 'blob',
      },
    );
  }

  removeFile(file: StorageFile): Observable<void> {
    return this.storageContainerApi.removeFile(file.container, file.name)
      .do(() => this.storageContainerFilesChangeSubject.next());
  }

}
