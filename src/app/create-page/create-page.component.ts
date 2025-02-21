import { Component, inject } from '@angular/core';
import { DocComponent } from './doc/doc.component';
import { FormComponent } from './form/form.component';
import { SecretModalComponent } from './secret-modal/secret-modal.component';
import { ApiService } from '../services/api.service';
import { SecretFormData } from '../models/secret-form-data.model';
import { Secret } from '../models/secret.model';
import { BehaviorSubject, ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-create-page',
  imports: [FormComponent, DocComponent, SecretModalComponent],
  templateUrl: './create-page.component.html',
  styleUrl: './create-page.component.scss',
  host: {
    class: 'flex flex-1',
  },
})
export class CreatePageComponent {
  static path = '';

  private apiService: ApiService = inject(ApiService);

  formIsLoading: boolean = false;
  $currentSecret: ReplaySubject<Secret> = new ReplaySubject();
  isModalOpen: boolean = false;

  onFormSubmited(secret: SecretFormData) {
    this.apiService.createSecret(secret).subscribe({
      next: (secret: Secret) => {
        this.formIsLoading = false;
        this.$currentSecret.next(secret);
        this.isModalOpen = true;
      },
    });
  }
}
