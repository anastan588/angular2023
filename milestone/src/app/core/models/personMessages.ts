export interface IPersonMessages {
    Count: number;
    Items: Array<IPersonMessage>;
  }
  
  export interface IPersonMessage {
    authorID: {
      S: string;
    };
    message: {
      S: string;
    };
    createdAt: {
      S: string;
    };
  }
  

  export interface IPersonMessagesRequest {
    conversationID: string;
    since?: number;
  }

  export interface IPersonNewMessagesRequest {
    conversationID: string;
    message: string;
  }