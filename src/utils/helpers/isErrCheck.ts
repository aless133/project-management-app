import { TErr } from 'types';

export const isErrCheck = (err: TErr) => Object.values(err).some((err) => err);
