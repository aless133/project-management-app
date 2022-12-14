import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import userReducer, { userMiddleware } from 'store/userSlice';
import uiReducer, { uiMiddleware } from 'store/uiSlice';
import { apiSlice } from 'api/apiSlice';

import { isRejectedWithValue } from '@reduxjs/toolkit';
import type { MiddlewareAPI, Middleware } from '@reduxjs/toolkit';
import { clearUser } from 'store/userSlice';

export const apiErrorMiddleware: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    if (action.type.startsWith('api/') && action.payload.status == 403) {
      api.dispatch(clearUser());
    }
  }
  return next(action);
};

const store = configureStore({
  reducer: {
    user: userReducer,
    ui: uiReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiErrorMiddleware)
      .concat(userMiddleware)
      .concat(uiMiddleware)
      .concat(apiSlice.middleware),
});

export type TStoreDispatch = typeof store.dispatch;

export function StoreProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
