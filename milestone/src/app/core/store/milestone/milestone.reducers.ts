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
  })),
  on(MilestoneActions.loadMilestoneUsersSuccess, (state, { peoples }) => ({
    ...state,
    peoples: { ...state.peoples, ...peoples },
  })),
  on(MilestoneActions.startPeoplesTimer, state => ({
    ...state,
    peoplesUpdateTimer: {
      ...state.peoplesUpdateTimer,
      isRunning: true,
    },
  })),
  on(MilestoneActions.stopPeoplesTimer, state => ({
    ...state,
    peoplesUpdateTimer: {
      ...state.peoplesUpdateTimer,
      isRunning: false,
    },
  })),
  on(MilestoneActions.resetPeoplesTimer, state => ({
    ...state,
    peoplesUpdateTimer: {
      ...state.peoplesUpdateTimer,
      currentTime: 0,
    },
  })),
  on(MilestoneActions.updatePeoplesTimer, (state, { currenttime }) => ({
    ...state,
    peoplesUpdateTimer: {
      ...state.peoplesUpdateTimer,
      currentTime: currenttime,
    },
  })),
  on(
    MilestoneActions.loadMilestoneConversationsSuccess,
    (state, { conversations }) => ({
      ...state,
      conversations: { ...state.conversations, ...conversations },
    })
  ),
  on(MilestoneActions.addNewConversation, (state, { conversation }) => ({
    ...state,
    conversations: {
      ...state.conversations,
      Items: [...state.conversations.Items, conversation],
      Count: state.conversations.Items.length + 1,
    },
  })),
  on(MilestoneActions.removeConversation, (state, { id }) => ({
    ...state,
    conversations: {
      Items: state.conversations.Items.filter(item => {
        let itemId = item.id.S;
        return itemId !== id;
      }),
      Count: state.conversations.Items.length - 1,
    },
  })),
  on(
    MilestoneActions.loadMilestoneCurrentGroupForConversationSuccess,
    (state, { currentGroup }) => ({
      ...state,
      currentGroup: { ...state.currentGroup, ...currentGroup },
    })
  ),

  on(MilestoneActions.startCurrentGroupConversationTimer, state => ({
    ...state,
    groupUpdateMessagesTimer: {
      ...state.groupUpdateMessagesTimer,
      isRunning: true,
    },
  })),
  on(MilestoneActions.stopCurrentGroupConversationTimer, state => ({
    ...state,
    groupUpdateMessagesTimer: {
      ...state.groupUpdateMessagesTimer,
      isRunning: false,
    },
  })),
  on(MilestoneActions.resetCurrentGroupConversationTimer, state => ({
    ...state,
    groupUpdateMessagesTimer: {
      ...state.groupUpdateMessagesTimer,
      currentTime: 0,
    },
  })),
  on(
    MilestoneActions.updateCurrentGroupConversationTimer,
    (state, { currenttime }) => ({
      ...state,
      groupUpdateMessagesTimer: {
        ...state.groupUpdateMessagesTimer,
        currentTime: currenttime,
      },
    })
  ),
  on(
    MilestoneActions.loadMilestoneGroupMessagesSuccess,
    (state, { groupMessages }) => ({
      ...state,
      groupMessages: { ...state.groupMessages, ...groupMessages },
    })
  ),
  on(MilestoneActions.addNewGroupMessage, (state, { groupMessage }) => ({
    ...state,
    groupMessages: {
      ...state.groupMessages,
      Items: [...state.groupMessages.Items, ...groupMessage],
      Count: state.groupMessages.Items.length + 1,
    },
  })),
  on(MilestoneActions.resetGroupMessages, state => ({
    ...state,
    groupMessages: {
      ...state.groupMessages,
      Items: [],
      Count: 0,
    },
  })),
  on(MilestoneActions.addVisitedGroupToArchive, (state, { visitedGroup }) => ({
    ...state,
    visitedGroupMessagesArchive: {
      visitedGroups: [
        ...state.visitedGroupMessagesArchive.visitedGroups,
        visitedGroup,
      ],
    },
  })),
  on(
    MilestoneActions.changeMessagesInArchivesGroup,
    (state, { visitedGroup }) => ({
      ...state,
      visitedGroupMessagesArchive: {
        visitedGroups: state.visitedGroupMessagesArchive.visitedGroups.map(
          group => {
            console.log(group.groupID);
            console.log(visitedGroup.groupID);
            if (group.groupID === visitedGroup.groupID) {
              return visitedGroup;
            }
            return group;
          }
        ),
      },
    })
  ),

  on(
    MilestoneActions.loadMilestoneCurrentPersonalConversationSuccess,
    (state, { currentPersonalConversation }) => ({
      ...state,
      currentPersonalConversation: {
        ...state.currentPersonalConversation,
        ...currentPersonalConversation,
      },
    })
  ),

  on(MilestoneActions.startCurrentPersonalConversationTimer, state => ({
    ...state,
    personalConversationUpdateMessagesTimer: {
      ...state.personalConversationUpdateMessagesTimer,
      isRunning: true,
    },
  })),
  on(MilestoneActions.stopCurrentPersonalConversationTimer, state => ({
    ...state,
    personalConversationUpdateMessagesTimer: {
      ...state.personalConversationUpdateMessagesTimer,
      isRunning: false,
    },
  })),
  on(MilestoneActions.resetCurrentPersonalConversationTimer, state => ({
    ...state,
    personalConversationUpdateMessagesTimer: {
      ...state.personalConversationUpdateMessagesTimer,
      currentTime: 0,
    },
  })),
  on(
    MilestoneActions.updateCurrentPersonalConversationTimer,
    (state, { currenttime }) => ({
      ...state,
      personalConversationUpdateMessagesTimer: {
        ...state.personalConversationUpdateMessagesTimer,
        currentTime: currenttime,
      },
    })
  ),

  on(
    MilestoneActions.loadMilestonePersonalConversationMessagesSuccess,
    (state, { personalMessages }) => ({
      ...state,
      personalConversationMessages: {
        ...state.personalConversationMessages,
        ...personalMessages,
      },
    })
  ),
  on(
    MilestoneActions.addNewPersonalConversationMessage,
    (state, { personalMessage }) => ({
      ...state,
      personalConversationMessages: {
        ...state.personalConversationMessages,
        Items: [
          ...state.personalConversationMessages.Items,
          ...personalMessage,
        ],
        Count: state.personalConversationMessages.Items.length + 1,
      },
    })
  ),
  on(MilestoneActions.resetPersonalConversationMessages, state => ({
    ...state,
    personalConversationMessages: {
      ...state.personalConversationMessages,
      Items: [],
      Count: 0,
    },
  })),
  on(
    MilestoneActions.addVisitedPersonalConversationToArchive,
    (state, { visitedPersonalConversation }) => ({
      ...state,
      visitedPersonalConversationsMessagesArchive: {
        visitedPersonalConversations: [
          ...state.visitedPersonalConversationsMessagesArchive
            .visitedPersonalConversations,
          visitedPersonalConversation,
        ],
      },
    })
  ),
  on(
    MilestoneActions.changeMessagesInArchivesPersonalConversation,
    (state, { visitedPerSonConversation }) => ({
      ...state,
      visitedPersonalConversationsMessagesArchive: {
        visitedPersonalConversations: state.visitedPersonalConversationsMessagesArchive.visitedPersonalConversations.map(
          conversation => {
            if (conversation.conversationID === visitedPerSonConversation.conversationID) {
              return visitedPerSonConversation;
            }
            return conversation;
          }
        ),
      },
    })
  )
);
