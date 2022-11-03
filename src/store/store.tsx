import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from 'store/userSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

// export type TStoreState = ReturnType<typeof store.getState>;
export type TStoreDispatch = typeof store.dispatch;

export function StoreProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
