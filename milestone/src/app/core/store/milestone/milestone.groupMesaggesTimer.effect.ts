import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { Action, State, Store } from '@ngrx/store';
import {
  startCurrentGroupConversationTimer,
  startGroupTimer,
  stopCurrentGroupConversationTimer,
  stopGroupTimer,
  updateCurrentGroupConversationTimer,
  updateGroupTimer,
} from './milestone.actions';
import { Observable, interval, of } from 'rxjs';

@Injectable()
export class MileStartGroupMessagesTimerEffects {
  startGroupTimer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(startCurrentGroupConversationTimer),
      switchMap(() =>
        interval(1000).pipe(
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
