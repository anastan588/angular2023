import { Injectable } from '@angular/core';
import { ILoginAuth } from '../core/data/models/login-auth';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { IVideoItem } from '../core/data/models/video-item';
import { IUser } from '../core/data/models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // login!: string;
  // password!: string;
  // loginToken: ILoginAuth;
  loginNameObject = new BehaviorSubject<string>('LogIn');
  loginName!: string;

  constructor(private router: Router) {
    // this.loginToken = {
    //   login: '',
    //   password: '',
    // };
  }

  ngOnInit() {
    if (localStorage.getItem('login')) {
      this.loginNameObject.next('LogOut');
    }
  }

  setLoginAndPassword(user: IUser) {
    localStorage.setItem('login', JSON.stringify(user));
    this.loginNameObject.next('LogOut');
    this.router.navigate(['']);
  }

  setAdminToken(admin: IVideoItem) {
    localStorage.setItem('admin', JSON.stringify(admin));
  }
}
