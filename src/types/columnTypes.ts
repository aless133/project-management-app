export interface IColumnData {
  title: string;
  order: number;
}
export interface IOrderColumnData {
  _id: string;
  order: number;
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

export interface IOrderColumnParams {
  boardId: string;
  data: IOrderColumnData[];
}
