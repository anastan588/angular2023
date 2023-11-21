export interface Action {
    type: string;
  }
  
  export interface ReducerMap {
    [key: string]: Function;
  }
  
  export interface State {
    [key: string]: any;
  }
  