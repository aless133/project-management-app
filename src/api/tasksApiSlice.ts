import { ITaskParams, ITaskResponse } from 'types/taskTypes';
import { apiSlice } from './apiSlice';

const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getColumnsTask: builder.query<ITaskResponse[], ITaskParams>({
      query: ({ boardId, columnId }) => `/boards/${boardId}/columns/${columnId}/tasks`,
      providesTags: (result) =>
        result
          ? [...result.map(({ _id }) => ({ type: 'ColumnTask' as const, id: _id })), 'ColumnTask']
          : [],
    }),

    createTask: builder.mutation<ITaskResponse, ITaskParams>({
      query: ({ boardId, columnId, data }) => ({
        url: `/boards/${boardId}/columns/${columnId}/tasks`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['ColumnTask'],
    }),

    deleteTask: builder.mutation<ITaskResponse, ITaskParams>({
      query: ({ boardId, columnId, taskId }) => ({
        url: `/boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'ColumnTask', id: arg.columnId }],
    }),
  }),
});

export const { useCreateTaskMutation, useGetColumnsTaskQuery, useDeleteTaskMutation } =
  extendedApiSlice;
