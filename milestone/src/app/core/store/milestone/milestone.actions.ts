import { createAction, props } from '@ngrx/store';
import { IUser } from '../../models/user';
import { IGroup, IGroups } from '../../models/groups';
import { IPeoples, IPerson } from '../../models/peoples';

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
  '[MILESTONE] Load Groups (Success)',
  props<{ peoples: IPeoples }>()
);


export const startPeoplesTimer = createAction('[MILESTONE] Peoples Timer Start');
export const stopPeoplesTimer = createAction('[MILESTONE] Peoples Timer Stop');
export const resetPeoplesTimer = createAction('[MILESTONE] Peoples Timer Reset');
export const updatePeoplesTimer = createAction(
  '[MILESTONE] Peoples Timer Update',
  props<{ currenttime: number }>()
);