import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardDirective } from '../../card.directive';
import { TranslocoPipe } from '@ngneat/transloco';

@Component({
  selector: 'app-modal',
  imports: [CardDirective, TranslocoPipe],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  @Input() isOpen: boolean = false;
  @Output() isOpenChange = new EventEmitter<boolean>();
  onClose() {
    this.isOpenChange.emit(false);
  }
}
