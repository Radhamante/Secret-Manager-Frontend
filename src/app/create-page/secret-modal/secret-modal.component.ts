import { AsyncPipe, DatePipe } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { TranslocoPipe } from '@ngneat/transloco';
import { GradientDirective } from '../../shared/gradient-button.directive';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { Secret } from '../../models/secret.model';
import { ReplaySubject } from 'rxjs';
import { MessageService } from '../../services/message.service';
import { MessageType } from '../../models/message-type.enum';
import { ClipboardCheck } from 'lucide-angular';
import { Message } from '../../models/message.model';

@Component({
  selector: 'app-secret-modal',
  imports: [
    GradientDirective,
    TranslocoPipe,
    DatePipe,
    ModalComponent,
    AsyncPipe,
  ],
  templateUrl: './secret-modal.component.html',
  styleUrl: './secret-modal.component.scss',
})
export class SecretModalComponent implements OnInit {
  @Input() $secret!: ReplaySubject<Secret>;
  secretUrl!: string;
  @Input() isOpen: boolean = false;
  @Output() isOpenChange = new EventEmitter<boolean>();
  private messageService: MessageService = inject(MessageService);

  ngOnInit() {
    this.$secret.subscribe((secret) => {
      this.secretUrl = `${window.location.origin}/secret/${secret.uuid}`;
    });
  }

  copyInClipboard() {
    navigator.clipboard.writeText(this.secretUrl);
    this.messageService.add(
      new Message('message.info.copyToClipboard', MessageType.INFO, ClipboardCheck)
    );
  }

  onClose() {
    this.isOpenChange.emit(false);
  }
}
