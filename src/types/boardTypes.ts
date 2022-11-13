export interface IBoard {
  title: string;
  owner: string;
  users: string[];
  _id?: string;
}

export interface IWrongBoardAnswer {
  statusCode: string;
  message: string;
}
