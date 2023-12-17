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
  loadMilestoneGroupMessages,
  loadMilestoneGroupMessagesSuccess,
  loadMilestoneGroups,
  loadMilestoneGroupsSuccess,
} from './milestone.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { IServerResponseSignUp } from '../../models/serverresponse';
import { of } from 'rxjs';
import { ToastMessageService } from '../../services/toast-message.service';
import { GroupsService } from '../../services/groups/groups.service';
import { GroupDialogService } from '../../services/group-dialog/group-dialog.service';

@Injectable()
export class MileStoneGroupMessagesEffects {
  loadGroupMessages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadMilestoneGroupMessages),
      // withLatestFrom(this.groupDialogService.getGroupMessagesFromStore()),
      // filter(([action, catchedGroupMessages]) => {
      //   console.log(catchedGroupMessages[0]);
      //   this.groupDialogService.clickOnUpdateButton$.subscribe(value => {
      //     this.clickOnUpdateButton = value;
      //     return this.clickOnUpdateButton;
      //   });
      //   return !catchedGroupMessages[0] || this.clickOnUpdateButton === true;
      // }),
      mergeMap(() =>
        this.groupDialogService.getGroupMessagesData().pipe(
          map(response => {
            return loadMilestoneGroupMessagesSuccess({
              groupMessages: response,
            });
          }),
          catchError((error: HttpErrorResponse) => {
            const serverResponse: IServerResponseSignUp = error.error;
            this.toastMessageService.showToastMessage(
              'Loading group messages data failed: ' + serverResponse.message,
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

  clickOnUpdateButton!: boolean;
  constructor(
    private actions$: Actions,
    private groupDialogService: GroupDialogService,
    private store: Store,
    private toastMessageService: ToastMessageService
  ) {}
}
