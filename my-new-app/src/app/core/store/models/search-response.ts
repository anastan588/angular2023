import { IVideoItem } from "./video-item"
export interface ISearchResponse {
  kind?: string,
  etag: string,
  pageInfo: {
    totalResults: number,
    resultsPerPage: number
  },
  nextPageToken?: string,
  regionCode?: string,
  items: IVideoItem[],
}
