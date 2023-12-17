import { createAction, props } from '@ngrx/store';
import { IUser } from '../../models/user';
import { IGroup, IGroups } from '../../models/groups';
import { IPeoples, IPerson } from '../../models/peoples';
import { IConversation, IConversations } from '../../models/conversations';
import { IGroupMessage, IGroupMessages } from '../../models/groupMessages';

export const loadMilestoneUser = createAction('[MILESTONE] Load User');

export const loadMilestoneUserSuccess = createAction(
  '[MILESTONE] Load User(Success)',
  props<{ user: IUser }>()
);
export const editUserName = createAction(
  '[MILESTONE] Edit user name',
  props<{ nameS: string }>()
);

export const loadMilestoneGroups = createAction('[MILESTONE] Load Groups');

export const loadMilestoneGroupsSuccess = createAction(
  '[MILESTONE] Load Groups (Success)',
  props<{ groups: IGroups }>()
);

export const addNewGroup = createAction(
  '[MILESTONE] Add new Group',
  props<{ IGroupItem: IGroup }>()
);

export const removeUserGroup = createAction(
  '[MILESTONE] Remove user Group',
  props<{ id: string }>(),
);

export const startGroupTimer = createAction('[MILESTONE] Group Timer Start');
export const stopGroupTimer = createAction('[MILESTONE] Group Timer Stop');
export const resetGroupTimer = createAction('[MILESTONE] Group Timer Reset');
export const updateGroupTimer = createAction(
  '[MILESTONE] Group Timer Update',
  props<{ currenttime: number }>()
);



export const loadMilestoneUsers = createAction('[MILESTONE] Load Users');

export const loadMilestoneUsersSuccess = createAction(
  '[MILESTONE] Load Users (Success)',
  props<{ peoples: IPeoples }>()
);


export const startPeoplesTimer = createAction('[MILESTONE] Peoples Timer Start');
export const stopPeoplesTimer = createAction('[MILESTONE] Peoples Timer Stop');
export const resetPeoplesTimer = createAction('[MILESTONE] Peoples Timer Reset');
export const updatePeoplesTimer = createAction(
  '[MILESTONE] Peoples Timer Update',
  props<{ currenttime: number }>()
);


export const loadMilestoneConversations = createAction('[MILESTONE] Load Conversations');

export const loadMilestoneConversationsSuccess = createAction(
  '[MILESTONE] Load Conversations (Success)',
  props<{ conversations: IConversations }>()
);

export const addNewConversation = createAction(
  '[MILESTONE] Add new Conversation',
  props<{ conversation: IConversation }>()
);

export const removeConversation = createAction(
  '[MILESTONE] Remove user Conversation',
  props<{ id: string }>(),
);

export const loadMilestoneCurrentGroupForConversationSuccess = createAction(
  '[MILESTONE] Load Current Group (Success)',
  props<{ currentGroup: IGroup }>()
);

export const startCurrentGroupConversationTimer = createAction('[MILESTONE] Current Group Conversation Timer Start');
export const stopCurrentGroupConversationTimer = createAction('[MILESTONE] Current Group Conversation Timer Stop');
export const resetCurrentGroupConversationTimer = createAction('[MILESTONE] Current Group Conversation Timer Reset');
export const updateCurrentGroupConversationTimer = createAction(
  '[MILESTONE] Current Group Conversation Timer Update',
  props<{ currenttime: number }>()
);

export const loadMilestoneGroupMessages = createAction('[MILESTONE] Load Group Messages');

export const loadMilestoneGroupMessagesSuccess = createAction(
  '[MILESTONE] Load Group Messages (Success)',
  props<{ groupMessages: IGroupMessages }>()
);

export const addNewGroupMessage = createAction(
  '[MILESTONE] Add new Group Message',
  props<{ groupMessage: IGroupMessage }>()
);
