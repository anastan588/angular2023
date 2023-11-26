import { createSelector, createFeatureSelector } from '@ngrx/store';
import { IVideoItem} from '../models/video-item';

export const searchVideos = createFeatureSelector<Array<IVideoItem>>('videos');

export const searchCollection = createSelector(searchVideos, videos => {
  return videos;
});


export const selectfavouriteCollectionState = createFeatureSelector<
  ReadonlyArray<string>
>('favoiriteCollection');

export const selectfavouriteCollection = createSelector(
  searchVideos,
  selectfavouriteCollectionState,
  (videos, favoiriteCollection) => {
    console.log(videos);
    console.log(favoiriteCollection);
    const fav = favoiriteCollection.map(
      id =>
        videos.find(video => {
          const videoSelect = video.id;
          console.log(videoSelect);
          console.log(videoSelect);
          return videoSelect.toString() === id;
        })!
    );
    console.log(fav);
    return fav;
  }
);


export const PageNumber =
createFeatureSelector<Number>('page');

export const PageNumberCollection =
createSelector(PageNumber, page => {
  return page;
});