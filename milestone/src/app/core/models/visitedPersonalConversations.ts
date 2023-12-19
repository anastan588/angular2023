import { IGroupMessage } from './groupMessages';
import { IPersonMessage } from './personMessages';

export interface IVisitedPesrsonalConversations {
  visitedPersonalConversations: ArchivedPersonalConversation[];
}

export interface ArchivedPersonalConversation {
  conversationID: string;
  messages: IPersonMessage[];
}

export interface IPersonalCoversationNewMessagesRequest {
  conversationID: string;
  message: string;
}

export interface ICurrentPersonalConversation {
  conversationID: string;
  companionID: string;
}
