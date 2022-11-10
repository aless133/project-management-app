export interface IUser {
  id?: string;
  name?: string;
  login?: string;
  token?: string;
  exp: number;
  isLogged?: boolean;
  isChecked: true;
}

export interface IBoard {
  _id: string;
  title: string;
  owner: string;
  users: string[];
}

export interface IStoreState {
  user: IUser;
}

export type TErr = Record<string, string>;

export type TFields = TErr;

export type TValidator = Record<string, Array<(value: string) => string>>;

export interface IApiError {
  data: {
    message: string;
  };
}
