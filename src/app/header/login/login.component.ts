import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { InputComponent } from '../../create-page/form/input/input.component';
import { TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import { RoundedInputDirective } from '../../shared/roundedInput.directive';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { GradientDirective } from '../../shared/gradient-button.directive';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [
    InputComponent,
    TranslocoPipe,
    RoundedInputDirective,
    ReactiveFormsModule,
    GradientDirective,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  @Output() isLogged: EventEmitter<boolean> = new EventEmitter<boolean>();
  private authService: AuthService = inject(AuthService);
  private fb: FormBuilder = inject(FormBuilder);
  private translocoService: TranslocoService = inject(TranslocoService);
  loginForm!: FormGroup;
  loginFormSubmited = false;

  errorMessage: string = '';

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    this.loginFormSubmited = true;
    if (this.loginForm.valid) {
      this.authService
        .login(this.loginForm.value.username, this.loginForm.value.password)
        .subscribe({
          next: (response) => {
            this.isLogged.emit(true);
          },
          error: (error) => {
            this.errorMessage = this.translocoService.translate(
              'header.login.errors.invalidCredentials'
            );
          },
        });
    } else {
      this.errorMessage = this.translocoService.translate(
        'header.login.errors.missingInputs'
      );
    }
  }
}
