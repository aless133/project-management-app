import { Constants } from 'utils';
import { TErr } from 'types';
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

export const setMinMaxLengthError = (len: string): string =>
  len === Constants.MIN_LENGTH || len === Constants.PASSWORD_LENGTH
    ? i18next.t('can not be less than {{len}} characters', { len })
    : len === Constants.MAX_LENGTH
    ? i18next.t('can not be larger than {{len}} characters', { len })
    : '';

export const setCreateTitleError = (len: string): string => {
  if (len === Constants.REQUIRED_LENGTH) {
    return i18next.t('This field is required');
  } else if (len === Constants.MAX_LENGTH) {
    return i18next.t('can not be larger than {{len}} characters', { len });
  } else {
    return ' ';
  }
};
