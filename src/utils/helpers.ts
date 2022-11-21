import { Constants } from 'utils';
import { TErr, IApiError } from 'types';
import i18next from 'i18next';

export const isErrCheck = (err: TErr) => Object.values(err).some((err) => err.length > 0);

export const validateMaxLength =
  (len: string) =>
  (value: string): string =>
    value.length > +len ? len : '';

export const validateMinLength =
  (len: string) =>
  (value: string): string =>
    value.length < +len ? len : '';

export const validatePassword =
  (len: string) =>
  (value: string): string => {
    return value.split('').every((el) => /^[a-zA-Z0-9]$/.test(el)) ? '' : len;
  };

export const validateLogin =
  (len: string) =>
  (value: string): string => {
    return value.split('').every((el) => /^[a-zA-Z0-9-_]$/.test(el)) ? '' : len;
  };

export const validateRequiredField =
  (len: string) =>
  (value: string): string => {
    return value.trim().length > +Constants.REQUIRED_LENGTH ? '' : len;
  };

export const setMinMaxLengthError = (len: string): string => {
  if (len === Constants.MIN_LENGTH || len === Constants.PASSWORD_LENGTH) {
    return i18next.t('can not be less than {{len}} characters', { len });
  } else if (len === Constants.MAX_LENGTH) {
    return i18next.t('can not be larger than {{len}} characters', { len });
  } else if (len === Constants.PASSWORD_RULES) {
    return 'sdfgkjsdjf';
  }
  return ' ';
};

export const setCreateTitleError = (len: string): string => {
  if (len === Constants.REQUIRED_LENGTH) {
    return i18next.t('This field is required');
  } else if (len === Constants.MAX_LENGTH) {
    return i18next.t('can not be larger than {{len}} characters', { len });
  }
  return ' ';
};

export const setTitleError = (len: string) => {
  if (len === Constants.REQUIRED_LENGTH) {
    return i18next.t('This field is required');
  } else if (+len >= +Constants.MAX_LENGTH) {
    return i18next.t('Title is too long');
  }
  return ' ';
};

export const getErrorMessage = (err: unknown): string => {
  if ((err as IApiError).data?.message) return (err as IApiError).data?.message;
  if ((err as Error).message) return (err as Error).message;
  return '';
};
