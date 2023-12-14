import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent implements OnInit {
  isLogged: boolean;
  constructor(private authService: AuthService) {
    this.isLogged = false;
  }
  ngOnInit(): void {
    this.isLogged = this.authService.getLocalStorageData();
  }
}
