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
      query: (data) => ({
        url: '/boards',
        method: 'DELETE',
        body: data,
      }),
      invalidatesTags: ['Board'],
    }),
    getUserBoards: builder.query<IBoard[], string>({
      query: (id) => `/boardsSet/${id}`,
      providesTags: () => ['Board'],
    }),
  }),
});

export const { useCreateBoardMutation, useDeleteBoardMutation, useGetUserBoardsQuery } =
  extendedApiSlice;

// export const selectUsersResult = extendedApiSlice.endpoints.getUsers.select()
