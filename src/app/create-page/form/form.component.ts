import { CommonModule, KeyValuePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';
import { SecretLifetimeType } from '../../models/secret-lifetime-type.enum';
import { Secret } from '../../models/secret.model';
import { ApiService } from '../../services/api.service';
import { SecretModalService } from '../../services/secret-modal.service';
import { GradientDirective } from '../../shared/gradient-button.directive';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { InputComponent } from './input/input.component';
import { lifetimeOrUsageValidator } from './validators/lifetimeOrUsage.validator';
import { CardDirective } from '../../shared/card.directive';
import { RoundedInputDirective } from '../../shared/roundedInput.directive';

@Component({
  selector: 'app-form',
  imports: [
    InputComponent,
    FormsModule,
    CommonModule,
    KeyValuePipe,
    ReactiveFormsModule,
    TranslocoModule,
    SpinnerComponent,
    GradientDirective,
    CardDirective,
    RoundedInputDirective
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent implements OnInit {
  private fb: FormBuilder = inject(FormBuilder);
  private apiService: ApiService = inject(ApiService);
  private secretModalService: SecretModalService = inject(SecretModalService);

  secretForm!: FormGroup;
  secretFormSubmited = false;
  isLoading = false;

  SecretLifetimeType = SecretLifetimeType;

  ngOnInit() {
    this.secretForm = this.fb.group(
      {
        content: new FormControl('', Validators.required),
        password: ['', Validators.required],
        lifetime: [0],
        lifetimeType: [SecretLifetimeType.HOURS],
        usageLimit: [0],
      },
      { validators: lifetimeOrUsageValidator(), updateOn: 'submit' }
    );
  }

  onSubmit() {
    this.secretFormSubmited = true;
    if (this.secretForm.valid) {
      this.isLoading = true;
      this.apiService.createSecret(this.secretForm.value).subscribe({
        next: (secret: Secret) => {
          this.isLoading = false;
          this.secretModalService.setSecret(secret);
          this.secretModalService.open();
        },
      });
    } else {
      console.log('Form is invalid');
      Object.keys(this.secretForm.controls).forEach((key) => {
        const controlErrors = this.secretForm.get(key)?.errors;
        if (controlErrors != null) {
          console.log(`Key: ${key}, Errors:`, controlErrors);
        }
      });
    }
  }
}
