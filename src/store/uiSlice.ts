import { createSlice } from '@reduxjs/toolkit';
import { IStoreState } from 'types';

const defaultUi = { lng: "en" };
const uiSlice = createSlice({
  name: 'ui',
  initialState: () => {
    const st = {...defaultUi};
    const lng = localStorage.getItem('lng');
    if (lng) return st.lng=ll;
    return st;
  },
  reducers: {
    setLng: (state, action) => {
      state.lng = action.payload;
    },
  },
});

// eslint-disable-next-line
export const userMiddleware: Middleware = (store) => (next) => (action) => {
  if (action.type === 'ui/setLng') localStorage.setItem('lng', action.payload);
  return next(action);
};

export default uiSlice.reducer;
export const { setLng } = uiSlice.actions;
export const selectLng = (state: IStoreState) => state.Lng;
