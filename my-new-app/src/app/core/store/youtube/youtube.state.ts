import { IVideoItem } from '../../data/models/video-item';

export interface IVideosTubeState {
  tubeVideos: Array<IVideoItem>;
  customVideos: Array<IVideoItem>;
  favouriteVideoItemsId: Array<string>;
  nextPageNumber: string;
  prevPageNumber: string;
  pageSize: number;
}

export const InitialVideosTubeState: IVideosTubeState = {
  tubeVideos: [],
  customVideos: [],
  favouriteVideoItemsId: [],
  nextPageNumber: '',
  prevPageNumber: '',
  pageSize: 20,
};
