import { createReducer, on } from '@ngrx/store';
import {
  CustomVideosActions,
  FavouriteVideosActions,
  PageNumberActions,
  TubeVideosActions,
} from './youtube.actions';
import { InitialVideosTubeState } from './youtube.state';

export const tubeVideosReducer = createReducer(
  InitialVideosTubeState.tubeVideos,
  on(TubeVideosActions.receiveVideosList, (state, { videos }) => {
    return videos;
  }),
  on(TubeVideosActions.removeVideo, (state, { video }) =>
    state.filter(item => item!.id !== video.id)
  ),
  on(TubeVideosActions.addVideo, (state, { video }) => {
    return [video, ...state];
  })
);

export const customVideosReducer = createReducer(
  InitialVideosTubeState.customVideos,
  on(CustomVideosActions.receiveVideosList, (state, { videos }) => {
    return state.concat(videos);
  }),
  on(CustomVideosActions.addVideo, (state, { video }) => {
    return [video, ...state];
  }),
  on(CustomVideosActions.removeVideo, (state, { video }) =>
    state.filter(item => item!.id.videoId !== video.id.videoId)
  )
);

export const favouriteVideosReducer = createReducer(
  InitialVideosTubeState.favouriteVideoItemsId,
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

export const PageNumberReducer = createReducer(
  InitialVideosTubeState.pageSize,
  on(PageNumberActions.numberItems, (_state, { pageItems }) => pageItems)
);
export const PageNextReducer = createReducer(
  InitialVideosTubeState.nextPageNumber,
  on(PageNumberActions.nextPage, (_state, { pageToken }) => pageToken)
);
export const PagePreviousReducer = createReducer(
  InitialVideosTubeState.prevPageNumber,
  on(PageNumberActions.prevousPage, (_state, { pageToken }) => pageToken)
);
