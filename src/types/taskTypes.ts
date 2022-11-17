export interface ITaskData {
  title: string;
  order: number;
  description: string;
  userId: string;
  users: string[];
}

export interface ITask extends ITaskData {
  _id: string;
}

export interface ITaskParams {
  boardId: string;
  columnId: string;
  taskId?: string;
  data?: ITaskData;
}
