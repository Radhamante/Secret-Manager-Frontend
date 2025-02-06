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
import { SecretLifetimeType } from '../models/secret-lifetime-type';
import { InputComponent } from './input/input.component';
import { lifeTimeOrUsageValidator } from './validators/lifetimeOrUsage.validator';

@Component({
  selector: 'app-form',
  imports: [
    InputComponent,
    FormsModule,
    CommonModule,
    KeyValuePipe,
    ReactiveFormsModule,
    TranslocoModule,
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent implements OnInit {
  private fb: FormBuilder = inject(FormBuilder);
  secretForm!: FormGroup;

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
      { validators: lifeTimeOrUsageValidator() }
    );
  }

  onSubmit() {
    if (this.secretForm.valid) {
      console.log('Form submitted', this.secretForm.value);
    } else {
      console.log('Form is invalid');
    }
  }
}
