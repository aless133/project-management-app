import { apiSlice } from './apiSlice';
import { IBoard } from 'types/boardTypes';

const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createBoard: builder.mutation<IBoard, IBoard>({
      query: (data) => ({
        url: '/boards',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Board'],
    }),
    deleteBoard: builder.mutation<IBoard, string>({
      query: (id) => ({
        url: `/boards/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Board'],
    }),
    getUserBoards: builder.query<IBoard[], string>({
      query: (id) => `/boardsSet/${id}`,
      providesTags: (result) =>
        result
          ? [...result.map(({ _id }) => ({ type: 'Board' as const, id: _id })), 'Board']
          : ['Board'],
    }),
    getBoard: builder.query<IBoard, string>({
      query: (id) => `/boards/${id}`,
      providesTags: (result) => [{ type: 'Board', id: result?._id }],
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
