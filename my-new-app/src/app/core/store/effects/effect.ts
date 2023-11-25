import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, isEmpty } from 'rxjs/operators';
import { ApiService } from '../../services/api/api.service';
import {
  LOAD_VIDEOS,
  VideosReceiveFromApiActions,
  loadvideos,
  loadvideossuccess,
} from '../actions/actions';
import { IVideoItem } from '../models/video-item';
import { ISearchResponse } from '../models/search-response';

@Injectable()
export class VideoEffects {
  loadVideos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadvideos),
      mergeMap(() =>
        this.apiService
          .getVideos()
          .pipe(
            map((response: any) =>
              VideosReceiveFromApiActions.receiveVideosList({
                videos: response.items
              })
            )
          )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private apiService: ApiService
  ) {}
}
