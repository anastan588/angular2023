export interface IGroups {
  Count: number;
  Items: Array<IGroup>;
}

export interface IGroup {
  id: {
    S: string;
  };
  name: {
    S: string;
  };
  createdAt: {
    S: string;
  };
  createdBy: {
    S: string;
  };
}
