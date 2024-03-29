import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { SigninService } from './core/services/signin/signin.service';
import { AuthService } from './core/services/auth/auth.service';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  userStatus!: string;
  isButtonDisabled!: boolean;
  title = 'milestone';
  isLogged!: boolean;
  isChecked: boolean = false;

  isDarkTheme: boolean = false;
  primaryColor: ThemePalette = 'primary';
  accentColor: ThemePalette = 'accent';
  constructor(
    private router: Router,
    private signinService: SigninService,
    private authService: AuthService
  ) {
    this.isButtonDisabled = false;
    console.log(localStorage.getItem('theme') );
    if (localStorage.getItem('theme') === 'dark') {
      this.isDarkTheme = true;
      this.primaryColor = 'warn';
      this.isChecked = true;
    } else if (localStorage.getItem('theme') === 'light') {
      this.isDarkTheme = false;
      this.primaryColor = 'primary';
      this.isChecked = false;
    }
    console.log(this.isDarkTheme);
  }

  changeColorScheme() {
    console.log(this.isDarkTheme);
    this.isDarkTheme = !this.isDarkTheme;
    if (this.isDarkTheme) {
      this.primaryColor = 'warn';
      localStorage.setItem('theme', 'dark');
      this.isChecked = true;
    } else {
      this.primaryColor = 'primary';
      localStorage.setItem('theme', 'light');
      this.isChecked = false;
    }
    console.log(this.primaryColor);
  }

  redirectToSignUp() {
    this.router.navigate(['signup']);
  }
  redirectToSignIn() {
    this.router.navigate(['signin']);
  }

  redirectToSignInLogOut() {
    console.log(!localStorage.getItem('user'));
    if (localStorage.getItem('user')) {
      console.log('logout default');
      this.authService.quitFromApplication();
    } else {
      this.router.navigate(['signin']);
      console.log('login default');
    }
  }
  redirectToProfile() {
    this.router.navigate(['profile']);
  }
  ngOnInit(): void {
    this.signinService.userStatusObject$.subscribe(data => {
      console.log(data);
      this.userStatus = data;
    });
    this.authService.userStatusObject$.subscribe(data => {
      console.log(data);
      this.userStatus = data;
    });
    this.authService.isButtonDisabledObject$.subscribe(data => {
      console.log(data);
      this.isButtonDisabled = data;
    });
    if (!localStorage.getItem('user')) {
      this.userStatus = 'Login';
    } else {
      this.userStatus = 'Logout';
    }
    this.isLogged = this.authService.getLocalStorageData();
    // if (this.isLogged) {
    //   this.router.navigate(['main']);
    // } else if (!this.isLogged) {
    //   this.router.navigate(['signin']);
    // }
  }
}
