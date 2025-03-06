import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AccessToken } from '../models/access-token.model';
import { catchError, map, Observable } from 'rxjs';
import { MessageType } from '../models/message-type.enum';
import { MessageService } from './message.service';
import { Message } from '../models/message.model';
import { KeyRound, ServerOff } from 'lucide-angular';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private messageService: MessageService = inject(MessageService);
  APIbaseUrl = environment.apiURL;

  currentAccessToken: AccessToken | null = null;

  constructor() {
    const token = localStorage.getItem('currentAccessToken');
    if (token) {
      this.currentAccessToken = JSON.parse(token);
    }
  }

  isLogin(): boolean {
    return this.currentAccessToken != null;
  }

  login(username: string, password: string): Observable<AccessToken> {
    const body = new FormData();
    body.append('username', username);
    body.append('password', password);
    body.append('grant_type', 'password');
    body.append('client_id', '');
    body.append('client_secret', '');
    body.append('scope', '');
    return this.http.post<AccessToken>(`${this.APIbaseUrl}/login`, body).pipe(
      map((response) => {
        this.currentAccessToken = response;
        localStorage.setItem('currentAccessToken', JSON.stringify(response));
        return response;
      }),
      catchError((error) => {
        console.error('Error login in:', error);
        if (error.status === 0) {
          this.messageService.add(
            new Message('errors.serverDown', MessageType.ERROR, ServerOff)
          );
        } else if (error.status != 401) {
          this.messageService.add(
            new Message('errors.unknown', MessageType.ERROR)
          );
        }
        throw error;
      })
    );
  }

  logout() {
    this.currentAccessToken = null;
    localStorage.removeItem('currentAccessToken');
  }

  register(username: string, password: string): Observable<AccessToken> {
    const body = new FormData();
    body.append('username', username);
    body.append('password', password);
    return this.http
      .post<AccessToken>(`${this.APIbaseUrl}/register`, body)
      .pipe(
        map((response) => {
          this.currentAccessToken = response;
          localStorage.setItem('currentAccessToken', JSON.stringify(response));
          return response;
        }),
        catchError((error) => {
          console.error('Error registering:', error);
          if (error.status === 0) {
            this.messageService.add(
              new Message('errors.serverDown', MessageType.ERROR, ServerOff)
            );
          } else if (error.status != 409) {
            this.messageService.add(
              new Message('errors.unknown', MessageType.ERROR)
            );
          }
          throw error;
        })
      );
  }
}
