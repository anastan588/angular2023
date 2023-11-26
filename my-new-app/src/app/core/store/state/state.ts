import { ISearchResponse } from '../models/search-response';
import { IVideoItem } from '../models/video-item';
import { IUser } from '../models/user';
import { IAdmin } from '../models/admin';

export const InitialVideoItems: Array<IVideoItem | IAdmin> = [];
// export const InitialVideoItemsId: ReadonlyArray<string> = [];
export const InitialFavouriteVideoItemsId: Array<string> = [];
export const initialnextPageNumber = '';
export const initialprevPageNumber = '';

export const InitialUser: IUser = {
  email: '',
  password: '',
};
