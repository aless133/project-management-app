import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { ModalWindow } from '../ModalWindow';

import { useStoreDispatch } from 'hooks/store.hooks';
import { alertSuccess, alertError } from 'store/uiSlice';
import { getErrorMessage } from 'utils/helpers';

interface ConfirmModalProps {
  isOpen: boolean;
  onAction: () => void;
  onClose: () => void;
}

export const ConfirmModal = ({ isOpen, onAction, onClose }: ConfirmModalProps) => {
  const [t] = useTranslation();
  const dispatch = useStoreDispatch();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      e.stopPropagation();
      if (isOpen && e.key === 'Enter') {
        runOnAction();
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  const runOnAction = async () => {
    try {
      await onAction();
      dispatch(alertSuccess());
      onClose();
    } catch (err) {
      dispatch(alertError(getErrorMessage(err)));
    }
  };

  return (
    <ModalWindow onClose={onClose} open={isOpen} title={t('Are you sure?')}>
      <Box sx={{ p: { md: 4 } }}>
        <Button
          variant="contained"
          fullWidth
          size="large"
          sx={{ mt: 2, fontSize: { xs: 12 } }}
          onClick={runOnAction}
        >
          {t('Confirm')}
        </Button>
        <Button
          color="error"
          variant="outlined"
          fullWidth
          size="large"
          sx={{ mt: 2, fontSize: { xs: 12 } }}
          onClick={onClose}
        >
          {t('Cancel')}
        </Button>
      </Box>
    </ModalWindow>
  );
};
