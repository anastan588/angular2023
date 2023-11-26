import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, Observable } from 'rxjs';
import { map, mergeMap, catchError, isEmpty } from 'rxjs/operators';
import { ApiService } from '../../services/api/api.service';
import {
  LOAD_VIDEOS,
  PageNumberActions,
  VideosReceiveFromApiActions,
  loadvideos,
  loadvideossuccess,
} from '../actions/actions';
import { IVideoItem } from '../models/video-item';
import { ISearchResponse } from '../models/search-response';
import { Store } from '@ngrx/store';
import { PageNextReducer } from '../reducers/reducers';

@Injectable()
export class VideoEffects {
  loadVideos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadvideos),
      mergeMap(() =>
        this.apiService.getVideos().pipe(
          map((response: any) => {
            return VideosReceiveFromApiActions.receiveVideosList({
              videos: response.items,
            });
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
