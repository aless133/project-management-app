export interface IColumnData {
  title: string;
  order: number;
}
export interface IColumn extends IColumnData {
  _id: string;
  boardId: string;
}
export interface IColumnParams {
  id?: string;
  columnId?: string;
  boardId: string;
  data?: IColumnData;
}
