import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Message } from '../../models/message.model';
import { MessageType } from '../../models/message-type.enum';
import { LucideAngularModule } from 'lucide-angular';
import { TranslocoPipe } from '@ngneat/transloco';

@Component({
  selector: 'app-message',
  imports: [LucideAngularModule, TranslocoPipe],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
})
export class MessageComponent {
  @Input({ required: true }) message!: Message;
  @Output() remove = new EventEmitter<number>();

  messageType = MessageType;

  removeMessage() {
    this.remove.emit(this.message.id);
  }
}
