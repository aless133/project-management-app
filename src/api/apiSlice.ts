import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IStoreState } from 'types';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://rs-pma-back.herokuapp.com',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as IStoreState).user.token;
      if (token) headers.set('Authorization', `Bearer ${token}111`);
      return headers;
    },
    // credentials: 'include', // This allows server to set cookies
  }),
  endpoints: () => ({}), //extend!
});
