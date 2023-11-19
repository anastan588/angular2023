import { Injectable } from '@angular/core';
import { ILoginAuth } from '../core/store/models/login-auth';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { IVideoItem } from '../core/store/models/video-item';
import { IUser } from '../core/store/models/user';
import { IAdmin } from '../core/store/models/admin';

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

  setAdminToken(admin: IAdmin) {
    localStorage.setItem('admin', JSON.stringify(admin));
  }
}
