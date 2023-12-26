import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { Action, State, Store } from '@ngrx/store';
import {
  startCurrentGroupConversationTimer,
  stopCurrentGroupConversationTimer,
  stopCurrentGroupConversationTimerImmediately,
  updateCurrentGroupConversationTimer,
} from './milestone.actions';
import { interval } from 'rxjs';

@Injectable()
export class MileStartGroupMessagesTimerEffects {
  startGroupTimer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(startCurrentGroupConversationTimer),
      switchMap(() =>
        interval(1000).pipe(
          takeUntil(this.actions$.pipe(ofType(stopCurrentGroupConversationTimerImmediately))),
          take(60), 
          map(tick => 60 - tick - 1), 
          tap(currenttime => {
            if (currenttime === 0) {
              this.store.dispatch(stopCurrentGroupConversationTimer());
              this.store.dispatch(updateCurrentGroupConversationTimer({ currenttime: 60 }));
            } else {
              this.store.dispatch(updateCurrentGroupConversationTimer({ currenttime }));
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
