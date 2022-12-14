export interface IUser {
  id: string;
  name?: string;
  login?: string;
  token?: string;
  exp?: number;
  isLogged?: boolean;
  isChecked: boolean;
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

export type TFnVoid = () => void;
