import { createReducer, on } from '@ngrx/store';
import {
  FavouriteReceiveVideosActions,
  FavouriteVideosActions,
  VideosReceiveFromApiActions,
  VideosSearchActions,
  setLoginToken,
} from '../actions/actions';
import {
  InitialFavouriteVideoItemsId,
  InitialFavouriteVideos,
  InitialUser,
  InitialVideoItems,
  InitialVideoItemsId,
} from '../state/state';
import { IVideoItem } from '../models/video-item';

export const loginReducer = createReducer(
  InitialUser,
  on(setLoginToken, user => {
    return user;
  })
);

// / export const videosReducer = createReducer(
// //   InitialVideoItems,
// //   on(setResultVideoItems, videos => {
// //     return videos;
// //   })
// // );/

export const videosFromApiCollectionReducer = createReducer(
  InitialVideoItems,
  on(
    VideosReceiveFromApiActions.receiveVideosList,
    (_state, { videos }) => videos
  )
);

export const videosFromApiActionsReducer = createReducer(
  InitialVideoItemsId,
  on(VideosSearchActions.removeVideo, (state, { videoId }) =>
    state.filter(id => id !== videoId)
  ),
  on(VideosSearchActions.addVideo, (state, { videoId }) => {
    if (state.indexOf(videoId) > -1) return state;
    return [...state, videoId];
  })
);

// export const favouriteVideosArrayAReducer = createReducer(
//   InitialFavouriteVideos,
//   on(
//     FavouriteReceiveVideosActions.receiveFavorite,
//     (_state, { videos }) => videos
//   )
// );

export const favouriteVideosReducer = createReducer(
  InitialFavouriteVideoItemsId,
  on(FavouriteVideosActions.removeFavourite, (state, { videoId }) =>
    state.filter(id => id !== videoId)
  ),
  on(FavouriteVideosActions.addFavourite, (state, { videoId }) => {
    console.log(videoId);
    if (state.indexOf(videoId) > -1) return state;
    return [...state, videoId];
  })
);
