import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent {
  userName: string;
  constructor(
    private router: Router,
    private readonly authService: AuthService
  ) {
    if (!localStorage.getItem('login')) {
      this.userName = 'Login';
    } else {
      this.userName = 'Logout';
    }
  }
  navigateToLogin() {
    if (!localStorage.getItem('login')) {
      console.log('login default');
      this.router.navigate(['./login']);
    } else {
      this.userName = 'Login';
      console.log('logot default');
      this.authService.loginName = 'Login';
      localStorage.removeItem('login');
      this.router.navigate(['']);
    }
  }
  ngDoCheck(): void {
    console.log('checkLogin');
    this.userName = this.authService.loginName.valueOf();
    console.log(this.userName);
  }
}
