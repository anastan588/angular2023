import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  filter,
  map,
  mergeMap,
  withLatestFrom,
} from 'rxjs/operators';
import { Store } from '@ngrx/store';
import {
  loadMilestoneUser,
  loadMilestoneUserSuccess,
} from './milestone.actions';
import { ProfileService } from '../../services/profile/profile.service';
import {
  HttpErrorResponse,
} from '@angular/common/http';
import {
  IServerResponseSignUp,
} from '../../models/serverresponse';
import { Observable, of } from 'rxjs';
import { ToastMessageService } from '../../services/toast-message.service';

@Injectable()
export class MileStoneUserEffects {
  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadMilestoneUser),
      withLatestFrom(this.profileService.getUserFromStore()),
      filter(([action, catchedUser]) => {
        console.log(catchedUser);
        return !catchedUser.uid.S;
      }),
      mergeMap(() =>
        this.profileService.getUsersData().pipe(
          map(response => {
            console.log(response);
            return loadMilestoneUserSuccess({ user: response });
          }),
          catchError((error: HttpErrorResponse) => {
            const serverResponse: IServerResponseSignUp = error.error;
            this.toastMessageService.showToastMessage(
              'Loading user data failed: ' + serverResponse.message,
              'close'
            );
            return of({
              type: serverResponse.type,
              message: serverResponse.message,
            });
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private profileService: ProfileService,
    private store: Store,
    private toastMessageService: ToastMessageService
  ) {}
}
