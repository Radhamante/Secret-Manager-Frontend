import { inject, Injectable } from '@angular/core';
import { Secret } from '../models/secret.model';
import { SecretFormData } from '../models/secret-form-data.model';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { SecretWithContent } from '../models/secret-with-content.models';
import { environment } from '../../environments/environment';
import { SecretType } from '../models/secret-type.enum';
import { SecretFileResponse } from '../models/secret-file-response.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private http = inject(HttpClient);

  APIbaseUrl = environment.apiURL;

  constructor() {}

  createSecret(secretData: SecretFormData): Observable<Secret> {
    console.log(secretData);
    const body = new FormData();
    if (secretData.type == SecretType.TEXT) {
      body.append('content', secretData.textContent);
    } else {
      body.append('file', secretData.fileContent);
    }
    body.append('password', secretData.password);
    body.append(
      'duration',
      (secretData.lifetime * secretData.lifetimeType).toString()
    );
    body.append('usage_limit', secretData.usageLimit.toString());
    return this.http
      .post<Secret>(`${this.APIbaseUrl}/secrets/${secretData.type}`, body)
      .pipe(
        map((response: any) => {
          return new Secret(
            response.uuid,
            new Date(response.creation),
            response.destruction ? new Date(response.destruction) : undefined,
            response.usage_limit,
            response.usage_count,
            response.type
          );
        })
      );
  }

  getSecretType(uuid: string): Observable<SecretType> {
    return this.http.get(`${this.APIbaseUrl}/secrets/${uuid}/type`, {}).pipe(
      map((response: any) => {
        return response.type;
      })
    );
  }

  getSecretFile(
    uuid: string,
    password: string
  ): Observable<SecretFileResponse> {
    return this.http
      .get(`${this.APIbaseUrl}/secrets/${uuid}?password=${password}`, {
        observe: 'response',
        responseType: 'blob',
      })
      .pipe(
        map((response: any) => {
          console.log(response.headers);

          const contentDisposition = response.headers.get(
            'Content-Disposition'
          );
          let filename = 'download';

          if (contentDisposition) {
            filename = contentDisposition.split('filename=')[1];
          }
          return new SecretFileResponse(response.body as Blob, filename);
        })
      );
  }

  getSecretText(uuid: string, password: string): Observable<SecretWithContent> {
    return this.http
      .get(`${this.APIbaseUrl}/secrets/${uuid}?password=${password}`)
      .pipe(
        map((response: any) => {
          return new SecretWithContent(
            response.uuid,
            new Date(response.creation),
            response.destruction ? new Date(response.destruction) : undefined,
            response.usage_limit,
            response.usage_count,
            response.type,
            response.content
          );
        })
      );
  }
}
