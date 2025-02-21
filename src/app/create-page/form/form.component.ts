import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
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
import { CardDirective } from '../../shared/card.directive';
import { GradientDirective } from '../../shared/gradient-button.directive';
import { RoundedInputDirective } from '../../shared/roundedInput.directive';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { InputComponent } from './input/input.component';
import { atLeastOneValidator } from '../../shared/validators/atLeastOne.validator';
import { SecretType } from '../../models/secret-type.enum';
import { SecretFormData } from '../../models/secret-form-data.model';

@Component({
  selector: 'app-form',
  imports: [
    InputComponent,
    CommonModule,
    ReactiveFormsModule,
    TranslocoModule,
    SpinnerComponent,
    GradientDirective,
    CardDirective,
    RoundedInputDirective,
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent implements OnInit {
  @Output() formSubmited: EventEmitter<SecretFormData> =
    new EventEmitter<SecretFormData>();

  @Input() formIsLoading: boolean = false;
  @Output() formIsLoadingChange = new EventEmitter<boolean>();

  private fb: FormBuilder = inject(FormBuilder);

  secretForm!: FormGroup;
  secretFormSubmited = false;

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
          atLeastOneValidator('lifetime', 'usageLimit'),
          atLeastOneValidator('textContent', 'fileContent'),
        ],
        updateOn: 'submit',
      }
    );
  }

  onSubmit() {
    this.secretFormSubmited = true;
    if (this.secretForm.valid) {
      this.formIsLoadingChange.emit(true);
      this.formSubmited.emit({
        ...this.secretForm.value,
        fileContent: this.secretForm.get('fileContent')?.value,
        type: this.isTextMode ? SecretType.TEXT : SecretType.FILE,
      });
    }
  }

  onFilePicked(event: any) {
    const file = event.target.files[0];
    this.secretForm.patchValue({
      fileContent: file,
    });
  }

  toggleContentType(isTextMode: boolean) {
    this.isTextMode = isTextMode;
  }
}
