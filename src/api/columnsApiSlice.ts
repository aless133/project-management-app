import { apiSlice } from './apiSlice';
import { IColumn, IColumnParams, IOrderColumnData } from 'types/columnTypes';
// import { TApiTag } from 'types';
// import type { TagDescription } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBoardColumns: builder.query<IColumn[], string>({
      query: (boardId) => `/boards/${boardId}/columns`,
      providesTags: (result, err, arg) => [
        { type: 'BoardColumns' as const, id: arg },
        ...(result ? result!.map(({ _id }) => ({ type: 'Column' as const, id: _id })) : []),
      ],
    }),

    createColumn: builder.mutation<IColumn, IColumnParams>({
      query: ({ boardId, data }) => ({
        url: `/boards/${boardId}/columns`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'BoardColumns' as const, id: arg.boardId }],
    }),

    updateColumn: builder.mutation<IColumn, IColumnParams>({
      query: ({ boardId, columnId, data }) => ({
        url: `/boards/${boardId}/columns/${columnId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['BoardColumns'],
    }),

    updateColumnSet: builder.mutation<IColumn[], IOrderColumnData[]>({
      query: (data) => ({
        url: 'columnsSet',
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['BoardColumns'],
    }),

    deleteColumn: builder.mutation<IColumn, IColumnParams>({
      query: ({ boardId, columnId }) => ({
        url: `/boards/${boardId}/columns/${columnId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Column' as const, id: arg.columnId }],
    }),
  }),
});

export const {
  useCreateColumnMutation,
  // useDeleteBoardMutation,
  useDeleteColumnMutation,
  useGetBoardColumnsQuery,
  useUpdateColumnSetMutation,
  // useGetBoardQuery,
  useUpdateColumnMutation,
} = extendedApiSlice;

// export const selectUsersResult = extendedApiSlice.endpoints.getUsers.select()
