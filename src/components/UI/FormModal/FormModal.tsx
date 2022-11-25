import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useFormSign } from 'hooks/formSign.hook';
import { setMinMaxLengthError } from 'utils/helpers';
import { ModalWindow } from '../ModalWindow';
import { useKeyDown } from 'hooks/keydown';

interface FormModalProps {
  isOpen: boolean;
  title: string;
  description?: boolean;
  onClose: () => void;
  onAction: (data: { name: string; login?: string } | undefined) => void;
  labelText?: string;
}

export const FormModal = ({
  isOpen,
  onClose,
  title,
  description = false,
  onAction,
  labelText,
}: FormModalProps) => {
  const { errStack, handleChange, getFieldsColumn } = useFormSign(false);
  const [t] = useTranslation();

  useKeyDown('Escape', () => (isOpen ? onClose() : null));

  return (
    <ModalWindow onClose={onClose} open={isOpen} title={t(title)}>
      <form
        onSubmit={(e) => onAction(getFieldsColumn(e))}
        onChange={handleChange}
        style={{ width: '100%' }}
      >
        <TextField
          error={!!errStack.name}
          name="name"
          autoFocus
          fullWidth
          label={labelText ? labelText : t('Task Title')}
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
