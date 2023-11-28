import { Action, createReducer, on } from '@ngrx/store';
import {
  LoadCustomVideos,
  PageNumberActions,
  addCustomVideo,
  addFavoriteVideo,
  addVideo,
  loadFavoriteVideos,
  loadVideosSuccess,
  removeCustomVideo,
  removeFavoriteVideo,
  removeVideo,
  resetFavoriteVideos,
} from './youtube.actions';
import { InitialVideosTubeState } from './youtube.state';
import { IVideoItem } from '../../data/models/video-item';

export const tubeVideosReducer = createReducer<IVideoItem[]>(
  InitialVideosTubeState.tubeVideos,
  on(loadVideosSuccess, (_state, { videos }) => {
    return videos;
  }),
  on(removeVideo, (state, { video }) =>
    state.filter(item => item!.id !== video.id)
  ),
  on(addVideo, (state, { video }) => {
    return [video, ...state];
  })

  );
  

export const customVideosReducer = createReducer(
  InitialVideosTubeState.customVideos,
  on(LoadCustomVideos, (state, { videos }) => {
    return state.concat(videos);
  }),
  on(addCustomVideo, (state, { video }) => {
    return [video, ...state];
  }),
  on(removeCustomVideo, (state, { video }) =>
    state.filter(item => item!.id.videoId !== video.id.videoId)
  )
);

export const favouriteVideosReducer = createReducer(
  InitialVideosTubeState.favouriteVideoItemsId,
  on(loadFavoriteVideos, (_state, { videoIds }) => {
    return videoIds;
  }),
  on(removeFavoriteVideo, (state, { videoId }) =>
    state.filter(id => id !== videoId)
  ),
  on(addFavoriteVideo, (state, { videoId }) => {
    console.log(videoId);
    if (state.indexOf(videoId) > -1) return state;
    return [...state, videoId];
  }),
  on(resetFavoriteVideos, _state => {
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
