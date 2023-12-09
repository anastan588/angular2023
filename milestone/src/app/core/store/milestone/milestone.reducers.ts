import { createReducer, on } from '@ngrx/store';
import * as MilestoneActions from './milestone.actions';
import { InitialMileStoneState } from './milestone.state';

export const MilestoneReducer = createReducer(
  InitialMileStoneState,
  on(MilestoneActions.loadMilestoneUserSuccess, (state, { user }) => ({
    ...state,
    tubeVideos: user,
  }))
);
