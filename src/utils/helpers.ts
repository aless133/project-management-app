import { TErr } from 'types';

export const isErrCheck = (err: TErr) => Object.values(err).some((err) => err);

export const validateMaxLength =
  (len: string) =>
  (value: string): string => {
    return value.length > 10 ? `can not be larger than ${len}` : '';
  };

export const validateMinLength =
  (len: string) =>
  (value: string): string => {
    return value.length < 2 ? `can not be less than ${len}` : '';
  };

export const validatePassword =
  (len: string) =>
  (value: string): string => {
    return value.length < 8 ? `can not be less than ${len}` : '';
  };
