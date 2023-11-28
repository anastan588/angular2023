import { createSelector, createFeatureSelector } from '@ngrx/store';
import { IVideoItem } from '../../data/models/video-item';

export const searchVideos = createFeatureSelector<Array<IVideoItem>>('videos');

export const searchCollection = createSelector(searchVideos, videos => {
  return videos;
});

export const customVideos = createFeatureSelector<Array<IVideoItem>>('custom');

export const customCollection = createSelector(customVideos, videos => {
  return videos;
});

export const selectDetailledVideoState =
  createFeatureSelector<IVideoItem>('detailedVideo');

export const selectCurrentVideo = createSelector(
  searchVideos,
  selectDetailledVideoState,
  (videos, detailedVideo) => {
    console.log(videos);
    console.log(detailedVideo);
    const det = videos.filter(video => {
      const videoSelect = String(video.id);
      console.log(detailedVideo);
      const detailedSelect = String(detailedVideo.id);
      console.log(videoSelect);
      console.log(detailedSelect);
      return videoSelect === detailedSelect;
    });
    console.log(det);
    return det[0];
  }
);

export const selectfavouriteCollectionState = createFeatureSelector<
  Array<string>
>('favoiriteCollection');

export const receiveFavouriteVideo = createSelector(selectfavouriteCollectionState, videosIds=> {
  return videosIds;
});

export const selectfavouriteCollection = createSelector(
  searchVideos,
  selectfavouriteCollectionState,
  (videos, favoiriteCollection) => {
    const fav = favoiriteCollection.map(
      id =>
        videos.find(video => {
          const videoSelect = video.id;
          console.log(videoSelect);
          return videoSelect.toString() === id;
        })!
    );
    console.log(fav);
    return fav;
  }
);

export const PageNumberNext = createFeatureSelector<String>('pageNext');
export const PageNumberPrevious = createFeatureSelector<String>('pagePrevious');
export const PageNumberNextCollection = createSelector(PageNumberNext, page => {
  return page;
});
export const PageNumberPrevoiusCollection = createSelector(
  PageNumberPrevious,
  page => {
    return page;
  }
);
export const itemsForPage = createFeatureSelector<number>('pageItems');
export const pageItemsNumber = createSelector(itemsForPage, number => {
  return number;
});
