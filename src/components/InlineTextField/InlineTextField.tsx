import React, { useEffect, useState, useRef } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useStoreDispatch } from 'hooks/store.hooks';
import { alertError, alertSuccess } from 'store/uiSlice';
import { IColumn } from 'types/columnTypes';

interface IInlineTextFieldProps {
  label: string;
  value: string;
  handleSave: (value: string) => Promise<IColumn>;
}

export const InlineTextField = ({ label, value, handleSave }: IInlineTextFieldProps) => {
  const [inputValue, setInputValue] = useState<string>(value);
  const [isEditing, setEditing] = useState<boolean>(false);
  const input = useRef<HTMLInputElement>(null);
  const dispatch = useStoreDispatch();

  useEffect(() => {
    if (isEditing && input.current) {
      input.current.focus();
    }
  }, [isEditing, input]);

  useEffect(() => {
    setInputValue(value);
  }, [value, setInputValue]);

  const handleOk = async () => {
    const value = input.current ? input.current.value : '';
    try {
      await handleSave(value);
      setInputValue(value);
      setEditing(false);
      dispatch(alertSuccess());
    } catch (e) {
      dispatch(alertError());
    }
  };

  return (
    <Box sx={{}}>
      {isEditing ? (
        <Box sx={{ display: 'flex', flexWrap: 'nowrap', alignItems: 'center' }}>
          <TextField
            sx={{ flexGrow: 1 }}
            label={label}
            variant="outlined"
            defaultValue={inputValue}
            inputRef={input}
          />
          <CheckIcon fontSize="large" sx={{ cursor: 'pointer' }} onClick={handleOk} />
          <CloseIcon
            fontSize="large"
            sx={{ cursor: 'pointer' }}
            onClick={() => setEditing(false)}
          />
        </Box>
      ) : (
        <Typography
          variant="h3"
          onClick={() => setEditing(true)}
          sx={{
            pt: 1,
            pl: 2,
            pr: 2,
            fontSize: 28,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {inputValue}
        </Typography>
      )}
    </Box>
  );
};
