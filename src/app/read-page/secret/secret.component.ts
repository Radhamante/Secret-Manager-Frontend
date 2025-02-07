import { Component, Input } from '@angular/core';
import { TranslocoPipe } from '@ngneat/transloco';
import { SecretWithContent } from '../../models/secret-with-content.models';
import { CommonModule } from '@angular/common';
import { CardDirective } from '../../shared/card.directive';

@Component({
  selector: 'app-secret',
  imports: [TranslocoPipe, CommonModule, CardDirective],
  templateUrl: './secret.component.html',
  styleUrl: './secret.component.scss',
})
export class SecretComponent {
  @Input({ required: true }) secret!: SecretWithContent;
}
