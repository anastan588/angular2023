import { IVideoItem } from "./video-item"
export interface SearchResponse {
  kind: string,
  etag: string,
  nextPageToken: string,
  regionCode: string,
  pageInfo: {
    totalResults: number,
    resultsPerPage: number
  },
  items: IVideoItem,
}
