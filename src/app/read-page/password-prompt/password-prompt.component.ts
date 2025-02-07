import { Component, EventEmitter, Output } from '@angular/core';
import { TranslocoPipe } from '@ngneat/transloco';
import { InputComponent } from '../../create-page/form/input/input.component';
import { GradientDirective } from '../../shared/gradient-button.directive';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { FormsModule } from '@angular/forms';
import { CardDirective } from '../../shared/card.directive';

@Component({
  selector: 'app-password-prompt',
  imports: [
    TranslocoPipe,
    InputComponent,
    SpinnerComponent,
    GradientDirective,
    FormsModule,
    CardDirective
  ],
  templateUrl: './password-prompt.component.html',
  styleUrl: './password-prompt.component.scss',
})
export class PasswordPromptComponent {
  @Output() passwordEntered = new EventEmitter<string>();
  isLoading = false;

  password = '';

  onSubmit() {
    if (this.password) {
      this.isLoading = true;
      this.passwordEntered.emit(this.password);
    }
  }
}
