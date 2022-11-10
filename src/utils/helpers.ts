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

export const setMinMaxLengthError = (len: string): string =>
  len === Constants.MIN_LENGTH || len === Constants.PASSWORD_LENGTH
    ? i18next.t('can not be less than {{len}} characters', { len })
    : len === Constants.MAX_LENGTH
    ? i18next.t('can not be larger than {{len}} characters', { len })
    : '';
