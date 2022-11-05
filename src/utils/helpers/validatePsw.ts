export const validatePsw = (psw: string): boolean => !!psw && psw.length < 8;
