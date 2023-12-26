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
  loadMilestoneConversationsSuccess,
  loadMilestoneUsers,
  loadMilestoneUsersSuccess,
} from './milestone.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { IServerResponseSignUp } from '../../models/serverresponse';
import { ToastMessageService } from '../../services/toast-message.service';
import { forkJoin, of } from 'rxjs';
import { PeoplesService } from '../../services/peoples/peoples.service';

@Injectable()
export class MilePoeplesEffects {
  loadPeoples$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadMilestoneUsers),
      withLatestFrom(this.peopleService.getPeopleFromStore()),
      filter(([action, catchedPeople]) => {
        console.log(catchedPeople[0]);
        this.peopleService.clickOnUpdateButton$.subscribe(value => {
          this.clickOnUpdateButton = value;
          return this.clickOnUpdateButton;
        });
        console.log(this.clickOnUpdateButton);
        return !catchedPeople[0] || this.clickOnUpdateButton === true;
      }),
      mergeMap(() =>
        forkJoin(
          this.peopleService.getPeoplesData(),
          this.peopleService.getConverasationData()
        ).pipe(
          mergeMap(([peoplesData, conversationData]) => {
            console.log(peoplesData);
            console.log(conversationData);
            loadMilestoneUsersSuccess({ peoples: peoplesData });
            loadMilestoneConversationsSuccess({
              conversations: conversationData,
            });
            return [
              loadMilestoneUsersSuccess({ peoples: peoplesData }),
              loadMilestoneConversationsSuccess({
                conversations: conversationData,
              }),
            ];
          }),
          catchError((error: HttpErrorResponse) => {
            const serverResponse: IServerResponseSignUp = error.error;
            this.toastMessageService.showToastMessage(
              'Loading users and conversations data failed: ' +
                serverResponse.message,
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
    private peopleService: PeoplesService,
    private store: Store,
    private toastMessageService: ToastMessageService
  ) {}
}
