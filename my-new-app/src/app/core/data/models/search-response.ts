import { IVideoItem } from "./video-item"
export interface ISearchResponse {
  kind?: string,
  etag: string,
  pageInfo: {
    totalResults: number,
    resultsPerPage: number
  },
  prevPageToken?: string,
  nextPageToken?: string,
  regionCode?: string,
  items: IVideoItem[],
}
