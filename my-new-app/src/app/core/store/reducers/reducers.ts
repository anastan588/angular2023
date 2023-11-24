import { createReducer, on } from '@ngrx/store';
import { FavouriteVideosActions, VideosReceiveFromApiActions, setLoginToken} from '../actions/actions';
import { InitialFavouriteVideoItemsId, InitialUser, InitialVideoItems } from '../state/state';
import { IVideoItem } from '../models/video-item';

export const loginReducer = createReducer(
  InitialUser,
  on(setLoginToken, user => {
    return user;
  })
);

// export const videosReducer = createReducer(
//   InitialVideoItems,
//   on(setResultVideoItems, videos => {
//     return videos;
//   })
// );


export const videosCollectionReducer = createReducer(
  InitialVideoItems,
  on(VideosReceiveFromApiActions.receiveVideosList, (_state, { videos }) => videos);
   on(VideosReceiveFromApiActions.removeVideo, (state, { videoId }) =>
    state.filter((id) => id !== videoId)
  ),
);

export const VideosCollectionReducer = createReducer(
  InitialVideoItems,
 
  on(FavouriteVideosActions.addFavourite, (state, { videoId }) => {
    if (state.indexOf(videoId) > -1) return state;
    return [...state, videoId];
  }));


export const favouriteVideosReducer = createReducer(
  InitialFavouriteVideoItemsId,
  on(FavouriteVideosActions.removeFavourite, (state, { videoId }) =>
    state.filter((id) => id !== videoId)
  ),
  on(FavouriteVideosActions.addFavourite, (state, { videoId }) => {
    if (state.indexOf(videoId) > -1) return state;
    return [...state, videoId];
  }));