export interface IUser {
  id?: string;
  name?: string;
  login?: string;
  token?: string;
  exp: number;
  isLogged?: boolean;
  isChecked: true;
}

export interface IUI {
  lng: string;
}

export interface IStoreState {
  user: IUser;
  user: IUI;
}

export interface IUpdatedUser {
  id: string;
  data: Record<string, FormDataEntryValue>;
}

export interface INewUser {
  data?: { _id: string; name: string; login: string };
  error?: { status: string; originalStatus: number; data: string };
}

export type TErr = Record<string, string>;

export type TFields = TErr;

export type TValidator = Record<string, Array<(value: string) => string>>;

export interface IApiError {
  data: {
    message: string;
  };
}
