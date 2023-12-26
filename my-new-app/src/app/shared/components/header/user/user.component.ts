import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../auth/auth.service';

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
    this.userName = '';
  }
  navigateToLogin() {
    if (!localStorage.getItem('login')) {
      console.log('login default');
      this.router.navigate(['./login']);
    } else {
      this.userName = 'Login';
      console.log('logout default');
      this.authService.loginName = 'Login';
      localStorage.removeItem('login');
      this.router.navigate(['']);
    }
  }
  ngOnInit(): void {
    // console.log('checkLogin');
    this.authService.loginNameObject.subscribe(data => {
      this.userName = data;
    });
    // this.userName = this.authService.loginName.valueOf();
    // console.log(this.userName);
  }
}
