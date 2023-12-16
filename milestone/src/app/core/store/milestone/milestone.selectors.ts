import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IMilestoneState } from './milestone.state';

export const MilestoneSelector =
  createFeatureSelector<IMilestoneState>('MILESTONE');

export const selectUser = createSelector(MilestoneSelector, state => {
  return state.user;
});

export const selectUserName = createSelector(MilestoneSelector, state => {
  return state.user.name.S;
});
export const selectUserUid = createSelector(MilestoneSelector, state => {
  return state.user.uid.S;
});

export const selectGroups = createSelector(MilestoneSelector, state => {
  return state.groups.Items;
});
export const selectGruopsUpdateTime = createSelector(
  MilestoneSelector,
  state => {
    return state.groupsUpdateTimer.currentTime;
  }
);

export const selectPeoples = createSelector(MilestoneSelector, state => {
  return state.peoples.Items;
});
export const selectPeoplesUpdateTime = createSelector(
  MilestoneSelector,
  state => {
    return state.groupsUpdateTimer.currentTime;
  }
);
