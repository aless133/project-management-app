export const validateMinLength = (value: string): string => {
  return value.length < 2 ? 'can not be less than 2' : '';
};
