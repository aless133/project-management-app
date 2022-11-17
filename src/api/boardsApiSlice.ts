import { apiSlice } from './apiSlice';
import { IBoard, IBoardData, IBoardParams } from 'types/boardTypes';

const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserBoards: builder.query<IBoard[], string>({
      query: (userId) => `/boardsSet/${userId}`,
      providesTags: (result) => [
        'Board',
        ...(result ? result.map(({ _id }) => ({ type: 'Board' as const, id: _id })) : []),
      ],
    }),

    getBoard: builder.query<IBoard, string>({
      query: (boardId) => `/boards/${boardId}`,
      providesTags: (result, err, arg) => [{ type: 'Board' as const, id: arg }],
    }),

    createBoard: builder.mutation<IBoard, IBoardData>({
      query: (data) => ({
        url: '/boards',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Board'],
    }),

    updateBoard: builder.mutation<IBoard, IBoardParams>({
      query: ({ boardId, data }) => ({
        url: `/boards/${boardId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, err, arg) => [{ type: 'Board' as const, id: arg.boardId }],
    }),

    deleteBoard: builder.mutation<IBoard, string>({
      query: (boardId) => ({
        url: `/boards/${boardId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, err, arg) => [{ type: 'Board' as const, id: arg }],
    }),
  }),
});

export const {
  useCreateBoardMutation,
  useDeleteBoardMutation,
  useGetUserBoardsQuery,
  useGetBoardQuery,
} = extendedApiSlice;

// export const selectUsersResult = extendedApiSlice.endpoints.getUsers.select()
