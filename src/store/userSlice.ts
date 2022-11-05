import { createSlice } from '@reduxjs/toolkit';
import { IUser, TStoreState } from 'types';

const defaultUser: IUser = {};

const userSlice = createSlice({
  name: 'user',
  initialState: defaultUser,
  reducers: {
    update: (state, action) => {
      return { ...state, ...action.payload };
    },
    set: (state, action) => {
      return { ...action.payload };
    },
  },
});

export default userSlice.reducer;
export const { update, set } = userSlice.actions;
export const selectUser = (state: TStoreState) => state.user;
export const selectIsLogged = (state: TStoreState) => !!state.user.token;
