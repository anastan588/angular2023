import { createReducer, on } from '@ngrx/store';
import {
  FavouriteVideosActions,
  PageNumberActions,
  VideosReceiveFromApiActions,
  setLoginToken,
} from '../actions/actions';
import {
  InitialFavouriteVideoItemsId,
  InitialUser,
  InitialVideoItems,
  initialnextPageNumber,
  initialprevPageNumber,
} from '../state/state';

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
  on(VideosReceiveFromApiActions.receiveVideosList, (state, { videos }) => {
    if (state.length < 20) {
      return state.concat(videos.slice(0, 20 - state.length));
    }
    const newState = state.slice(0, state.length - videos.length);
    return newState.concat(videos);
  }),
  on(VideosReceiveFromApiActions.removeVideo, (state, { video }) =>
    state.filter(item => item!.id !== video.id)
  ),
  on(VideosReceiveFromApiActions.addVideo, (state, { video }) => {
    return [video, ...state];
  })
);

// export const videosFromApiActionsReducer = createReducer(
//   InitialVideoItems,

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
  }),
  on(FavouriteVideosActions.resetFavourite, state => {
    return [];
  })
);

export const PageNextReducer = createReducer(
  initialnextPageNumber,
  on(PageNumberActions.nextPage, (_state, { pageToken }) => pageToken)
);
export const PagePreviousReducer = createReducer(
  initialprevPageNumber,
  on(PageNumberActions.prevousPage, (_state, { pageToken }) => pageToken)
);
