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

// export const selectDetailledVideoState =
//   createFeatureSelector<IVideoItem>('detailedVideo');

// export const selectCurrentVideo = createSelector(
//   youTubeSelector,
//   (state) => {
//     // console.log(videos);
//     // console.log(detailedVideo);
//     const det = state.customVideos.filter(video => {
//       const videoSelect = String(video.id);
//       // console.log(detailedVideo);
//       const detailedSelect = String(detailedVideo.id);
//       // console.log(videoSelect);
//       // console.log(detailedSelect);
//       return videoSelect === detailedSelect;
//     });
//     console.log(det);
//     return det[0];
//   }
// );

// export const selectfavouriteCollectionState = createFeatureSelector<
//   Array<string>
// >('favoiriteCollection');

// export const receiveFavouriteVideo = createSelector(selectfavouriteCollectionState, videosIds=> {
//   return videosIds;
// });

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


