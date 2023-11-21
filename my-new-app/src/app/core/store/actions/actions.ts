import { createAction, props } from '@ngrx/store';
import { IUser } from '../models/user';

export const setLoginToken = createAction(
  '[LoginPage Component] setLoginToken',
  props<{ user: IUser }>()
);
