import { Component, inject } from '@angular/core';
import { MessageService } from '../services/message.service';
import { AsyncPipe } from '@angular/common';
import { MessageComponent } from './message/message.component';

@Component({
  selector: 'app-messages',
  imports: [AsyncPipe, MessageComponent],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss',
})
export class MessagesComponent {
  private messageService: MessageService = inject(MessageService);

  get messages$() {
    return this.messageService.messages$;
  }

  removeMessage(id: number) {
    this.messageService.remove(id);
  }
}
