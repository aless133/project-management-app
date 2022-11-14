import React from 'react';
import i18next from 'i18next';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

interface NotifyerProps {
  open: boolean;
  text: string;
  type: 'success' | 'error';
  onclose: (msg: 'success' | 'error') => void;
}

export const Notifyer = ({ open, onclose, type, text }: NotifyerProps) => {
  return (
    <Snackbar
      sx={{ mt: 8 }}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={open}
      autoHideDuration={3000}
      onClose={() => onclose(type)}
    >
      <Alert
        onClose={() => onclose(type)}
        severity={type === 'success' ? 'success' : 'error'}
        sx={{ width: '100%' }}
      >
        {i18next.t(text)}
      </Alert>
    </Snackbar>
  );
};
