import { UpdateIUser } from 'types';
import { apiSlice } from './apiSlice';

const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (id) => `/users/${id}`,
    }),
    updateUser: builder.mutation({
      query: ({ id, data }: UpdateIUser) => ({
        url: `/users/${id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
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
