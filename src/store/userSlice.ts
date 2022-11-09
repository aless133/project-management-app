import { createSlice, Middleware } from '@reduxjs/toolkit';
import { IStoreState } from 'types';

const userSlice = createSlice({
  name: 'user',
  initialState: () => {
    const ld = localStorage.getItem('userToken');
    if (ld) return parsedTokenData(ld);
    return {};
  },
  reducers: {
    update: (state, action) => {
      return { ...state, ...action.payload };
    },
    set: (state, action) => {
      return { ...action.payload };
    },
    setToken: (state, action) => {
      const parseData = parseJwt(action.payload);
      return { ...state, ...parsedTokenData(action.payload) };
    },
    clear: (state, action) => {
      return {};
    },
  },
});

export const userMiddleware: Middleware = (store) => (next) => (action) => {
  if (action.type == 'user/setToken') localStorage.setItem('userToken', action.payload);
  else if (action.type == 'user/clear') localStorage.removeItem('userToken');
  return next(action);
};

export default userSlice.reducer;
export const { update, set, setToken, clear } = userSlice.actions;
export const selectUser = (state: IStoreState) => state.user;
export const selectIsLogged = (state: IStoreState) => !!state.user.isLogged;

const parsedTokenData = (token: string): { token?: string; id?: string; login?: string } => {
  const parsed = parseJwt(token);
  if (!parsed) return {};
  return { token: token, id: parsed.userId, login: parsed.login };
};
const parseJwt = (token: string) => {
  const base64Url = token.split('.')[1];
  if (!base64Url) return false;
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );

  return JSON.parse(jsonPayload);
};
