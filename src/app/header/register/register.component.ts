import { Component, EventEmitter, inject, Output } from '@angular/core';
import { InputComponent } from '../../create-page/form/input/input.component';
import { TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import { RoundedInputDirective } from '../../shared/roundedInput.directive';
import { GradientDirective } from '../../shared/gradient-button.directive';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [
    InputComponent,
    TranslocoPipe,
    RoundedInputDirective,
    FormsModule,
    GradientDirective,
    ReactiveFormsModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  @Output() isregistered: EventEmitter<boolean> = new EventEmitter<boolean>();
  
  private authService: AuthService = inject(AuthService);
  private fb: FormBuilder = inject(FormBuilder);
  private translocoService: TranslocoService = inject(TranslocoService);

  registerForm!: FormGroup;
  registerFormSubmited = false;
  errorMessage: string = '';

  ngOnInit() {
    this.registerForm = this.fb.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      passwordConfirmation: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    this.registerFormSubmited = true;
    if (
      this.registerForm.valid &&
      this.registerForm.value.password ===
        this.registerForm.value.passwordConfirmation
    ) {
      this.authService
        .register(
          this.registerForm.value.username,
          this.registerForm.value.password
        )
        .subscribe({
          next: (response) => {
            this.registerForm.reset();
            this.registerFormSubmited = false;
            this.isregistered.emit(true);
          },
          error: (err) => {
            console.error(err);
            if (err.status === 409) {
              this.errorMessage = this.translocoService.translate(
                'header.register.errors.usernameTaken'
              );
            }else{
              this.errorMessage = this.translocoService.translate(
                'errors.unknown'
              );
            }
          },
        });
    } else {
      this.registerForm
        .get('passwordConfirmation')
        ?.setErrors({ incorrect: true });
      this.registerForm.get('password')?.setErrors({ incorrect: true });
      this.errorMessage = this.translocoService.translate(
        'header.register.errors.passwordsDoNotMatch'
      );
    }
  }
}
