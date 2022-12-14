import { createSlice, Middleware } from '@reduxjs/toolkit';
import { IStoreState } from 'types';

const defaultUser = { id: '', isChecked: true };
const userSlice = createSlice({
  name: 'user',
  initialState: () => {
    const ld = localStorage.getItem('userToken');
    if (ld) {
      const parsed = parseToken(ld);
      if (!parsed.token) {
        return defaultUser;
      } else {
        return { ...parsed, isLogged: false, isChecked: false };
      }
    }
    return defaultUser;
  },
  reducers: {
    updateUser: (state, action) => {
      return { ...state, ...action.payload };
    },
    setUser: (state, action) => {
      return { ...action.payload };
    },
    setToken: (state, action) => {
      return { ...parseToken(action.payload), isLogged: false, isChecked: false };
    },
    setTokenLogged: (state, action) => {
      return { ...parseToken(action.payload), isLogged: true, isChecked: true };
    },
    clearUser: () => {
      return defaultUser;
    },
  },
});

// eslint-disable-next-line
export const userMiddleware: Middleware = (store) => (next) => (action) => {
  if (action.type === 'user/setToken') localStorage.setItem('userToken', action.payload);
  else if (action.type === 'user/setTokenLogged') localStorage.setItem('userToken', action.payload);
  else if (action.type === 'user/clearUser') localStorage.removeItem('userToken');
  return next(action);
};

export default userSlice.reducer;
export const { updateUser, setUser, setToken, setTokenLogged, clearUser } = userSlice.actions;
export const selectUser = (state: IStoreState) => state.user;
export const selectIsLogged = (state: IStoreState) => !!state.user.isLogged;

const parseToken = (token: string) => {
  let ret;
  try {
    const base64Url = token.split('.')[1];
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
    const parsed = JSON.parse(jsonPayload);
    ret = {
      isLogged: false,
      token: token,
      id: parsed.id,
      login: parsed.login,
      exp: parsed.exp * 1000,
    };
    if (ret.exp <= Date.now()) {
      ret = { token: '' };
    }
  } catch (e) {
    ret = { token: '' };
  }
  return ret;
};
