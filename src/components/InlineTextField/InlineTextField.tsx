import React, { useEffect, useState, useRef } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
// import { addAlert } from 'store/uiSlice';
// import { useStoreDispatch } from 'hooks/store.hooks';
// import { NotifierText, NotifierType } from 'types/NotifierTypes';

interface IInlineTextFieldProps {
  label: string;
  value: string;
  handleSave: (value: string) => void;
}

export const InlineTextField = ({ label, value, handleSave }: IInlineTextFieldProps) => {
  const [isEditing, setEditing] = useState<boolean>(false);
  const input = useRef<HTMLInputElement>(null);
  // const dispatch = useStoreDispatch();

  useEffect(() => {
    if (isEditing && input.current) {
      input.current.focus();
    }
  }, [isEditing, input]);

  const handleOk = async () => {
    const value1 = input.current ? input.current.value : '';
    try {
      await handleSave(value1);
      setEditing(false);
    } catch (e) {
      // dispatch(addAlert({ type: NotifierType.ERROR, text: NotifierText.ERROR }));
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
            defaultValue={value}
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
        <Typography variant="h3" onClick={() => setEditing(true)}>
          {value}
        </Typography>
      )}
    </Box>
  );
};
