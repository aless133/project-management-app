export interface IColumnData {
  title: string;
  order: number;
}
export interface IColumnResult extends IColumnData {
  _id: string,
  boardId: string;
}
export interface IColumnParams {
  id?:string;
  boardId?:string;
  data:IColumnData;
}