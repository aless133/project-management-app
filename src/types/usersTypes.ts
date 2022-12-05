export interface IApiUser {
  _id: string;
  name: string;
  login: string;
}

export type TApiUserUpdate = Record<string, FormDataEntryValue>;

export interface IApiUserParams {
  id: string;
  data: TApiUserUpdate;
}
