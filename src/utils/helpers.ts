import i18next from 'i18next';
import { TErr } from 'types';

export const isErrCheck = (err: TErr) => Object.values(err).some((err) => err);

export const validateMaxLength =
  (len: string) =>
  (value: string): string => {
    return value.length > 10 ? i18next.t('can not be larger than {{len}} characters', { len }) : '';
  };

export const validateMinLength =
  (len: string) =>
  (value: string): string => {
    return value.length < 2 ? i18next.t('can not be less than {{len}} characters', { len }) : '';
  };

export const validatePassword =
  (len: string) =>
  (value: string): string => {
    return value.length < 8 ? i18next.t('can not be less than {{len}} characters', { len }) : '';
  };
