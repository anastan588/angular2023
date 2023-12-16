import { createReducer, on } from '@ngrx/store';
import * as MilestoneActions from './milestone.actions';
import { InitialMileStoneState } from './milestone.state';

export const MilestoneReducer = createReducer(
  InitialMileStoneState,
  on(MilestoneActions.loadMilestoneUserSuccess, (state, { user }) => ({
    ...state,
    user: { ...state.user, ...user },
  })),
  on(MilestoneActions.editUserName, (state, { nameS }) => ({
    ...state,
    user: { ...state.user, name: { ...state.user.name, S: nameS } },
  })),
  on(MilestoneActions.loadMilestoneGroupsSuccess, (state, { groups }) => ({
    ...state,
    groups: { ...state.groups, ...groups },
  })),
  on(MilestoneActions.addNewGroup, (state, { IGroupItem }) => ({
    ...state,
    groups: {
      ...state.groups,
      Items: [...state.groups.Items, IGroupItem],
      Count: state.groups.Items.length + 1,
    },
  }))
);
