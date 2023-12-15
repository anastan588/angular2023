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
  loadMilestoneGroups,
  loadMilestoneGroupsSuccess,
  loadMilestoneUser,
  loadMilestoneUserSuccess,
} from './milestone.actions';
import { ProfileService } from '../../services/profile/profile.service';
import { HttpErrorResponse } from '@angular/common/http';
import { IServerResponseSignUp } from '../../models/serverresponse';
import { Observable, of } from 'rxjs';
import { ToastMessageService } from '../../services/toast-message.service';
import { GroupsService } from '../../services/groups/groups.service';

@Injectable()
export class MileStoneGroupsEffects {
  loadGroups$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadMilestoneGroups),
      mergeMap(() =>
        this.groupsService.getGroupsData().pipe(
          map(response => {
            console.log('groups service');
            console.log(response);
            return loadMilestoneGroupsSuccess({ groups: response });
          }),
          catchError((error: HttpErrorResponse) => {
            const serverResponse: IServerResponseSignUp = error.error;
            this.toastMessageService.showToastMessage(
              'Loading groups data failed: ' + serverResponse.message,
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
    private groupsService: GroupsService,
    private store: Store,
    private toastMessageService: ToastMessageService
  ) {}
}
