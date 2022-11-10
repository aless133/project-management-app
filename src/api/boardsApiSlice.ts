import { apiSlice } from './apiSlice';
import { IBoard } from 'types';

const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createBoard: builder.mutation({
      query: (data) => ({
        url: '/boards',
        method: 'POST',
        body: data,
      }),
    }),
    deleteBoard: builder.mutation({
      query: (data) => ({
        url: '/boards',
        method: 'DELETE',
        body: data,
      }),
    }),
    getUserBoards: builder.query<IBoard[], string>({
      query: (id) => `/boardsSet/${id}`,
    }),
  }),
});

export const { useCreateBoardMutation, useDeleteBoardMutation, useGetUserBoardsQuery } =
  extendedApiSlice;

// export const selectUsersResult = extendedApiSlice.endpoints.getUsers.select()
