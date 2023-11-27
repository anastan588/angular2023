import {
  createAction,
  createActionGroup,
  emptyProps,
  props,
} from '@ngrx/store';
import { IVideoItem } from '../../data/models/video-item';


export const LOAD_VIDEOS = '[Main Page] Videos Loads';
export const LOAD_VIDEOS_SUCCESS = '[Main Page] Videos Loaded Success';

export const loadvideos = createAction(LOAD_VIDEOS);
export const loadvideossuccess = createAction(
  LOAD_VIDEOS_SUCCESS,
  props<{ videos: IVideoItem[] }>
);

export const TubeVideosActions = createActionGroup({
  source: 'Videos Tube',
  events: {
    'Receive Videos List': props<{ videos: Array<IVideoItem> }>(),
    'Remove Video': props<{ video: IVideoItem }>(),
    'Add Video': props<{ video: IVideoItem }>(),
  },
});

export const CustomVideosActions = createActionGroup({
  source: 'Videos Custom',
  events: {
    'Receive Videos List': props<{ videos: Array<IVideoItem> }>(),
    'Remove Video': props<{ video: IVideoItem }>(),
    'Add Video': props<{ video: IVideoItem }>(),
  },
});

// export const FavouriteReceiveVideosActions = createActionGroup({
//   source: 'Favourite Receive',
//   events: {
//     'Receive Favorite': props<{ videos: ReadonlyArray<IVideoItem> }>(),
//   },
// });

export const FavouriteVideosActions = createActionGroup({
  source: 'Videos Favourite',
  events: {
    'Add Favourite': props<{ videoId: string }>(),
    'Remove Favourite': props<{ videoId: string }>(),
    'Reset Favourite': emptyProps(),
  },
});

export const PageNumberActions = createActionGroup({
  source: 'page Number',
  events: {
    'Next Page': props<{ pageToken: string }>(),
    'Prevous Page': props<{ pageToken: string }>(),
    'Number Items':  props<{ pageItems: number }>(),
  },
});
