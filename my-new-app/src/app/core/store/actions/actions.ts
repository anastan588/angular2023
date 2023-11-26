import { createAction, createActionGroup, props } from '@ngrx/store';
import { IUser } from '../models/user';
import { IVideoItem } from '../models/video-item';

export const setLoginToken = createAction(
  '[LoginPage Component] setLoginToken',
  props<{ user: IUser }>()
);

// export const setResultVideoItems = createAction(
//   '[SearchInput Component] setResultVideoItems',
//   props<{ videos: IVideoItem[] }>()
// );

export const LOAD_VIDEOS = '[Main Page] Videos Loads';
export const LOAD_VIDEOS_SUCCESS = '[Main Page] Videos Loaded Success';

export const loadvideos = createAction(LOAD_VIDEOS);
export const loadvideossuccess = createAction(
  LOAD_VIDEOS_SUCCESS,
  props<{ videos: IVideoItem[] }>
);

export const VideosReceiveFromApiActions = createActionGroup({
  source: 'Video API',
  events: {
    'Receive Videos List': props<{ videos: Array<IVideoItem> }>(),
  },
});

export const VideosSearchActions = createActionGroup({
  source: 'Videos',
  events: {
    'Remove Video': props<{ videoId: string }>(),
    'Add Video': props<{ videoId: string }>(),
  },
});

export const FavouriteReceiveVideosActions = createActionGroup({
  source: 'Favourite Receive',
  events: {
    'Receive Favorite': props<{ videos: ReadonlyArray<IVideoItem> }>(),
  },
});

export const FavouriteVideosActions = createActionGroup({
  source: 'Videos Favourite',
  events: {
    'Add Favourite': props<{ videoId: string }>(),
    'Remove Favourite': props<{ videoId: string }>(),
  },
});

export const PageNumberActions = createActionGroup({
  source: 'page Number',
  events: {
    'Next Page': props<{ pageToken: string }>(),
    'Prevous Page': props<{ pageToken: string }>(),
  },
});
