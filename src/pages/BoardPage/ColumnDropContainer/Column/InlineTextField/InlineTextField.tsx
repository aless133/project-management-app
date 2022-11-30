import React, { useEffect, useState, useRef } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useStoreDispatch } from 'hooks/store.hooks';
import { alertError, alertSuccess } from 'store/uiSlice';
import { IColumn } from 'types/columnTypes';
import { setTitleError } from 'utils/helpers';

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
  const [err, setErr] = useState<string>(' ');
  const [textFieldValue, setTextFieldValue] = useState<string>(inputValue);

  useEffect(() => {
    if (isEditing && input.current) {
      input.current.focus();
    }
  }, [isEditing, input]);

  useEffect(() => {
    setInputValue(value);
  }, [value, setInputValue]);

  const handleChange = (value: string) => {
    setTextFieldValue(value);
    setErr(setTitleError(String(value.length)));
  };

  const handleOk = async () => {
    if (err !== ' ') return;
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

  const handleOpen = () => {
    setEditing(true);
    setTextFieldValue(inputValue);
    setErr(setTitleError(String(inputValue.length)));
  };

  return (
    <Box sx={{ flex: ' 1 1 auto' }}>
      {isEditing ? (
        <Box sx={{ display: 'flex', flexWrap: 'nowrap', alignItems: 'center', mt: 3 }}>
          <TextField
            sx={{ flexGrow: 1, mr: 1 }}
            label={label}
            variant="outlined"
            onChange={(newValue) => {
              handleChange(newValue.target.value);
            }}
            value={textFieldValue}
            error={err !== ' '}
            helperText={err}
            inputRef={input}
          />
          <CheckIcon
            color="action"
            sx={{
              cursor: 'pointer',
              borderRadius: '50%',
              mb: 3,
              p: 1,
              ':hover': {
                color: 'primary.main',
                backgroundColor: '#c2eafc',
              },
            }}
            onClick={handleOk}
          />
          <CloseIcon
            color="action"
            sx={{
              cursor: 'pointer',
              mb: 3,
              p: 1,
              borderRadius: '50%',
              ':hover': {
                color: '#dc5b5b',
                backgroundColor: '#f4d8d8',
              },
            }}
            onClick={() => setEditing(false)}
          />
        </Box>
      ) : (
        <Typography
          variant="h5"
          sx={{
            p: 1,
            // fontSize: 28,
            // whiteSpace: 'nowrap',
            // overflow: 'hidden',
            // textOverflow: 'ellipsis',
            ':hover': {
              cursor: 'pointer',
            },
          }}
          onClick={handleOpen}
        >
          {inputValue}
        </Typography>
      )}
    </Box>
  );
};
