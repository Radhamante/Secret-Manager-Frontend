import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { SecretModalService } from '../services/secret-modal.service';
import { DocComponent } from './doc/doc.component';
import { FormComponent } from './form/form.component';
import { SecretModalComponent } from './secret-modal/secret-modal.component';

@Component({
  selector: 'app-create-page',
  imports: [FormComponent, DocComponent, SecretModalComponent, AsyncPipe],
  templateUrl: './create-page.component.html',
  styleUrl: './create-page.component.scss',
})
export class CreatePageComponent {
  static path = '';
  protected modalService: SecretModalService = inject(SecretModalService);
}
