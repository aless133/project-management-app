export interface IBoardData {
  title: string;
  owner: string;
  users: string[];
}

export interface IBoard extends IBoardData {
  _id: string;
}