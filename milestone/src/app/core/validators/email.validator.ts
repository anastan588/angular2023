import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function createEmailValidator(duplicateEmail: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value || value === '') {
      return null;
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let emailValid = emailRegex.test(control.value);
    if (value === duplicateEmail) {
      emailValid = false;
    }
    return emailValid ? null :  { email: true };
  };
}
