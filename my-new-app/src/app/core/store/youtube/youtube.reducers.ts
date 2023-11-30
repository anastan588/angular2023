import { Action, createReducer, on } from '@ngrx/store';
import * as YoutubeActions from './youtube.actions';
import { InitialVideosTubeState } from './youtube.state';
import { IVideoItem } from '../../data/models/video-item';
import { state } from '@angular/animations';

export const youTubeReducer = createReducer(
  InitialVideosTubeState,
  on(YoutubeActions.loadVideosSuccess, (state, { videos }) => ({
    ...state,
    tubeVideos: videos, //отправляем в стейт видео
  })),
  on(YoutubeActions.LoadCustomVideos, (state, { videos }) => ({
    ...state,
    customVideos: [...state.tubeVideos, ...videos],
  })),
  on(YoutubeActions.loadFavoriteVideos, (state, { videoIds }) => ({
    ...state,
    videoIds: [...videoIds],
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
      let itemId =  JSON.parse(JSON.stringify(item.id));
      let videoId = JSON.parse(JSON.stringify(video.id));
      if (item.id.videoId !== undefined) {
        itemId = item.id.videoId;
        videoId = video.id.videoId;
      }
      console.log(item.id);
      console.log(video.id);
      console.log(item.id !== video.id);
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

  on(YoutubeActions.setNumberItemsOnPage, (state, { pageItems }) => ({
    ...state,
    pageSize: pageItems, //отправляем в стейт видео
  })),
  on(YoutubeActions.setNextPage, (state, { pageToken }) => ({
    ...state,
    nextPageNumber: pageToken, //отправляем в стейт видео
  })),
  on(YoutubeActions.setPreviousPage, (state, { pageToken }) => ({
    ...state,
    prevPageNumber: pageToken, //отправляем в стейт видео
  }))
);
