import { ResolveFn } from '@angular/router';

export const groupPageResolver: ResolveFn<boolean> = (route, state) => {
  console.log(route.paramMap.get('id'));
  console.log(state);
  return true;
};
