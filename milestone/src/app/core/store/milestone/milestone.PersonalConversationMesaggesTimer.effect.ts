import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { Action, State, Store } from '@ngrx/store';
import {
  startCurrentPersonalConversationTimer,
  stopCurrentPersonalConversationTimer,
  stopCurrentPersonalConversationTimerImmediately,
  updateCurrentGroupConversationTimer,
  updateCurrentPersonalConversationTimer,
} from './milestone.actions';
import { interval } from 'rxjs';

@Injectable()
export class MileStartPersoanlConversationMessagesTimerEffects {
  startPersonalConversationTimer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(startCurrentPersonalConversationTimer),
      switchMap(() =>
        interval(1000).pipe(
          takeUntil(this.actions$.pipe(ofType(stopCurrentPersonalConversationTimerImmediately))),
          take(60), 
          map(tick => 60 - tick - 1), 
          tap(currenttime => {
            if (currenttime === 0) {
              this.store.dispatch(stopCurrentPersonalConversationTimer());
              this.store.dispatch(updateCurrentPersonalConversationTimer({ currenttime: 60 }));
            } else {
              this.store.dispatch(updateCurrentPersonalConversationTimer({ currenttime }));
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
