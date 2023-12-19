import { IGroupMessage } from "./groupMessages";
import { IPersonMessage } from "./personMessages";

export interface IVisitedPesrsonalConversations {
    visitedPersonalConversations: ArchivedPersonalConversation[];
}

export interface ArchivedPersonalConversation {
  conversationID: string;
  messages: IPersonMessage[];
}
