import { createSlice, Middleware } from '@reduxjs/toolkit';
import { IStoreState } from 'types';

const alert = {
  type: 'success',
  open: false,
  text: 'Success',
};
const defaultUi = { lang: 'en', alert };

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
    addAlert: (state, action) => {
      state.alert = action.payload;
    },
    clearAlert: (state) => {
      state.alert = alert;
    },
  },
});

// eslint-disable-next-line
export const uiMiddleware: Middleware = (store) => (next) => (action) => {
  if (action.type === 'ui/setLang') localStorage.setItem('lang', action.payload);
  return next(action);
};

export default uiSlice.reducer;
export const { setLang, addAlert, clearAlert } = uiSlice.actions;
export const selectLang = (state: IStoreState) => state.ui.lang;
export const selectAlert = (state: IStoreState) => state.ui.alert;
