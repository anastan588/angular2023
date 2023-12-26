export interface IPeoples {
    Count: number;
    Items: Array<IPerson>;
  }
  
  export interface IPerson {
    name: {
      S: string;
    };
    uid: {
      S: string;
    };
  }
  