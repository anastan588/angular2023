import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  canRouteToFavoritePage$= new Subject<boolean>();
  constructor() { 
    this.canRouteToFavoritePage$.next(false);
  }
}
