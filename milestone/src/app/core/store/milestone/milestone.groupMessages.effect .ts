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
  startCurrentGroupConversationTimer,
} from './milestone.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { IServerResponseSignUp } from '../../models/serverresponse';
import { of } from 'rxjs';
import { ToastMessageService } from '../../services/toast-message.service';
import { GroupsService } from '../../services/groups/groups.service';
import { GroupDialogService } from '../../services/group-dialog/group-dialog.service';
import { Router } from '@angular/router';

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
            if (serverResponse.type === 'InvalidIDException') {
              this.toastMessageService.showToastMessage(
                `Group with this id ${this.groupDialogService.currentGroup.id.S} does not exist or was removed before.` + serverResponse.message,
                'close'
              );
              this.router.navigate(['/']);
            } else {
               this.toastMessageService.showToastMessage(
              'Loading group messages data failed: ' + serverResponse.message,
              'close'
            );
            }
           
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
    private toastMessageService: ToastMessageService,
    private router: Router
  ) {}
}
