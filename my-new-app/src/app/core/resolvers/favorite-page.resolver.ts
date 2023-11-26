import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { FavoritePageComponent } from 'src/app/youtube/pages/favorite-page/favorite-page.component';

export const favoritePageResolver: ResolveFn<boolean> = (route, state) => {
  console.log(route.data);
  console.log(state);
  return true;
};
