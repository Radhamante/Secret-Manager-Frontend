import { inject, Injectable } from '@angular/core';
import { Secret } from '../models/secret.model';
import { SecretFormData } from '../models/secret-form-data.model';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { SecretWithContent } from '../models/secret-with-content.models';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private http = inject(HttpClient);

  APIbaseUrl = 'http://localhost:8081';

  constructor() {}

  createSecret(secretData: SecretFormData): Observable<Secret> {
    const body = new FormData();
    body.append('content', secretData.content);
    body.append('password', secretData.password);
    body.append(
      'duration',
      (secretData.lifetime * secretData.lifetimeType).toString()
    );
    body.append('usage_limit', secretData.usageLimit.toString());
    return this.http.post<Secret>(`${this.APIbaseUrl}/secrets/text`, body).pipe(
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

  getSecret(uuid: string, password: string): Observable<SecretWithContent> {
    return this.http
      .get<SecretWithContent>(
        `${this.APIbaseUrl}/secrets/${uuid}?password=${password}`
      )
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
