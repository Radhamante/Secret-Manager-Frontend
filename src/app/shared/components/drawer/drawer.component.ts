import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-drawer',
  imports: [],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.scss',
})
export class DrawerComponent {
  @Input() width: string = 'w-80';

  @Input() open: boolean = false;
  @Output() openChange = new EventEmitter<boolean>();

  toggle(newState?: boolean) {
    console.log('a');
    this.open = newState !== undefined ? newState : !this.open;
    this.openChange.emit(this.open);
  }
}
