export interface IUser {
  id?: string;
  name?: string;
  login?: string;
  token?: string;
}

export interface TStoreState {
  user: IUser;
}

export type TErr = Record<string, string>;

export type TFields = TErr;

export type TValidator = Record<string, Array<(value: string) => string>>;

export interface IApiError {
  data: {
    message:string;
  }
};