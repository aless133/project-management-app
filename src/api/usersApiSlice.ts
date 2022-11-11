import { apiSlice } from './apiSlice';

const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (id) => `/users/${id}`,
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useLazyGetUserQuery, useGetUserQuery, useDeleteUserMutation } = extendedApiSlice;

// export const selectUsersResult = extendedApiSlice.endpoints.getUsers.select()
