export const validateMaxLength = (value: string): string => {
  return value.length > 10 ? 'can not be larger than 10' : '';
};
