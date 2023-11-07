import { Component } from '@angular/core';
import { InputComponent } from 'src/app/shared/components/input/input.component';
import { FormControl, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [
    Validators.required,
    Validators.pattern(/\S$/),
    Validators.pattern(/^\S/),
    Validators.pattern(/.{8}/),
    Validators.pattern(/[A-Z]/),
    Validators.pattern(/[a-z]/),
    Validators.pattern(/\d/),
  ]);
  constructor(private readonly authService: AuthService) {

  }
  setLoginToken() {
    console.log(this.password.value);
    console.log(this.email.value);
    this.authService.setLoginAndPassword(this.email.value as string, this.password.value as string);
  }
  getErrorMessageForEmail() {
    if (this.email.hasError('required')) {
      return 'Please enter a login email';
    }

    return this.email.hasError('email') ? 'The login email is invalid' : '';
  }

  getErrorMessageForPassword() {
    const error = this.password.errors as ValidationErrors;
    if (this.password.hasError('required')) {
      return 'Please enter a password';
    }
    console.log(error['pattern']['requiredPattern']);
    if (error['pattern']['requiredPattern'] === '/S$/') {
      return `Password must not contain trailing whitespace`;
    } else if (error['pattern']['requiredPattern'] === '/^S/') {
      return `Password must not contain leading whitespace`;
    } else if (error['pattern']['requiredPattern'] === '/.{8}/') {
      return `Password must be at least 8 characters long`;
    } else if (error['pattern']['requiredPattern'] === '/[A-Z]/') {
      console.log('popke');
      return `Password must contain at least one uppercase letter (A-Z)`;
    } else if (error['pattern']['requiredPattern'] === '/[a-z]/') {
      return `Password must contain at least one lowercase letter (a-z)`;
    } else if (error['pattern']['requiredPattern'] === '/d/') {
      console.log('popke');
      return `Password must contain at least one digit (0-9)`;
    }
    return;
  }
}