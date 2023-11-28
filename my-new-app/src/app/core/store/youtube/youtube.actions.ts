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

export const removeVideo = createAction(
  '[YOUTUBE] Remove Video',
  props<{ video: IVideoItem }>(),
);

export const addVideo = createAction(
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



// export const FavouriteVideosActions = createActionGroup({
//   source: 'Videos Favourite',
//   events: {
//     'Add Favourite': props<{ videoId: string }>(),
//     'Remove Favourite': props<{ videoId: string }>(),
//     'Reset Favourite': emptyProps(),
//   },
// });

export const PageNumberActions = createActionGroup({
  source: 'page Number',
  events: {
    'Next Page': props<{ pageToken: string }>(),
    'Prevous Page': props<{ pageToken: string }>(),
    'Number Items':  props<{ pageItems: number }>(),
  },
});
