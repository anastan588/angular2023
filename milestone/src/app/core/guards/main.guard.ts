import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { ToastMessageService } from '../services/toast-message.service';
import { Store } from '@ngrx/store';

export const mainGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const http = inject(HttpClient);
  const toastMessageService = inject(ToastMessageService);
  const store = inject(Store);
  const authService = new AuthService(router, http, toastMessageService, store);
  const canActivate = authService.getLocalStorageData();
  console.log(canActivate);
  if (canActivate === false) {
    return false;
  }
  return true;
};
