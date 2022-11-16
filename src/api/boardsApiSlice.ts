import { apiSlice } from './apiSlice';
import { IBoard, IBoardData } from 'types/boardTypes';

const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createBoard: builder.mutation<IBoard, IBoardData>({
      query: (data) => ({
        url: '/boards',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Board'],
    }),

    getUserBoards: builder.query<IBoard[], string>({
      query: (userId) => `/boardsSet/${userId}`,
      providesTags: (result) => [
        'Board',
        ...(result ? result.map(({ _id }) => ({ type: 'Board' as const, id: _id })) : []),
      ],
    }),

    getBoard: builder.query<IBoard, string>({
      query: (boardId) => `/boards/${boardId}`,
      providesTags: (result, err, arg) => [{ type: 'Board', id: arg }],
    }),

    deleteBoard: builder.mutation<IBoard, string>({
      query: (id) => ({
        url: `/boards/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, err, arg) => [{ type: 'Board', id: arg }],
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
