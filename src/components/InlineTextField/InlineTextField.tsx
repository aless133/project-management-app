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
  openTextField: boolean;
}

export const InlineTextField = ({
  label,
  value,
  handleSave,
  openTextField,
}: IInlineTextFieldProps) => {
  const [inputValue, setInputValue] = useState<string>(value);
  const [isEditing, setEditing] = useState<boolean>(false);
  const input = useRef<HTMLInputElement>(null);
  const dispatch = useStoreDispatch();
  const [err, setErr] = useState<string>(' ');
  const [textFieldValue, setTextFieldValue] = useState<string>(inputValue);

  useEffect(() => {
    if (openTextField) {
      setEditing(true);
    }
  }, [openTextField]);

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

  return (
    <Box sx={{}}>
      {isEditing ? (
        <Box sx={{ display: 'flex', flexWrap: 'nowrap', alignItems: 'center' }}>
          <TextField
            sx={{ flexGrow: 1 }}
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
