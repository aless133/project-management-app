import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import { ModalWindow } from '../ModalWindow';
import { TextField } from '@mui/material';
import { useFormSign } from 'hooks/formSign.hook';
import { setMinMaxLengthError } from 'utils/helpers';
import { useTranslation } from 'react-i18next';

interface FormModalProps {
  isOpen: boolean;
  title: string;
  description?: boolean;
  onAction: () => void;
  onClose: () => void;
}

export const FormModal = ({
  isOpen,
  onAction,
  onClose,
  title,
  description = false,
}: FormModalProps) => {
  const { errStack, handleChange } = useFormSign(false);
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
    <ModalWindow onClose={onClose} open={isOpen} title={t(title)}>
      <form onSubmit={onAction} onChange={handleChange} style={{ width: '100%' }}>
        <TextField
          error={!!errStack.name}
          name="name"
          fullWidth
          label={t('Task Title')}
          defaultValue=""
          helperText={setMinMaxLengthError(errStack.name)}
          margin="normal"
        />
        {description && (
          <TextField
            error={!!errStack.login}
            name="login"
            fullWidth
            label={t('Task Description')}
            defaultValue=""
            helperText={setMinMaxLengthError(errStack.login)}
            margin="normal"
          />
        )}
        <Button
          type="submit"
          variant="contained"
          fullWidth
          size="large"
          sx={{ mt: 2, fontSize: { xs: 12, sm: 16 } }}
        >
          {t('Confirm')}
        </Button>
        <Button
          color="error"
          variant="outlined"
          fullWidth
          size="large"
          sx={{ mt: 2, fontSize: { xs: 12, sm: 16 } }}
          onClick={onClose}
        >
          {t('Cancel')}
        </Button>
      </form>
    </ModalWindow>
  );
};
