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
    return state.peoplesUpdateTimer.currentTime;
  }
);

export const selectConversations = createSelector(MilestoneSelector, state => {
  return state.conversations.Items;
});

export const selectCurrentGroupForConversation = createSelector(
  MilestoneSelector,
  state => {
    return state.currentGroup;
  }
);

export const selectGroupConversationMessagesUpdateTime = createSelector(
  MilestoneSelector,
  state => {
    return state.groupUpdateMessagesTimer.currentTime;
  }
);

export const selectGroupMessages = createSelector(MilestoneSelector, state => {
  return state.groupMessages.Items;
});

export const selectArchiveMessages = createSelector(MilestoneSelector, state => {
  return state.visitedGroupMessagesArchive.visitedGroups;
});

export const selectCurrentPersonalConversationForConversation = createSelector(
  MilestoneSelector,
  state => {
    return state.currentPersonalConversation;
  }
);

export const selectPersonalConversationMessagesUpdateTime = createSelector(
  MilestoneSelector,
  state => {
    return state.personalConversationUpdateMessagesTimer.currentTime;
  }
);

export const selectPersonalConversationsMessages = createSelector(MilestoneSelector, state => {
  return state.personalConversationMessages.Items;
});

export const selectArchiveDPersonalConversationMessages = createSelector(MilestoneSelector, state => {
  return state.visitedPersonalConversationsMessagesArchive.visitedPersonalConversations;
});
