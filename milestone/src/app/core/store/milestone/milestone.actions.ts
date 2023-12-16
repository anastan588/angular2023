import { createAction, props } from '@ngrx/store';
import { IUser } from '../../models/user';
import { IGroup, IGroups } from '../../models/groups';

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
  '[MILESTONE] Load Groups(Success)',
  props<{ groups: IGroups }>()
);

export const addNewGroup = createAction(
  '[MILESTONE] Add new Group',
  props<{ IGroupItem: IGroup }>()
);
