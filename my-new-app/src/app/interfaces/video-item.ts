export interface IVideoItem {
    kind: string,
    etag: string,
    id: {
      kind: string,
      videoId: string
    },
    snippet: {
        publishedAt: string,
        channelId: string,
        title: string,
        description: string,
        thumbnails: {
          default: IVideoWindowSize, 
          medium: IVideoWindowSize, 
          high: IVideoWindowSize, 
        },
        channelTitle: string,
        liveBroadcastContent: string,
        publishTime: string,
      }
}


interface IVideoWindowSize {
    url: string,
    width: number,
    heigh: number,
}


