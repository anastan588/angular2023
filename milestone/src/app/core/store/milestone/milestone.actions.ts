import { createAction, props } from '@ngrx/store';
import { IUser } from '../../models/user';

export const loadMilestoneUser = createAction('[MILESTONE] Load User');

export const loadMilestoneUserSuccess = createAction(
  '[MILESTONE] Load Videos (Success)',
  props<{ user: IUser }>()
);
export const editUserName = createAction(
    '[MILESTONE] Edit user name',
    props<{ name: string }>(),
  );