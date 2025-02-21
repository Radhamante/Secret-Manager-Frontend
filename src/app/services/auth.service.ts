import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AccessToken } from '../models/access-token.model';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  APIbaseUrl = environment.apiURL;

  currentAccessToken: AccessToken | null = null;

  constructor() {}

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
        return response;
      })
    );
  }

  logout() {
    this.currentAccessToken = null;
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
          return response;
        })
      );
  }
}
