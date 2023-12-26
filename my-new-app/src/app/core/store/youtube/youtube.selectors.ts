import { createSelector, createFeatureSelector, State } from '@ngrx/store';
import { IVideoItem } from '../../data/models/video-item';
import { IVideosTubeState } from './youtube.state';

export const youTubeSelector = createFeatureSelector<IVideosTubeState>('YOUTUBE');

export const selectSearchVideos = createSelector(youTubeSelector, state => {
  return state.tubeVideos;
})

export const selectCustomVideos = createSelector(youTubeSelector, state => {
  return state.customVideos;
});

export const selectFavouriteVideos = createSelector(youTubeSelector, state => {
  return state.favouriteVideoItemsId;
});

export const selectfavouriteCollectionVideos = createSelector(
  youTubeSelector,
  (state) => {
    const fav = state.favouriteVideoItemsId.map(
      id =>
        state.tubeVideos.find(video => {
          const videoSelect = video.id;
          return videoSelect.toString() === id;
        })!
    );
    return fav;
  }
);

export const selectPageNumberNext = createSelector(youTubeSelector, state => {
  return state.nextPageNumber;
});
export const selectPageNumberPrevious = createSelector(youTubeSelector, state => {
  return state.prevPageNumber;
});


