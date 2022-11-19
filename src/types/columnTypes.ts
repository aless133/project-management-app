export interface IColumnData {
  title: string;
  order: number;
}

export interface IOrderData {
  _id: string;
  order: number;
  columnId?: string;
}
export interface IColumn extends IColumnData {
  _id: string;
  boardId: string;
}
export interface IColumnParams {
  boardId: string;
  columnId?: string;
  data?: IColumnData | IColumnData[];
}
