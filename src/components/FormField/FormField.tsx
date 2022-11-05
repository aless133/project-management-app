import React from 'react';
import { FormControl, FormHelperText, Input, InputLabel } from '@mui/material';

interface FormFieldProps {
  value: string;
  label: string;
  text: string;
  handlerFlag: 'name' | 'login' | 'psw';
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: 'name' | 'login' | 'psw'
  ) => void;
  validator: (value: string) => boolean;
}

export const FormField = ({
  value,
  label,
  text,
  handlerFlag,
  onChange,
  validator,
}: FormFieldProps) => {
  return (
    <FormControl required error={validator(value)} variant="standard">
      <InputLabel htmlFor="component-error">{label}</InputLabel>
      <Input
        id="component-error"
        value={value}
        onChange={(e) => onChange(e, handlerFlag)}
        aria-describedby="component-error-text"
      />
      <FormHelperText id="component-error-text">{text}</FormHelperText>
    </FormControl>
  );
};
