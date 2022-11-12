import { LoadingButton } from '@mui/lab';
import { Button, CircularProgress } from '@mui/material';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ModalWindow } from '../ModalWindow';

interface ConfirmModalProps {
  isOpen: boolean;
  onAction: () => void;
  onClose: () => void;
}

export const ConfirmModal = ({ isOpen, onAction, onClose }: ConfirmModalProps) => {
  const [t] = useTranslation();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === 'Enter') {
        onAction();
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  return (
    <ModalWindow onClose={onClose} open={isOpen} title={t('You sure?')}>
      <LoadingButton
        loading={false}
        loadingIndicator={<CircularProgress color="primary" size={25} />}
        variant="contained"
        fullWidth
        size="large"
        sx={{ mt: 2 }}
        onClick={onAction}
      >
        {t('Confirm')}
      </LoadingButton>
      <Button
        color="error"
        variant="outlined"
        fullWidth
        size="large"
        sx={{ mt: 2 }}
        onClick={onClose}
      >
        {t('Cancel')}
      </Button>
    </ModalWindow>
  );
};
