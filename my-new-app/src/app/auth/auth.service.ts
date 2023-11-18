import { Injectable } from '@angular/core';
import { ILoginAuth } from '../core/store/models/login-auth';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { IVideoItem } from '../core/store/models/video-item';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  login!: string;
  password!: string;
  loginToken: ILoginAuth;
  loginNameObject = new BehaviorSubject<string>('LogIn');
  loginName!: string;
  
  constructor(private router: Router) {
    this.loginToken = {
      login: '',
      password: '',
    };
   
  }

  ngOnInit() { 
    if (localStorage.getItem('login')) {
      this.loginNameObject.next('LogOut');
    } 
   
  }

  setLoginAndPassword(loginValue: string, passwordValue: string) {
    this.login = loginValue;
    this.password = passwordValue;
    this.loginToken.login = this.login;
    this.loginToken.password = this.password;
    localStorage.setItem('login', JSON.stringify(this.loginToken));
    this.loginNameObject.next('LogOut');
    this.router.navigate(['']);
  }
}
