import { createSlice, Middleware } from '@reduxjs/toolkit';
import { IStoreState } from 'types';

const userSlice = createSlice({
  name: 'user',
  initialState: () => {
    const ld = localStorage.getItem('userToken');
    return ld ? { token: ld } : {};
  },
  reducers: {
    update: (state, action) => {
      return { ...state, ...action.payload };
    },
    set: (state, action) => {
      return { ...action.payload };
    },
    logout: (state, action) => {
      return {};
    },
  },
});

export const userMiddleware: Middleware = (store) => (next) => (action) => {
  if (action.type == 'user/set') localStorage.setItem('userToken', action.payload.token);
  else if (action.type == 'user/logout') localStorage.removeItem('userToken');
  return next(action);
};

export default userSlice.reducer;
export const { update, set } = userSlice.actions;
export const selectUser = (state: IStoreState) => state.user;
export const selectIsLogged = (state: IStoreState) => !!state.user.isLogged;
