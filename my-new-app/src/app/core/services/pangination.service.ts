import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PanginationService {

startPositionObject$ = new BehaviorSubject<number>(0);
startPosition$: Observable<number>;

endPositionObject$ = new BehaviorSubject<number>(20);
endPosition$: Observable<number>;
  constructor() {
    this.startPosition$ = this.startPositionObject$.asObservable();
    this.endPosition$ = this.endPositionObject$.asObservable();
   }

   setStartAndEnd(start: number, end: number) {
    this.startPositionObject$.next(start);
    this.endPositionObject$.next(end);
   }
}
