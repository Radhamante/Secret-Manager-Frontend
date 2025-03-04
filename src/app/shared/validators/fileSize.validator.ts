import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function fileSizeValidator(maxSizeInMB: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const file = control.value;

    if (file && file instanceof File) {
      const maxSizeInBytes = maxSizeInMB * 1024 * 1024; // Conversion en octets
      if (file.size > maxSizeInBytes) {
        return {
          fileSize: `Le fichier dépasse la taille maximale de ${maxSizeInMB} MB.`,
        };
      }
    }

    return null; // Valide si aucune erreur
  };
}
