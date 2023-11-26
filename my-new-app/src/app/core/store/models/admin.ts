export interface IAdmin {
  id: string;
  snippet: {
    publishedAt: string;
    title: string;
    description?: string;
    thumbnails: {
      high: string;
    };
    tags: (string | null)[];
  };
}
