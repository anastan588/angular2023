import { IUser } from '../../models/user';

export interface IMilestoneState {
  user: IUser;
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
};
