import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from 'store/userSlice';
import { userMiddleware } from 'store/userSlice';
import uiReducer from 'store/uilice';
import { apiSlice } from 'api/apiSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    io: uiReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userMiddleware).concat(apiSlice.middleware),
});

// export interface IStoreState = ReturnType<typeof store.getState>;
export type TStoreDispatch = typeof store.dispatch;

export function StoreProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
