import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import {
  loadMilestoneUser,
  loadMilestoneUserSuccess,
} from './milestone.actions';
import { ProfileService } from '../../services/profile/profile.service';
import { IUser } from '../../models/user';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import {
  HttpBackend,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import {
  IServerResponseSignIn,
  IServerResponseSignUp,
} from '../../models/serverresponse';
import { Observable, of } from 'rxjs';

@Injectable()
export class MileStoneUserEffects {
  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadMilestoneUser),
      mergeMap(() =>
        this.profileService.getUsersData().pipe(
          map(response => {
            console.log(response);
            return loadMilestoneUserSuccess({ user: response });
          }),
          catchError((error: HttpErrorResponse) => {
            const serverResponse: IServerResponseSignUp = error.error;
            this.showToastMessage(
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
    private toastMessage: MatSnackBar
  ) {}

  showToastMessage(
    message: string,
    action: string,
    position: {
      horizontal: MatSnackBarHorizontalPosition;
      vertical: MatSnackBarVerticalPosition;
    } = { horizontal: 'center', vertical: 'top' }
  ) {
    this.toastMessage.open(message, action, {
      duration: 5000,
      horizontalPosition: position.horizontal,
      verticalPosition: position.vertical,
      panelClass: 'snackbar',
    });
  }
}
