import { createReducer, on } from '@ngrx/store';
import { setLoginToken } from '../actions/actions';
import { InitialUser } from '../state/state';

export const loginReducer = createReducer(
  InitialUser,
  on(setLoginToken, user => {
    console.log(user);
    return user;
  })
);
