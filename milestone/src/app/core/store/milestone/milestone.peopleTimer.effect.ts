import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { Action,  Store } from '@ngrx/store';
import {
  startPeoplesTimer,
  stopPeoplesTimer,
  updatePeoplesTimer,
} from './milestone.actions';
import { interval} from 'rxjs';

@Injectable()
export class MileStartPeopleTimerEffects {
  startPeopleTimer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(startPeoplesTimer),
      switchMap(() =>
        interval(1000).pipe(
          take(60), 
          map(tick => 60 - tick - 1), 
          tap(currenttime => {
            if (currenttime === 0) {
              this.store.dispatch(stopPeoplesTimer());
              this.store.dispatch(updatePeoplesTimer({ currenttime: 60 }));
            } else {
              this.store.dispatch(updatePeoplesTimer({ currenttime }));
            }
          }) 
        )
      ),
      map(() => ({ type: 'EmptyAction' }) as Action)
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store,
  ) {}
}
