import i18next from 'i18next';
import { TErr } from 'types';

export const isErrCheck = (err: TErr) => Object.values(err).some((err) => err);

export const validateMaxLength =
  (len: string) =>
  (value: string): string =>
    value.length > +len ? i18next.t('can not be larger than {{len}} characters', { len }) : '';

export const validateMinLength =
  (len: string) =>
  (value: string): string =>
    value.length < +len ? i18next.t('can not be less than {{len}} characters', { len }) : '';
