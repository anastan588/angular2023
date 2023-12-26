export interface IConversations {
  Count: number;
  Items: Array<IConversation>;
}

export interface IConversation {
  id: {
    S: string;
  };
  companionID: {
    S: string;
  };
}

export interface ICompanion {
  companion: string;
}

export interface ICreatePersonalConversationResponse {
  conversationID: string;
}
