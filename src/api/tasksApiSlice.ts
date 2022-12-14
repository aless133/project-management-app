import {
  IOrderTaskParams,
  ISearchTask,
  ISearchTaskData,
  ITask,
  ITaskParams,
  IUpdatedTask,
} from 'types/taskTypes';
import { apiSlice } from './apiSlice';

const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getColumnTasks: builder.query<ITask[], ITaskParams>({
      query: ({ boardId, columnId }) => `/boards/${boardId}/columns/${columnId}/tasks`,
      transformResponse: (responseData: ITask[]) => {
        return responseData.sort((a, b) => a.order - b.order);
      },
      providesTags: (result, err, arg) => [
        { type: 'ColumnTasks', id: arg.columnId },
        ...(result ? result!.map(({ _id }) => ({ type: 'Task' as const, id: _id })) : []),
      ],
    }),

    createTask: builder.mutation<ITask, ITaskParams>({
      query: ({ boardId, columnId, data }) => ({
        url: `/boards/${boardId}/columns/${columnId}/tasks`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'ColumnTasks' as const, id: arg.columnId },
        'TasksSearch',
      ],
    }),

    updateTask: builder.mutation<ITask, ITaskParams>({
      query: ({ boardId, columnId, taskId, data }) => ({
        url: `/boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Task' as const, id: arg.taskId },
        'TasksSearch',
      ],
    }),

    updateTasksSet: builder.mutation<IUpdatedTask[], IOrderTaskParams>({
      query: ({ data }) => ({
        url: 'tasksSet',
        method: 'PATCH',
        body: data,
      }),
      async onQueryStarted({ boardId, updateCache }, { dispatch, queryFulfilled }) {
        const patchResults = [];
        for (const columnId in updateCache)
          patchResults.push(
            dispatch(
              extendedApiSlice.util.updateQueryData(
                'getColumnTasks',
                { boardId, columnId },
                () => updateCache[columnId]
              )
            )
          );
        try {
          await queryFulfilled;
        } catch {
          patchResults.forEach((pr) => pr.undo());
        }
      },
      invalidatesTags: (result, error, arg) =>
        arg.invalidate.map((columnId) => ({ type: 'ColumnTasks' as const, id: columnId })),
    }),

    deleteTask: builder.mutation<ITask, ITaskParams>({
      query: ({ boardId, columnId, taskId }) => ({
        url: `/boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Task' as const, id: arg.taskId },
        'TasksSearch',
      ],
    }),

    getTasksSet: builder.query<ISearchTaskData[], ISearchTask>({
      query: ({ userId, search }) =>
        `/tasksSet?userId=${userId}&search=${encodeURIComponent(search)}`,
      transformResponse: (response: ISearchTaskData[], meta, arg) =>
        response.filter(
          (task) =>
            task.userId === arg.userId &&
            (task.title.toUpperCase().includes(arg.search.toUpperCase()) ||
              task.description.toUpperCase().includes(arg.search.toUpperCase()))
        ),
      providesTags: (result, error, arg) =>
        result ? [{ type: 'TasksSearch' as const, id: arg.search }] : [],
    }),
  }),
});

export const {
  useGetTasksSetQuery,
  useCreateTaskMutation,
  useGetColumnTasksQuery,
  useLazyGetColumnTasksQuery,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
  useUpdateTasksSetMutation,
} = extendedApiSlice;
