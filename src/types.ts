export interface IUser {
  id: string;
  name?: string;
  login?: string;
  token?: string;
  exp?: number;
  isLogged?: boolean;
  isChecked: true;
}

export interface IUI {
  lang: string;
  alert: {
    type: 'success' | 'error';
    open: boolean;
    text: string;
  };
}

export interface IStoreState {
  user: IUser;
  ui: IUI;
}

export interface IUpdatedUser {
  id: string;
  data: Record<string, FormDataEntryValue>;
}

export interface IBoardResponse {
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

export type TAnyError = Error | IApiError;

export interface IApiResult<T> {
  data?: T;
  error?: IApiError;
}

