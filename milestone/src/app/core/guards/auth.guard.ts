import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = new AuthService(router);
  const canActivate = authService.getLocalStorageData();
  console.log(canActivate);
  if (canActivate === false) {
    return true;
  }
  return false;
};
