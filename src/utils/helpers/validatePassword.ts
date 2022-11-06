export const validatePassword = (value: string): string => {
  return value.length < 8 ? 'can not be less than 8' : '';
};
