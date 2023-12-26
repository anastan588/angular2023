import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent implements OnInit {
  isLogged: boolean;
  urlNotfoundPage!: string;
  constructor(private authService: AuthService, private router: Router, private location: Location) {
    this.isLogged = false;
  }
  ngOnInit(): void {
    this.isLogged = this.authService.getLocalStorageData();
    this.urlNotfoundPage = window.location.href;
  }
}
