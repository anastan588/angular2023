import { createSelector, createFeatureSelector } from '@ngrx/store';
import { IVideoItem } from '../store/models/video-item';

 
export const favouritetVideos = createFeatureSelector<ReadonlyArray<IVideoItem>>('favourite');
 
export const selectfavouriteCollectionState = createFeatureSelector<
  ReadonlyArray<string>
>('favoiriteCollection');
 
export const electfavouriteCollection = createSelector(
    favouritetVideos,
    selectfavouriteCollectionState,
  (favourite, favoiriteCollection) => {
    return favoiriteCollection.map((id) => favourite.find((video) => video.id.videoId === id)!);
  }
);