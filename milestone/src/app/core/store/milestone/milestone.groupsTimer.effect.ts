import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { Action, State, Store } from '@ngrx/store';
import {
  startGroupTimer,
  stopGroupTimer,
  updateGroupTimer,
} from './milestone.actions';
import { Observable, interval, of } from 'rxjs';
import { IMilestoneState } from './milestone.state';

@Injectable()
export class MileStartGroupTimerEffects {
  startGroupTimer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(startGroupTimer),
      switchMap(() =>
        interval(1000).pipe(
          take(60), 
          map(tick => 60 - tick - 1), 
          tap(currenttime => {
            if (currenttime === 0) {
              this.store.dispatch(stopGroupTimer());
              this.store.dispatch(updateGroupTimer({ currenttime: 60 }));
            } else {
              this.store.dispatch(updateGroupTimer({ currenttime }));
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
