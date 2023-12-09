import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap} from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { loadMilestoneUser, loadMilestoneUserSuccess } from './milestone.actions';
import { ProfileService } from '../../services/profile/profile.service';


@Injectable()
export class MileStoneUserEffects {
  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadMilestoneUser),
      mergeMap(() =>
        this.profileService.getUsersData().pipe(
          map((response: any) => {
            return loadMilestoneUserSuccess({user: response});
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private profileService: ProfileService,
    private store: Store
  ) {}
}