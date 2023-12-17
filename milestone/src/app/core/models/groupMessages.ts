export interface IGroupMessages {
    Count: number;
    Items: Array<IGroupMessage>;
  }
  
  export interface IGroupMessage {
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
  

  export interface IGroupMessagesRequest {
    groupID: string;
    sinc?: number;
  }