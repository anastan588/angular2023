import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'milestone';
  constructor(private router: Router) {}

  redirectToSignUp() {
    this.router.navigate(['signup']);
  }

  redirectToSignIn() {
    this.router.navigate(['signin']);
  }
}
