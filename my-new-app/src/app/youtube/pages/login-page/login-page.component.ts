import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  @Output()
public clickEmitter = new EventEmitter();
  hide = true;
  loginForm = this.fb.group({
    email: ['', { validators: [Validators.required, Validators.email] }],
    password: [
      '',
      {
        validators: [
          Validators.required,
          Validators.pattern(/\S$/),
          Validators.pattern(/^\S/),
          Validators.pattern(/.{8}/),
          Validators.pattern(/[A-Z]/),
          Validators.pattern(/[a-z]/),
          Validators.pattern(/\d/),
        ],
      },
    ],
  });
  constructor(
    private readonly authService: AuthService,
    private fb: FormBuilder
  ) {}
  get _email() {
    return this.loginForm.get('email');
  }

  get _password() {
    return this.loginForm.get('password');
  }

  setLoginToken() {
    console.log('clicklogin')
    const email = this.loginForm.get('email')!.value;
    const password = this.loginForm.get('password')!.value;
    this.authService.setLoginAndPassword(email!, password!);
  }

  getErrorMessageForEmail() {
    console.log(this.loginForm.get('email')!.value);
    if (this.loginForm.get('email')!.hasError('required')) {
      return 'Please enter a login email';
    }
    return this.loginForm.get('email')!.hasError('email')
      ? 'The login email is invalid'
      : '';
  }

  getErrorMessageForPassword() {
    if (this.loginForm.get('password')!.hasError('required')) {
      return 'Please enter a password';
    }

    if (this.loginForm.get('password')!.getError('pattern')) {
      console.log(
        this.loginForm.get('password')!.getError('pattern').requiredPattern
      );
      if (
        this.loginForm.get('password')!.getError('pattern').requiredPattern ==
        '/S$/'
      ) {
        return `Password must not contain trailing whitespace`;
      } 
      if (
        this.loginForm.get('password')!.getError('pattern').requiredPattern ==
        '/^S/'
      ) {
        return `Password must not contain leading whitespace`;
      } 
      if (
        this.loginForm.get('password')!.getError('pattern').requiredPattern ==
        '/.{8}/'
      ) {
        return `Password must be at least 8 characters long`;
      } 
      if (
        this.loginForm.get('password')!.getError('pattern').requiredPattern ==
        '/[A-Z]/'
      ) {
        return `Password must contain at least one uppercase letter (A-Z)`;
      } 
      if (
        this.loginForm.get('password')!.getError('pattern').requiredPattern ==
        '/[a-z]/'
      ) {
        return `Password must contain at least one lowercase letter (a-z)`;
      } 
      if (
        this.loginForm.get('password')!.getError('pattern').requiredPattern
          .value == '/d/'
      ) {
        return `Password must contain at least one digit (0-9)`;
      }
    }

    return;
  }
}
