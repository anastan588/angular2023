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
  })),
  on(MilestoneActions.removeUserGroup, (state, { id }) => ({
    ...state,
    groups: {
      Items: state.groups.Items.filter(item => {
        let itemId = item.id.S;
        return itemId !== id;
      }),
      Count: state.groups.Items.length - 1,
    },
  })),
  on(MilestoneActions.startGroupTimer, state => ({
    ...state,
    groupsUpdateTimer: {
      ...state.groupsUpdateTimer,
      isRunning: true,
    },
  })),
  on(MilestoneActions.stopGroupTimer, state => ({
    ...state,
    groupsUpdateTimer: {
      ...state.groupsUpdateTimer,
      isRunning: false,
    },
  })),
  on(MilestoneActions.resetGroupTimer, state => ({
    ...state,
    groupsUpdateTimer: {
      ...state.groupsUpdateTimer,
      currentTime: 0,
    },
  })),
  on(MilestoneActions.updateGroupTimer, (state, { currenttime }) => ({
    ...state,
    groupsUpdateTimer: {
      ...state.groupsUpdateTimer,
      currentTime: currenttime,
    },
  }))
);
