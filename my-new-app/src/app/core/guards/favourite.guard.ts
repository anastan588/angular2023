import { CanActivateFn } from '@angular/router';
import { FavoriteService } from '../services/favorite/favorite.service';
import { inject } from '@angular/core';

export const favouriteGuard: CanActivateFn = (route, state) => {
  const favoriteService = inject(FavoriteService);
  favoriteService.canRouteToFavoritePage$.subscribe((data)=>{
    if (data === false) {
    return false;
  }
  return true;
  });
  return true;
};
