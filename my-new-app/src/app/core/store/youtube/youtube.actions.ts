import {
  createAction,
  createActionGroup,
  emptyProps,
  props,
} from '@ngrx/store';
import { IVideoItem } from '../../data/models/video-item';



export const loadVideos = createAction('[YOUTUBE] Load Videos');

export const loadVideosSuccess = createAction(
  '[YOUTUBE] Load Videos (Success)',
  props<{ videos: IVideoItem[] }>(),
);

export const removeTubeVideo = createAction(
  '[YOUTUBE] Remove Video',
  props<{ video: IVideoItem }>(),
);

export const addTubeVideo = createAction(
  '[YOUTUBE] Add Video',
  props<{ video: IVideoItem }>(),
);


export const LoadCustomVideos = createAction(
  '[YOUTUBE] Load Custom Videos',
  props<{ videos: IVideoItem[] }>(),
);

export const removeCustomVideo = createAction(
  '[YOUTUBE] Remove Custom Video',
  props<{ video: IVideoItem }>(),
);

export const addCustomVideo = createAction(
  '[YOUTUBE] Add Custom Video',
  props<{ video: IVideoItem }>(),
);

export const loadFavoriteVideos = createAction(
  '[YOUTUBE] Load Favorite Videos',
  props<{ videoIds: string[] }>(),
);

export const resetFavoriteVideos = createAction(
  '[YOUTUBE] Reset Favorite Videos',
);

export const removeFavoriteVideo = createAction(
  '[YOUTUBE] Remove Favorite Video',
  props<{ videoId: string }>(),
);

export const addFavoriteVideo = createAction(
  '[YOUTUBE] Add Favorite Video',
  props<{ videoId: string }>(),
);


export const setNextPage = createAction(
  '[YOUTUBE] Set next Page Token',
  props<{ pageToken: string }>(),
);

export const setPreviousPage = createAction(
  '[YOUTUBE] Set previous Page Token',
  props<{ pageToken: string }>(),
);

export const setNumberItemsOnPage = createAction(
  '[YOUTUBE] Set Number Items On Page',
  props<{ pageItems: number }>(),
);


// export const PageNumberActions = createActionGroup({
//   source: 'page Number',
//   events: {
//     'Next Page': props<{ pageToken: string }>(),
//     'Prevous Page': props<{ pageToken: string }>(),
//     'Number Items':  props<{ pageItems: number }>(),
//   },
// });
