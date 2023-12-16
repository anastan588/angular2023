import { IGroup } from "./groups";

export interface IGroupName {
    name: string;
  }


  export interface IGroupCreateResponse {
    groupID: string;
  }

  export interface IGroupDeleteRequest {
    groupID: string;
    since: number;
  }
  
  