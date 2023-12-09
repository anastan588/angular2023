import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DefaultpageService {
  constructor(private authService: AuthService) {}

  getDefaultRoute(): string {
    return this.authService.getDefaultRoute();
  }
}
