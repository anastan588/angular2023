import { IGroupMessage } from "./groupMessages";
import { IPersonMessage } from "./personMessages";

export interface IVisitedPesrsonalConversations {
    visitedGroups: ArchivedPersonalConversation[];
}

export interface ArchivedPersonalConversation {
  groupID: string;
  messages: IPersonMessage[];
}
