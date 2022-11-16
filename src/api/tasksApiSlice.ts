import { ITask, ITaskParams } from 'types/taskTypes';
import { apiSlice } from './apiSlice';

const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createTask: builder.mutation<ITask, ITaskParams>({
      query: ({ boardId, columnId, data }) => ({
        url: `/boards/${boardId}/columns/${columnId}/tasks`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'ColumnTasks', id: arg.columnId }],
    }),

    getColumnsTask: builder.query<ITask[], ITaskParams>({
      query: ({ boardId, columnId }) => `/boards/${boardId}/columns/${columnId}/tasks`,
      providesTags: (result, err, arg) => [
        { type: 'ColumnTasks', id: arg.columnId },
        ...(result ? result!.map(({ _id }) => ({ type: 'Task' as const, id: _id })) : []),
      ],      
    }),

    deleteTask: builder.mutation<ITask, ITaskParams>({
      query: ({ boardId, columnId, taskId }) => ({
        url: `/boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Task', id: arg.taskId }],
    }),
  }),
});

export const { useCreateTaskMutation, useGetColumnsTaskQuery, useDeleteTaskMutation } =
  extendedApiSlice;
