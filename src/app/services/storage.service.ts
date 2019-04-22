import { FileUploader } from 'ng2-file-upload';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { StorageFile } from '../models/storage-file';
import { StorageContainer } from '../shared/sdk/models/StorageContainer';
import { LoopBackAuth } from '../shared/sdk/services/core/auth.service';
import { StorageContainerApi } from '../shared/sdk/services/custom/StorageContainer';

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
    return this.storageContainerApi.create(container).pipe(
      tap(() => this.storageContainersChangeSubject.next()));
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
    return this.storageContainerApi.removeFile(file.container, file.name).pipe(
      tap(() => this.storageContainerFilesChangeSubject.next()));
  }

}
