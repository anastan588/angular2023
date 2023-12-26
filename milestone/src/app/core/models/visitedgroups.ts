import { IGroupMessage } from "./groupMessages";

export interface IVisitedGroups {
    visitedGroups: ArchivedGroup[];
}

export interface ArchivedGroup {
  groupID: string;
  messages: IGroupMessage[];
}
