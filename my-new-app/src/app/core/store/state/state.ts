import { ISearchResponse } from '../models/search-response';
import { IVideoItem } from '../models/video-item';
import { IUser } from '../models/user';
import { IAdmin } from '../models/admin';

export const InitialVideoItems: ReadonlyArray<IVideoItem> = [];
export const InitialVideoItemsId: ReadonlyArray<string> = [];
export const InitialFavouriteVideoItemsId: ReadonlyArray<string>= [];
export const initialnextPageNumber = '';
export const initialprevPageNumber = '';



export const InitialUser: IUser = {
    email: '',
    password: ''
};


