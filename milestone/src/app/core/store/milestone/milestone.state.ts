import { IGroups } from '../../models/groups';
import { IPeoples } from '../../models/peoples';
import { IUser } from '../../models/user';

export interface IMilestoneState {
  user: IUser;
  groups: IGroups;
  groupsUpdateTimer: {
    currentTime: number;
    isRunning: boolean;
  };
  peoples: IPeoples;
  peoplesUpdateTimer: {
    currentTime: number;
    isRunning: boolean;
  };
}

export const InitialMileStoneState: IMilestoneState = {
  user: {
    email: {
      S: '',
    },
    name: {
      S: '',
    },
    uid: {
      S: '',
    },
    createdAt: {
      S: '',
    },
  },
  groups: {
    Count: 0,
    Items: [],
  },
  groupsUpdateTimer: {
    currentTime: 60,
    isRunning: false,
  },
  peoples: {
    Count: 0,
    Items: [],
  },
  peoplesUpdateTimer: {
    currentTime: 60,
    isRunning: false,
  },
};
