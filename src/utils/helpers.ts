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

export const validateRequiredField =
  (len: string) =>
  (value: string): string =>
    value.length > +Constants.REQUIRED_LENGTH ? '' : len;

export const setMinMaxLengthError = (len: string): string => {
  if (len === Constants.MIN_LENGTH || len === Constants.PASSWORD_LENGTH) {
    return i18next.t('can not be less than {{len}} characters', { len });
  } else if (len === Constants.MAX_LENGTH) {
    return i18next.t('can not be larger than {{len}} characters', { len });
  }
  return ' ';
};

export const setCreateTitleError = (len: string): string => {
  if (len === Constants.REQUIRED_LENGTH) {
    return i18next.t('This field is required');
  } else if (len === Constants.MAX_LENGTH) {
    return i18next.t('can not be larger than {{len}} characters', { len });
  } else {
    return ' ';
  }
};

export const getErrorMessage = (err: unknown): string => {
  if ((err as IApiError).data?.message) return (err as IApiError).data?.message;
  if ((err as Error).message) return (err as Error).message;
  return '';
};
