import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn!: boolean;
  constructor(private router: Router) {
    this.isLoggedIn = false;
  }

  getLocalStorageData(): boolean {
    const user = localStorage.getItem('user');
    console.log(user);
    console.log(user !== null);
    if (user !== null) {
      this.isLoggedIn = true;
    }
    console.log(this.isLoggedIn);
    return this.isLoggedIn;
  }

  getDefaultRoute(): string {
    this.getLocalStorageData();
    if (this.isLoggedIn === false) {
      this.router.navigate(['signin']);
    } else if (this.isLoggedIn === true) {
      this.router.navigate(['main']);
    }
    return this.isLoggedIn ? 'main' : 'signin';
  }
}
