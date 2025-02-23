import { CommonModule } from '@angular/common';
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
import { CardDirective } from '../../shared/card.directive';
import { GradientDirective } from '../../shared/gradient-button.directive';
import { RoundedInputDirective } from '../../shared/roundedInput.directive';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { InputComponent } from './input/input.component';
import { atLeastOnValidator } from './validators/lifetimeOrUsage.validator';
import { RoundedButtonDirective } from '../../shared/roundedButton.directive';
import { SecretType } from '../../models/secret-type.enum';

@Component({
  selector: 'app-form',
  imports: [
    InputComponent,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    TranslocoModule,
    SpinnerComponent,
    GradientDirective,
    CardDirective,
    RoundedInputDirective,
    RoundedButtonDirective,
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

  secretLifetimeType = Object.entries(SecretLifetimeType).slice(5);
  isTextMode: boolean = true;

  ngOnInit() {
    console.log(this.secretLifetimeType);
    this.secretForm = this.fb.group(
      {
        textContent: new FormControl(''),
        fileContent: new FormControl(null),
        password: ['', Validators.required],
        lifetime: [0],
        lifetimeType: [SecretLifetimeType.HOURS],
        usageLimit: [0],
      },
      {
        validators: [
          atLeastOnValidator('lifetime', 'usageLimit'),
          atLeastOnValidator('textContent', 'fileContent'),
        ],
        updateOn: 'submit',
      }
    );
  }

  onSubmit() {
    this.secretFormSubmited = true;
    if (this.secretForm.valid) {
      this.isLoading = true;
      this.apiService
        .createSecret({
          ...this.secretForm.value,
          fileContent: this.secretForm.get('fileContent')?.value,
          type: this.isTextMode ? SecretType.TEXT : SecretType.FILE,
        })
        .subscribe({
          next: (secret: Secret) => {
            this.isLoading = false;
            this.secretModalService.setSecret(secret);
            this.secretModalService.open();
          },
        });
    }
  }

  onFilePicked(event: any) {
    const file = event.target.files[0];
    this.secretForm.patchValue({
      fileContent: file,
    });
  }

  toggleContentType() {
    this.isTextMode = !this.isTextMode;
  }
}
