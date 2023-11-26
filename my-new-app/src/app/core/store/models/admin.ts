export interface IAdmin {
  id: string;
  snippet: {
    publishedAt: string;
    title: string;
    description?: string;
    thumbnails: {
      high: {
        url: string;
      };
      standard: {
        url: string;
      };
    };
    tags: (string | null)[];
  };
}
