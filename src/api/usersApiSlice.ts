import { apiSlice } from './apiSlice';

const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (id) => `/users/${id}`,
    }),
  }),
});

export const { useLazyGetUserQuery, useGetUserQuery } = extendedApiSlice;

// export const selectUsersResult = extendedApiSlice.endpoints.getUsers.select()
