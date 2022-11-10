import { Constants } from 'utils';
import { TErr } from 'types';
import i18next from 'i18next';

export const isErrCheck = (err: TErr) => Object.values(err).some((err) => err);

export const validateMaxLength =
  (len: string) =>
  (value: string): string =>
    value.length > +len ? len : '';

export const validateMinLength =
  (len: string) =>
  (value: string): string =>
    value.length < +len ? len : '';

// export const setMinMaxLengthError = (len: string): string =>
//   len === Constants.MIN_LENGTH || len === Constants.PASSWORD_LENGTH
//     ? i18next.t('can not be less than {{len}} characters', { len })
//     : len === Constants.MAX_LENGTH
//     ? i18next.t('can not be larger than {{len}} characters', { len })
//     : '';

export const setMinMaxLengthError = (len: string): string => {
  console.log(1111);
  if (len === Constants.MIN_LENGTH || len === Constants.PASSWORD_LENGTH) {
    return i18next.t('can not be less than {{len}} characters', { len });
  } else if (len === Constants.MAX_LENGTH) {
    return i18next.t('can not be larger than {{len}} characters', { len });
  } else {
    return '';
  }
};

export const setCreateBoardError = (len: string): string => {
  console.log(1, len);
  if (len.length < 2) {
    return i18next.t('This field is required');
  } else if (len >= Constants.MAX_LENGTH) {
    return i18next.t('can not be larger than {{len}} characters', { len });
  } else {
    return '';
  }
};
