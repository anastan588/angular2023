import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { SigninService } from './core/services/signin/signin.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  userStatus!: string;
  title = 'milestone';
  constructor(private router: Router,
    private signinService: SigninService) {
     
    }
  redirectToSignUp() {
    this.router.navigate(['signup']);
  }

  redirectToSignIn() {
    if (!localStorage.getItem('user')) {
      console.log('logout default');
      this.router.navigate(['main']);
     
    } else {
      this.userStatus = 'Login';
      console.log('login default');
       localStorage.removeItem('user');
      this.router.navigate(['signin']);
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
    if (!localStorage.getItem('user')) {
       this.userStatus = 'Login'
      } else {
        this.userStatus = 'Logout'
      }
  }
}
