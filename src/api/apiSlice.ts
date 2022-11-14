import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IStoreState } from 'types';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://pma-back.onrender.com',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as IStoreState).user.token;
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
    // credentials: 'include', // This allows server to set cookies
  }),
  tagTypes: ['Board', 'BoardColumns', 'Column'],
  endpoints: () => ({}), //extend!
});
