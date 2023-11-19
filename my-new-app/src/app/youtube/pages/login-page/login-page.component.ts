import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { IUser } from 'src/app/core/store/models/user';
import { createPasswordValidator } from 'src/app/core/validators/password.validator';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  hide = true;
  loginForm = this.fb.group({
    email: ['', { validators: [Validators.required, Validators.email] }],
    password: [
      '',
      {
        validators: [
          Validators.required,
          createPasswordValidator()
        ],
      },
    ],
  });
  constructor(
    private readonly authService: AuthService,
    private fb: FormBuilder
  ) {}

  loginUser(): IUser {
    const user: IUser = {
      email: this.loginForm.value.email!,
      password: this.loginForm.value.password!,
    };
    return user;
  }

  setLoginToken() {
    const user = this.loginUser();
    this.authService.setLoginAndPassword(user);
  }

}
