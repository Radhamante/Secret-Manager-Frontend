import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Secret } from '../models/secret.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class SecretModalService {
  // showModal$ = new BehaviorSubject<boolean>(false);
  // secret$ = new BehaviorSubject<Secret | undefined>(undefined);
  // secretUrl$ = `${window.location.origin}/secret/${this.secret$.uuid}`;

  // setSecret(secret: Secret) {
  //   this.secret$.next(secret);
  //   const secretUrl = `${window.location.origin}/secret/${secret.uuid}`;
  //   this.secretUrl$.next(secretUrl);
  // }

  // open() {
  //   this.showModal$.next(true);
  // }

  // close() {
  //   this.showModal$.next(false);
  // }

  // constructor() {}
}
