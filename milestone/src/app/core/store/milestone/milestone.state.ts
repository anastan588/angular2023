import { IGroups } from '../../models/groups';
import { IUser } from '../../models/user';

export interface IMilestoneState {
  user: IUser;
  groups: IGroups;
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
};
