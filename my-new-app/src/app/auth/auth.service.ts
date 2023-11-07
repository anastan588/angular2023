import { Injectable } from '@angular/core';
import { ILoginAuth } from '../core/store/models/login-auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  login!: string;
  password!: string;
  loginToken: ILoginAuth;
  constructor(private router: Router) {
    this.loginToken = {
      login: '',
      password: '',
    };
  }

  setLoginAndPassword(loginValue: string, passwordValue: string) {
    this.login = loginValue;
    this.password = passwordValue;
    this.loginToken.login = this.login;
    this.loginToken.password = this.password;
    localStorage.setItem('login', JSON.stringify(this.loginToken));
    console.log(localStorage.getItem('login'));
    this.router.navigate(['']);
  }
}
