import { Box, Button } from '@mui/material';
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
      e.stopPropagation();
      if (isOpen && e.key === 'Enter') {
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
      <Box sx={{ p: { md: 4 } }}>
        <Button
          variant="contained"
          fullWidth
          size="large"
          sx={{ mt: 2, fontSize: { xs: 12 } }}
          onClick={onAction}
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
