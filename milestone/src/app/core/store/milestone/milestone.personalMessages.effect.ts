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
  addNewPersonalConversationMessage,
  loadMilestonePersonalConversationMessages,
  loadMilestonePersonalConversationMessagesSuccess,
} from './milestone.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { IServerResponseSignUp } from '../../models/serverresponse';
import { of } from 'rxjs';
import { ToastMessageService } from '../../services/toast-message.service';
import { Router } from '@angular/router';
import { PersonalConversationService } from '../../services/personal-conversation/personal-conversation.service';

@Injectable()
export class MileStonePersonalMessagesEffects {
  loadPersonalMessages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadMilestonePersonalConversationMessages),
      mergeMap(() =>
        this.personalService.getGroupMessagesData().pipe(
          map(response => {
            console.log(response);

            if (this.personalService.since === undefined) {
              console.log(this.personalService.since);
              if (response.Items.length !== 0) {
                this.personalService.since = Number(
                  response.Items[response.Items.length - 1].createdAt.S
                );
              }
              // console.log(this.groupDialogService.since);
              return loadMilestonePersonalConversationMessagesSuccess({
               personalMessages: response,
              });
            } else {
              console.log(this.personalService.since);
              if (response.Items.length !== 0) {
                this.personalService.since = Number(
                  response.Items[response.Items.length - 1].createdAt.S
                );
              }

              return addNewPersonalConversationMessage({
                personalMessage: response.Items,
              });
            }
            // return loadMilestoneGroupMessagesSuccess({
            //   groupMessages: response,
            // });
          }),
          catchError((error: HttpErrorResponse) => {
            const serverResponse: IServerResponseSignUp = error.error;
            console.log(serverResponse);
            if (serverResponse !== undefined) {
              if (serverResponse.type === 'InvalidIDException') {
                this.toastMessageService.showToastMessage(
                  `Personal conversation with this id ${this.personalService.currentPersonalConversation.conversationID} does not exist or was removed before.` +
                    serverResponse.message,
                  'close'
                );
                this.router.navigate(['/']);
              } else {
                this.toastMessageService.showToastMessage(
                  'Loading group messages data failed: ' +
                    serverResponse.message,
                  'close'
                );
              }
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
    private personalService: PersonalConversationService,
    private store: Store,
    private toastMessageService: ToastMessageService,
    private router: Router
  ) {}
}
