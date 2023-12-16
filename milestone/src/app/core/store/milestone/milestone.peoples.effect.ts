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
} from './milestone.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { IServerResponseSignUp } from '../../models/serverresponse';
import { ToastMessageService } from '../../services/toast-message.service';
import { GroupsService } from '../../services/groups/groups.service';
import { of } from 'rxjs';

@Injectable()
export class MileStoneGroupsEffects {
  loadGroups$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadMilestoneGroups),
      withLatestFrom(this.groupsService.getGroupsFromStore()),
      filter(([action, catchedGroups]) => {
        console.log(catchedGroups[0]);
        this.groupsService.clickOnUpdateButton$.subscribe(value => {
          this.clickOnUpdateButton = value;
          return this.clickOnUpdateButton;
        });
        return !catchedGroups[0] || this.clickOnUpdateButton === true;
      }),
      mergeMap(() =>
        this.groupsService.getGroupsData().pipe(
          map(response => {
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

  clickOnUpdateButton!: boolean;
  constructor(
    private actions$: Actions,
    private groupsService: GroupsService,
    private store: Store,
    private toastMessageService: ToastMessageService
  ) {}
}
