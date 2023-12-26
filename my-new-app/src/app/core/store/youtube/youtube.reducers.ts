import { createReducer, on } from '@ngrx/store';
import * as YoutubeActions from './youtube.actions';
import { InitialVideosTubeState } from './youtube.state';

export const youTubeReducer = createReducer(
  InitialVideosTubeState,
  on(YoutubeActions.loadVideosSuccess, (state, { videos }) => ({
    ...state,
    tubeVideos: videos,
  })),
  on(YoutubeActions.LoadCustomVideos, (state, { videos }) => ({
    ...state,
    customVideos: [...state.tubeVideos, ...videos],
  })),
  on(YoutubeActions.loadFavoriteVideos, (state, { videoIds }) => ({
    ...state,
    favouriteVideoItemsId: [...videoIds],
  })),

  on(YoutubeActions.removeTubeVideo, (state, { video }) => ({
    ...state,
    tubeVideos: state.tubeVideos.filter(item => item.id !== video.id),
  })),
  on(YoutubeActions.addTubeVideo, (state, { video }) => ({
    ...state,
    tubeVideos: [video, ...state.tubeVideos],
  })),

  on(YoutubeActions.addCustomVideo, (state, { video }) => ({
    ...state,
    customVideos: [video, ...state.customVideos],
  })),
  on(YoutubeActions.removeCustomVideo, (state, { video }) => ({
    ...state,
    customVideos: state.customVideos.filter(item => {
      let itemId = JSON.parse(JSON.stringify(item.id));
      let videoId = JSON.parse(JSON.stringify(video.id));
      if (item.id.videoId !== undefined) {
        itemId = item.id.videoId;
        videoId = video.id.videoId;
      }
      return itemId !== videoId;
    }),
  })),

  on(YoutubeActions.addFavoriteVideo, (state, { videoId }) => ({
    ...state,
    favouriteVideoItemsId: [videoId, ...state.favouriteVideoItemsId],
  })),
  on(YoutubeActions.removeFavoriteVideo, (state, { videoId }) => ({
    ...state,
    favouriteVideoItemsId:
      state.favouriteVideoItemsId.indexOf(videoId) === -1
        ? state.favouriteVideoItemsId
        : state.favouriteVideoItemsId.filter(id => id !== videoId),
  })),
  on(YoutubeActions.resetFavoriteVideos, state => ({
    ...state,
    favouriteVideoItemsId: [],
  })),

  on(YoutubeActions.setNextPage, (state, { pageToken }) => ({
    ...state,
    nextPageNumber: pageToken,
  })),
  on(YoutubeActions.setPreviousPage, (state, { pageToken }) => ({
    ...state,
    prevPageNumber: pageToken,
  }))
);
