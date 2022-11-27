import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useFormSign } from 'hooks/formSign.hook';
import { setMinMaxLengthError } from 'utils/helpers';
import { ModalWindow } from '../ModalWindow';
import { useKeyDown } from 'hooks/keydown';
import { Constants, isErrCheck } from 'utils';
import LoadingButton from '@mui/lab/LoadingButton';
import CircularProgress from '@mui/material/CircularProgress';

interface FormModalProps {
  isOpen: boolean;
  title: string;
  description?: boolean;
  onClose: () => void;
  onAction: (data: { name: string; login?: string } | undefined) => void;
  labelText?: string;
  loading: boolean;
}

export const FormModal = ({
  isOpen,
  onClose,
  title,
  description = false,
  onAction,
  labelText,
  loading,
}: FormModalProps) => {
  const { errStack, handleChange, getFieldsColumn } = useFormSign(false);
  const [t] = useTranslation();

  useKeyDown('Escape', () => (isOpen ? onClose() : null));

  console.log(errStack);
  console.log(isErrCheck(errStack));

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
            name={Constants.TASK_DESCRIPTION}
            fullWidth
            multiline
            minRows={4}
            maxRows={4}
            label={t('Description')}
            margin="normal"
            error={!!errStack.taskDescription}
            helperText={setMinMaxLengthError(errStack.taskDescription)}
          />
        )}
        <LoadingButton
          type="submit"
          variant="contained"
          fullWidth
          size="large"
          sx={{ mt: 2, fontSize: { xs: 12, sm: 16 } }}
          // disabled={isDisabled}
          loading={loading}
          disabled={isErrCheck(errStack)}
          loadingIndicator={<CircularProgress color="primary" size={25} />}
        >
          {t('Confirm')}
        </LoadingButton>
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
