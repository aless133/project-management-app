import { createSlice, Middleware, PayloadAction } from '@reduxjs/toolkit';
import { IStoreState } from 'types';
import { NotifierText, NotifierType } from 'types/NotifierTypes';
import i18n from 'i18n/i18n';

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
    setLang: (state, { payload }) => {
      state.lang = payload;
    },
    alertError: (state, action: PayloadAction<string | undefined>) => {
      state.alert = {
        type: NotifierType.ERROR,
        text: action.payload
          ? i18n.t(NotifierText.ERROR_PREFIX) + ': ' + action.payload
          : i18n.t(NotifierText.ERROR),
        open: true,
      };
    },
    alertSuccess: (state, action: PayloadAction<string | undefined>) => {
      state.alert = {
        type: NotifierType.SUCCESS,
        text: action.payload ? action.payload : i18n.t(NotifierText.SUCCESS),
        open: true,
      };
    },
    hideAlert: (state) => {
      state.alert.open = false;
    },
  },
});

// eslint-disable-next-line
export const uiMiddleware: Middleware = (store) => (next) => (action) => {
  if (action.type === 'ui/setLang') localStorage.setItem('lang', action.payload);
  return next(action);
};

export default uiSlice.reducer;
export const { setLang, alertError, alertSuccess, hideAlert } = uiSlice.actions;
export const selectLang = (state: IStoreState) => state.ui.lang;
export const selectAlert = (state: IStoreState) => state.ui.alert;
