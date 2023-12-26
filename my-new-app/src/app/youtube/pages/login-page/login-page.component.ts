import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from './../../../auth/auth.service';
import { IUser } from './../../../core/data/models/user';
import { createPasswordValidator } from './../../../core/validators/password.validator';
const mockUser = {
 email: 'mail@mail.ru',
 password: '123456Ui',
};

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
        validators: [Validators.required, createPasswordValidator()],
      },
    ],
  });

  user$: Observable<IUser>;
  constructor(
    private readonly authService: AuthService,
    private fb: FormBuilder,
    private store: Store<{ user: IUser }>
  ) {
    this.user$ = store.select('user');
  }

  loginUser(): IUser {
    const user: IUser = {
      email: this.loginForm.value.email!,
      password: this.loginForm.value.password!,
    };
    return user;
  }

  setLoginToken() {
    const user = this.loginUser();
    console.log(user);
    this.authService.setLoginAndPassword(user);
  }
}
