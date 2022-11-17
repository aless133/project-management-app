// import { IBoardResponse, IUpdatedUser } from 'types';
import { IApiUser, IApiUserParams } from 'types/usersTypes';
import { apiSlice } from './apiSlice';

const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (id) => `/users/${id}`,
      providesTags: (result, err, arg) => [{ type: 'User', id: arg }],
    }),

    updateUser: builder.mutation<IApiUser, IApiUserParams>({
      query: ({ id, data }) => ({
        url: `/users/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'User' as const, id: arg.id }],
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'User' as const, id: arg.id }],
    }),
  }),
});

export const {
  useLazyGetUserQuery,
  useGetUserQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
} = extendedApiSlice;

// export const selectUsersResult = extendedApiSlice.endpoints.getUsers.select()
