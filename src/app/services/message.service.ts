import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Message } from '../models/message.model';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages$ = new BehaviorSubject<Message[]>([]);

  constructor() {}

  add(message: Message) {
    this.messages$.next([...this.messages$.value, message]);
  }

  remove(messageId: number) {
    this.messages$.next(
      this.messages$.value.filter((message) => message.id !== messageId),
    );
  }

  clear() {
    this.messages$.next([]);
  }
}
