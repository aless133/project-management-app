import { apiSlice } from './apiSlice';
import { IColumn, IColumnParams, IOrderColumnParams } from 'types/columnTypes';
// import { TApiTag } from 'types';
// import type { TagDescription } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBoardColumns: builder.query<IColumn[], string>({
      query: (boardId) => `/boards/${boardId}/columns`,
      transformResponse: (responseData: IColumn[]) => {
        return responseData.sort((a, b) => a.order - b.order);
      },
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

    updateColumnsSet: builder.mutation<IColumn[], IOrderColumnParams>({
      query: ({ boardId, data }) => ({
        url: 'columnsSet',
        method: 'PATCH',
        body: data,
      }),
      async onQueryStarted({ boardId, data }, { dispatch, queryFulfilled }) {
        // `updateQueryData` requires the endpoint name and cache key arguments,
        // so it knows which piece of cache state to update
        const patchResult = dispatch(
          extendedApiSlice.util.updateQueryData('getBoardColumns', boardId, (drafts: IColumn[]) => {
            data.forEach((columnPatch) => {
              const draft = drafts.find((column) => column._id === columnPatch._id);
              if (draft) draft.order = columnPatch.order;
            });
            drafts.sort((a, b) => a.order - b.order);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
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
  useUpdateColumnsSetMutation,
  // useGetBoardQuery,
  useUpdateColumnMutation,
} = extendedApiSlice;

// export const selectUsersResult = extendedApiSlice.endpoints.getUsers.select()
