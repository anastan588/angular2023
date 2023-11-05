import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 login!: string;
 password!: string;
  constructor() { }

  setLoginAndPassword(loginValue: string, passwordValue: string) {
    this.login = loginValue;
    this.password = passwordValue;

    localStorage.setItem('login', this.login)
  }
}
