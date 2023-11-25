export interface IVideoItem {
  kind: string;
  etag: string;
  id: IID;
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: IVideoWindowSize;
      medium: IVideoWindowSize;
      high: IVideoWindowSize;
      standard: IVideoWindowSize;
      maxres: IVideoWindowSize;
    };
    channelTitle: string;
    tags?: string[];
    categoryId?: string;
    liveBroadcastContent: string;
    localized?: {
      title: string;
      description: string;
    };
    defaultAudioLanguage?: string;
  };
  statistics: {
    viewCount: string;
    likeCount: string;
    dislikeCount: string;
    favoriteCount: string;
    commentCount: string;
  };
}


interface IVideoWindowSize {
  url: string;
  width: number;
  height: number;
}

export interface IID {
  kind: string;
  videoId: string;
}
