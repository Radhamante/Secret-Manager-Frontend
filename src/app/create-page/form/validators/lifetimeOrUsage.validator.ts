import {
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
  FormGroup,
} from '@angular/forms';

export function lifetimeOrUsageValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const form = control as FormGroup;
    const lifetime = form.get('lifetime')?.value;
    const usageLimit = form.get('usageLimit')?.value;

    if (lifetime > 0 || usageLimit > 0) {
      return null; // Validation successful
    }

    return { atLeastOneRequired: true }; // Validation error
  };
}
