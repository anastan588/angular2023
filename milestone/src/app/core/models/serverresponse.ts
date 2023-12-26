export interface IServerResponseSignUp {
  type: string;
  message: string;
}

export interface IServerResponseSignIn {
  type?: string;
  message?: string;
  token?: string;
  uid?: string;
  email?: string;
}
