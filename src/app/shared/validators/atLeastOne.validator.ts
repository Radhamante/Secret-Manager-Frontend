import {
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
  FormGroup,
} from '@angular/forms';

export function atLeastOneValidator(
  first: string,
  second: string
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const form = control as FormGroup;
    const firstValue = form.get(first)?.value;
    const secondeValue = form.get(second)?.value;

    if (firstValue || secondeValue) {
      return null; // Validation successful
    }

    const errorName = `${first}Or${second}Required`;

    return { [errorName]: true }; // Validation error
  };
}
