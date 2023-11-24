import { createSelector, createFeatureSelector } from '@ngrx/store';
import { IVideoItem } from '../store/models/video-item';

export const searchVideos = createFeatureSelector<Array<IVideoItem>>('search');
 
export const searchCollection = createSelector(
  searchVideos,
(search) => {
  return search;
}
);
 
export const favouritetVideos = createFeatureSelector<ReadonlyArray<IVideoItem>>('favourite');
 
export const selectfavouriteCollectionState = createFeatureSelector<
  ReadonlyArray<string>
>('favoiriteCollection');
 
export const selectfavouriteCollection = createSelector(
    favouritetVideos,
    selectfavouriteCollectionState,
  (favourite, favoiriteCollection) => {
    return favoiriteCollection.map((id) => favourite.find((video) => video.id.videoId === id)!);
  }
);