import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IStoreState } from 'types';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://pma-back.onrender.com',
    prepareHeaders: (headers, { endpoint, getState }) => {
      const token = (getState() as IStoreState).user.token;
      if (endpoint === 'чтонибудь что бы не сработало deleteBoard') {
        //use it for test error
        if (token) headers.set('Authorization', `Bearer ${token}1231231`);
      } else {
        if (token) headers.set('Authorization', `Bearer ${token}`);
      }
      // if (token) headers.set('Authorization', `Bearer ${token}11111`);
      return headers;
    },
    // credentials: 'include', // This allows server to set cookies
  }),
  tagTypes: ['Board', 'BoardColumns', 'Column'],
  endpoints: () => ({}), //extend!
});
