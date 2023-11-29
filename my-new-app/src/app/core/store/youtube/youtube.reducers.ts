import { Action, createReducer, on } from '@ngrx/store';
import {
  LoadCustomVideos,
  addCustomVideo,
  addFavoriteVideo,
  addTubeVideo,
  loadFavoriteVideos,
  loadVideosSuccess,
  removeCustomVideo,
  removeFavoriteVideo,
  removeTubeVideo,
  resetFavoriteVideos,
  setNextPage,
  setNumberItemsOnPage,
  setPreviousPage,
} from './youtube.actions';
import { InitialVideosTubeState } from './youtube.state';
import { IVideoItem } from '../../data/models/video-item';
import { state } from '@angular/animations';

export const youTubeReducer = createReducer(
  InitialVideosTubeState,
    on(loadVideosSuccess, (state, { videos }) => ({
      ...state,
      tubeVideos: videos, //отправляем в стейт видео
    })),
    on(LoadCustomVideos, (state, { videos }) => ({
      ...state,
      customVideos: [...state.tubeVideos, ...videos],
    })),
    on(loadFavoriteVideos, (state, { videoIds }) => ({
      ...state,
      videoIds: [...videoIds],
    })),

    
    on(removeTubeVideo, (state, { video }) => ({
    ...state,
    tubeVideos: state.tubeVideos.filter(item => item.id !== video.id)
  })),
  on(addTubeVideo, (state, { video }) => ({
    ...state,
    tubeVideos: [video, ...state.tubeVideos]
  })),

  on(addCustomVideo, ((state, { video }) => ({
    ...state,
    customVideos: [video, ...state.customVideos]
  }))),
  on(removeCustomVideo, ((state, { video }) => ({
    ...state,
    customVideos: state.customVideos.filter(item => item.id !== video.id)
  }))),


  on(addFavoriteVideo, ((state, { videoId }) => ({
    ...state,
    favouriteVideoItemsId: [videoId, ...state.favouriteVideoItemsId]
  }))),
  on(removeFavoriteVideo, ((state, { videoId }) => ({
    ...state,
    favouriteVideoItemsId: (state.favouriteVideoItemsId.indexOf(videoId) > -1) ? state.favouriteVideoItemsId : state.favouriteVideoItemsId.filter(id => id !== videoId)
  }))),
  on(resetFavoriteVideos, ((state) => ({
    ...state,
    favouriteVideoItemsId: []
  }))),


  on(setNumberItemsOnPage, (state, { pageItems }) => ({
    ...state,
    pageSize: pageItems, //отправляем в стейт видео
  })),
  on(setNextPage, (state, { pageToken }) => ({
    ...state,
    nextPageNumber: pageToken, //отправляем в стейт видео
  })),
  on(setPreviousPage, (state, { pageToken }) => ({
    ...state,
    prevPageNumber: pageToken, //отправляем в стейт видео
  })),

)


