import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslocoPipe } from '@ngneat/transloco';
import { GradientDirective } from '../../shared/gradient-button.directive';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { Secret } from '../../models/secret.model';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-secret-modal',
  imports: [GradientDirective, TranslocoPipe, DatePipe, ModalComponent, AsyncPipe],
  templateUrl: './secret-modal.component.html',
  styleUrl: './secret-modal.component.scss',
})
export class SecretModalComponent implements OnInit {
  @Input() $secret!: ReplaySubject<Secret>;
  secretUrl!: string;
  @Input() isOpen: boolean = false;
  @Output() isOpenChange = new EventEmitter<boolean>();

  ngOnInit() {
    this.$secret.subscribe((secret) => {
      this.secretUrl = `${window.location.origin}/secret/${secret.uuid}`;
    });
  }

  copyInClipboard() {
    navigator.clipboard.writeText(this.secretUrl);
  }

  onClose() {
    this.isOpenChange.emit(false);
  }
}
