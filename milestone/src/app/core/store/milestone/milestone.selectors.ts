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

export const selectGroups = createSelector(MilestoneSelector, state => {
  return state.groups.Items;
});
