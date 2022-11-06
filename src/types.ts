export interface IUser {
  id?: string;
  name?: string;
  login?: string;
  token?: string;
}

export interface TStoreState {
  user: IUser;
}

export type TErr = {
  [k: string]: string;
};

export type TFields = TErr;

export type TValidator = {
  [k: string]: Array<(value: string) => string>;
};
