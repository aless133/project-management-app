export interface IApiUser {
  _id: string;
  name: string;
  login: string;
}

// export interface IApiUserUpdate extends Omit<IApiUser, '_id'> {
//   password: string;
// }

export type TApiUserUpdate = Record<string, FormDataEntryValue>;

export interface IApiUserParams {
  id: string;
  data: TApiUserUpdate;
}

/*
export interface IUpdatedUser {
  id: string;
  data: Record<string, FormDataEntryValue>;
}

export interface IBoardResponse {
  data?: { _id: string; name: string; login: string };
  error?: { status: string; originalStatus: number; data: string };
}
*/
