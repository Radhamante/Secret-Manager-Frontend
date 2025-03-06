import { inject, Injectable } from '@angular/core';
import { Secret } from '../models/secret.model';
import { SecretFormData } from '../models/secret-form-data.model';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, Subject } from 'rxjs';
import { SecretWithContent } from '../models/secret-with-content.models';
import { environment } from '../../environments/environment';
import { SecretType } from '../models/secret-type.enum';
import { SecretFileResponse } from '../models/secret-file-response.model';
import { MessageService } from './message.service';
import { MessageType } from '../models/message-type.enum';
import { Message } from '../models/message.model';
import { ServerOff } from 'lucide-angular';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private http = inject(HttpClient);
  private messageService: MessageService = inject(MessageService);

  private eventSource: EventSource;
  countSubject$ = new Subject<number>();

  APIbaseUrl = environment.apiURL;

  constructor() {
    this.eventSource = new EventSource(`${this.APIbaseUrl}/secrets/count`);
    this.eventSource.onmessage = (event) => {
      this.countSubject$.next(parseInt(event.data));
    };
    this.eventSource.onerror = (error: Event) => {
      console.error('EventSource failed:', error);
      this.eventSource.close();
    };
  }

  createSecret(secretData: SecretFormData): Observable<Secret> {
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
        }),
        catchError((error) => {
          console.error('Error creating secret:', error);
          if (error.status === 0) {
            this.messageService.add(
              new Message('errors.serverDown', MessageType.ERROR, ServerOff)
            );
          } else {
            this.messageService.add(
              new Message('errors.unknown', MessageType.ERROR)
            );
          }
          throw error;
        })
      );
  }

  getSecretType(uuid: string): Observable<SecretType> {
    return this.http.get(`${this.APIbaseUrl}/secrets/${uuid}/type`, {}).pipe(
      map((response: any) => {
        return response.type;
      }),
      catchError((error) => {
        console.error('Error creating secret:', error);
        if (error.status === 0) {
          this.messageService.add(
            new Message('errors.serverDown', MessageType.ERROR, ServerOff)
          );
        } else {
          this.messageService.add(
            new Message('errors.unknown', MessageType.ERROR)
          );
        }
        throw error;
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
          const contentDisposition = response.headers.get(
            'Content-Disposition'
          );
          let filename = 'download';

          if (contentDisposition) {
            filename = contentDisposition.split('filename=')[1];
          }
          return new SecretFileResponse(response.body as Blob, filename);
        }),
        catchError((error) => {
          console.error('Error getting secret:', error);
          if (error.status === 0) {
            this.messageService.add(
              new Message('errors.serverDown', MessageType.ERROR, ServerOff)
            );
          } else {
            this.messageService.add(
              new Message('errors.unknown', MessageType.ERROR)
            );
          }
          throw error;
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
        }),
        catchError((error) => {
          console.error('Error getting secret:', error);
          if (error.status === 0) {
            this.messageService.add(
              new Message('errors.serverDown', MessageType.ERROR, ServerOff)
            );
          } else {
            this.messageService.add(
              new Message('errors.unknown', MessageType.ERROR)
            );
          }
          throw error;
        })
      );
  }

  getSecrets(): Observable<Secret[]> {
    return this.http.get(`${this.APIbaseUrl}/secrets`).pipe(
      map((response: any) => {
        return response.map((secret: any) => {
          return new Secret(
            secret.uuid,
            new Date(secret.creation),
            secret.destruction ? new Date(secret.destruction) : undefined,
            secret.usage_limit,
            secret.usage_count,
            secret.type
          );
        });
      }),
      catchError((error) => {
        console.error('Error getting secrets:', error);
        if (error.status === 0) {
          this.messageService.add(
            new Message('errors.serverDown', MessageType.ERROR, ServerOff)
          );
        } else {
          this.messageService.add(
            new Message('errors.unknown', MessageType.ERROR)
          );
        }
        throw error;
      })
    );
  }
}
