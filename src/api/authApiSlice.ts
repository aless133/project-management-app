import { apiSlice } from './apiSlice';

const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (data) => ({
        url: '/signup',
        method: 'POST',
        body: data,
      }),
    }),
    signIn: builder.mutation({
      query: (data) => ({
        url: '/signin',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useSignUpMutation, useSignInMutation } = extendedApiSlice;

// export const selectUsersResult = extendedApiSlice.endpoints.getUsers.select()
