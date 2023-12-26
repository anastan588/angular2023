import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap} from 'rxjs/operators';
import { ApiService } from '../../services/api/api.service';
import {
  loadVideos,
  loadVideosSuccess,
} from './youtube.actions';
import { Store } from '@ngrx/store';


@Injectable()
export class VideoEffects {
  loadVideos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadVideos),
      mergeMap(() =>
        this.apiService.getVideos().pipe(
          map((response: any) => {
            return loadVideosSuccess({videos:response.items});
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private store: Store
  ) {}
}
