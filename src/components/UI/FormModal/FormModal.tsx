import React, { FormEvent, KeyboardEvent, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useFormSign } from 'hooks/formSign.hook';
import { setMinMaxLengthError } from 'utils/helpers';
import { ModalWindow } from '../ModalWindow';
import { setAlert } from 'store/uiSlice';
import { NotifierText, NotifierType } from 'types/NotifierTypes';
import { useStoreDispatch } from 'hooks/store.hooks';

interface FormModalProps {
  isOpen: boolean;
  title: string;
  description?: boolean;
  onClose: () => void;
  onAction: (data: { name: string; login?: string } | undefined) => void;
}

export const FormModal = ({
  isOpen,
  onClose,
  title,
  description = false,
  onAction,
}: FormModalProps) => {
  const { errStack, handleChange, getFieldsColumn } = useFormSign(false);
  const [t] = useTranslation();

  // useEffect(() => {
  //   const handleKeyDown = (e: KeyboardEvent): void => {
  //     e.stopPropagation();
  //     if (isOpen && e.key === 'Enter') {
  //       onAction();
  //     }
  //   };
  //   document.addEventListener('keydown', handleKeyDown);

  //   return () => {
  //     document.removeEventListener('keydown', handleKeyDown);
  //   };
  // });

  // const runOnAction = async (e: FormEvent) => {
  //   try {
  //     await onAction(e);
  //     dispatch(setAlert({ type: NotifierType.SUCCESS, text: NotifierText.SUCCESS }));
  //     onClose();
  //   } catch (err) {
  //     dispatch(setAlert({ type: NotifierType.ERROR, text: NotifierText.ERROR }));
  //   }
  // };

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
