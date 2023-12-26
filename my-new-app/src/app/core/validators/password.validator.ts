import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function createPasswordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) {
      return null;
    }
    const noTrailingWhiteSpaces = /\S$/.test(value);
    const noLeadingWhiteSpaces = /^\S/.test(value);
    const hasLenghtatLeast = /.{8}/.test(value);
    const hasUppercaseLetter = /[A-Z]/.test(value);
    const hasLowercaseLetter = /[a-z]/.test(value);
    const hasOneDigit = /\d/.test(value);

    console.log(
      noTrailingWhiteSpaces,
      noLeadingWhiteSpaces,
      hasLenghtatLeast,
      hasUppercaseLetter,
      hasLowercaseLetter,
      hasOneDigit
    );
    const passwordValid =
      noTrailingWhiteSpaces &&
      noLeadingWhiteSpaces &&
      hasLenghtatLeast &&
      hasUppercaseLetter &&
      hasLowercaseLetter &&
      hasOneDigit;

    return !passwordValid ? { password: true } : null;
  };
}
