import { Component, Input } from '@angular/core';
import { Secret } from '../../models/secret.model';
import { TranslocoPipe } from '@ngneat/transloco';
import { DatePipe } from '@angular/common';
import { HistoryItemComponent } from './history-item/history-item.component';

@Component({
  selector: 'app-history-list',
  imports: [TranslocoPipe, HistoryItemComponent],
  templateUrl: './history-list.component.html',
  styleUrl: './history-list.component.scss',
})
export class HistoryComponent {
  @Input({ required: true }) secretHistory: Secret[] = [];
  onDelete($event: Secret) {
    this.secretHistory = this.secretHistory.filter(
      (secret) => secret.uuid !== $event.uuid
    );
  }
}
