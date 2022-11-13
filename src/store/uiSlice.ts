import { createSlice, Middleware } from '@reduxjs/toolkit';
import { IStoreState } from 'types';

const defaultUi = { lang: 'en' };
const uiSlice = createSlice({
  name: 'ui',
  initialState: () => {
    const st = { ...defaultUi };
    const lang = localStorage.getItem('lang');
    if (lang) st.lang = lang;
    return st;
  },
  reducers: {
    setLang: (state, action) => {
      state.lang = action.payload;
    },
  },
});

// eslint-disable-next-line
export const uiMiddleware: Middleware = (store) => (next) => (action) => {
  if (action.type === 'ui/setLang') localStorage.setItem('lang', action.payload);
  return next(action);
};

export default uiSlice.reducer;
export const { setLang } = uiSlice.actions;
export const selectLng = (state: IStoreState) => state.ui.lang;
