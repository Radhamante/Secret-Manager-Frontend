import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TranslocoPipe } from '@ngneat/transloco';
import { SecretModalService } from '../../services/secret-modal.service';
import { GradientDirective } from '../../shared/gradient-button.directive';

@Component({
  selector: 'app-secret-modal',
  imports: [AsyncPipe, GradientDirective, TranslocoPipe, DatePipe],
  templateUrl: './secret-modal.component.html',
  styleUrl: './secret-modal.component.scss',
})
export class SecretModalComponent {
  protected secretModalService: SecretModalService = inject(SecretModalService);
  copyInClipboard() {
    this.secretModalService.secretUrl$.subscribe((secretUrl) => {
      navigator.clipboard.writeText(secretUrl);
    });
  }
}
