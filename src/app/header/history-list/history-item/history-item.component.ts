import { DatePipe } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { TranslocoPipe } from '@ngneat/transloco';
import { Secret } from '../../../models/secret.model';
import { CardDirective } from '../../../shared/card.directive';
import { RoundedButtonDirective } from '../../../shared/roundedButton.directive';
import { GradientDirective } from '../../../shared/gradient-button.directive';
import { ApiService } from '../../../services/api.service';
import { SpinnerComponent } from '../../../shared/spinner/spinner.component';
import { MessageService } from '../../../services/message.service';
import { Message } from '../../../models/message.model';
import { ClipboardCheck } from 'lucide-angular';
import { MessageType } from '../../../models/message-type.enum';

@Component({
  selector: 'app-history-item',
  imports: [
    TranslocoPipe,
    DatePipe,
    CardDirective,
    RoundedButtonDirective,
    GradientDirective,
    SpinnerComponent,
  ],
  templateUrl: './history-item.component.html',
  styleUrl: './history-item.component.scss',
})
export class HistoryItemComponent {
  @Input({ required: true }) secret!: Secret;
  @Output() secretDeleted = new EventEmitter<Secret>();

  private apiService: ApiService = inject(ApiService);
  private messageService: MessageService = inject(MessageService);
  isDeleting: boolean = false;

  copyInClipboard() {
    navigator.clipboard.writeText(
      `${window.location.origin}/secret/${this.secret.uuid}`
    );
    this.messageService.add(
      new Message('message.info.copyToClipboard', MessageType.INFO, ClipboardCheck)
    );
  }

  deleteHistory() {
    if (this.isDeleting) {
      return;
    }
    this.isDeleting = true;
    this.apiService.deleteSecret(this.secret.uuid).subscribe({
      next: () => {
        this.secretDeleted.emit(this.secret);
        this.isDeleting = false;
      },
      error: (error) => {
        console.error('Error deleting secret', error);
        this.isDeleting = false;
      },
    });
  }
}
