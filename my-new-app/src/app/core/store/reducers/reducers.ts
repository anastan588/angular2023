import { createReducer, on } from '@ngrx/store';
import {
  FavouriteReceiveVideosActions,
  FavouriteVideosActions,
  PageNumberActions,
  VideosReceiveFromApiActions,
  VideosSearchActions,
  setLoginToken,
} from '../actions/actions';
import {
  InitialFavouriteVideoItemsId,
  InitialUser,
  InitialVideoItems,
  InitialVideoItemsId,
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
  }),
  on(FavouriteVideosActions.resetFavourite, (state) => {
    return [];
  })
);

export const PageNextReducer = createReducer(
  initialnextPageNumber,
  on(PageNumberActions.nextPage, (_state, { pageToken }) => pageToken),
);
export const PagePreviousReducer = createReducer(
  initialprevPageNumber,
  on(PageNumberActions.prevousPage, (_state, { pageToken }) => pageToken),
);
