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
    }),
    deleteBoard: builder.mutation<IBoard, string>({
      query: (data) => ({
        url: '/boards',
        method: 'DELETE',
        body: data,
      }),
    }),
    getUserBoards: builder.query<IBoard[], string>({
      query: (id) => `/boardsSet/${id}`,
    }),
    getBoardById: builder.query<IBoard, string>({
      query: (id) => `/boards/${id}`,
    }),
  }),
});

export const {
  useCreateBoardMutation,
  useDeleteBoardMutation,
  useGetUserBoardsQuery,
  useGetBoardByIdQuery,
} = extendedApiSlice;

// export const selectUsersResult = extendedApiSlice.endpoints.getUsers.select()
