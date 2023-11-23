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



export const VideosReceiveFromApiActions = createActionGroup({
  source: 'Video API',
  events: {
    'Receive Videos List': props<{ videos: ReadonlyArray<IVideoItem> }>(),
  },
});

export const FavouriteVideosActions = createActionGroup({
  source: 'Videos',
  events: {
    'Add Favourite': props<{ videoId: string }>(),
    'Remove Favourite': props<{ videoId: string }>(),
  },
});