import { IVideoItem } from "./video-item"
export interface SearchResponse {
  kind: string,
  etag: string,
  pageInfo: {
    totalResults: number,
    resultsPerPage: number
  },
  nextPageToken?: string,
  regionCode?: string,
  items: IVideoItem[],
}
