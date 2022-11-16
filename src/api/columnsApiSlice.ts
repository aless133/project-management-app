import { apiSlice } from './apiSlice';
import { IColumn, IColumnParams } from 'types/columnTypes';
// import { TApiTag } from 'types';
// import type { TagDescription } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createColumn: builder.mutation<IColumn, IColumnParams>({
      query: ({ boardId, data }) => ({
        url: `/boards/${boardId}/columns`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'BoardColumns', id: arg.boardId }],
    }),
    // createColumn: builder.mutation<IColumn, { id: string; data: { title: string; order: number } }>(
    //   {
    //     query: ({ id, data }) => ({
    //       url: `/boards/${id}/columns`,
    //       method: 'POST',
    //       body: data,
    //     }),
    //     invalidatesTags: ['BoardColumns'],
    //   }
    // ),
    getBoardColumns: builder.query<IColumn[], string>({
      query: (boardId) => `/boards/${boardId}/columns`,
      providesTags: (result, err, arg) => [
        'Column',
        { type: 'BoardColumns' as const, id: arg },
        ...(result ? result!.map(({ _id }) => ({ type: 'Column' as const, id: _id })) : []),
      ],
    }),
  }),
});

export const {
  useCreateColumnMutation,
  // useDeleteBoardMutation,
  useGetBoardColumnsQuery,
  // useGetBoardQuery,
} = extendedApiSlice;

// export const selectUsersResult = extendedApiSlice.endpoints.getUsers.select()
