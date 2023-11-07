import { CanActivateFn, Router } from '@angular/router';

export const loginGuard: CanActivateFn = (route, state) => {
  let router = route;
  console.log(route);
  if (!localStorage.getItem('login')) {
    return false;
  }
  return true;
};
