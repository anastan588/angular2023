import { inject } from '@angular/core';
import { CanActivateFn, CanDeactivateFn, Router, RouterOutlet } from '@angular/router';

export const loginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  console.log(route.routeConfig?.path);
  if (!localStorage.getItem('login')) {
    router.navigateByUrl('login');
    return false;
  }
  return true;
};


