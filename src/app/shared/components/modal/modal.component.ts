import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardDirective } from '../../card.directive';
import { TranslocoPipe } from '@ngneat/transloco';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-modal',
  imports: [CardDirective, TranslocoPipe, NgClass],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {

  // Must do that to able to use dynamic class in the template
  // https://tailwindcss.com/docs/detecting-classes-in-source-files#dynamic-class-names
  private widths = [
    'max-w-xs',
    'max-w-sm',
    'max-w-md',
    'max-w-lg',
    'max-w-xl',
    'max-w-2xl',
    'max-w-3xl',
    'max-w-4xl',
    'max-w-5xl',
    'max-w-6xl',
  ];
  @Input() width: string = '2xl';
  @Input() isOpen: boolean = false;
  @Output() isOpenChange = new EventEmitter<boolean>();
  onClose() {
    this.isOpenChange.emit(false);
  }
}
