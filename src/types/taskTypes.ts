export interface ITaskData {
  title: string;
  order: number;
  description: string;
  userId: string;
  users: string[];
  columnId?: string;
}

export interface IUpdatedTask extends ITaskData {
  boardId: string;
  columnId: string;
}

export interface IOrderTaskData {
  _id: string;
  order: number;
  columnId: string;
}

export interface ITask extends ITaskData {
  _id: string;
  boardId: string;
  columnId: string;
}

export interface ITaskParams {
  boardId: string;
  columnId: string;
  taskId?: string;
  data?: ITaskData;
}

export interface ITaskPropsData {
  title: string;
  description: string;
  boardId: string;
  columnId: string;
  taskId: string;
  order: number;
}

export interface ISearchTask {
  userId: string;
  search: string;
}

export interface ISearchTaskData {
  _id: string;
  title: string;
  order: number;
  boardId: string;
  columnId: string;
  description: string;
  userId: string;
  users: string[];
}

export interface IOrderTaskParams {
  boardId: string;
  data: IOrderTaskData[];
  updateCache: Record<string, ITask[]>;
  invalidate: string[];
}
