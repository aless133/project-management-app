import { Button, TextField } from '@mui/material';
// import { useCreateBoardMutation } from 'api/boardsApiSlice';
import { ModalWindow } from 'components/UI/ModalWindow';
import React, { useState, FC } from 'react';
import { useTranslation } from 'react-i18next';
import { TErr, TValidator } from 'types';
import { Constants } from 'utils';
import {
  setCreateRequiredError,
  setCreateTitleError,
  validateMaxLength,
  validateMinLength,
  validateRequiredField,
} from 'utils/helpers';

const validator: TValidator = {
  [Constants.BOARD_TITLE]: [
    validateRequiredField(Constants.REQUIRED_LENGTH),
    validateMaxLength(Constants.MAX_LENGTH),
  ],
  [Constants.BOARD_DESCRIPTION]: [validateMinLength(Constants.MIN_LENGTH)],
};

const err: TErr = {
  [Constants.BOARD_TITLE]: '',
  [Constants.BOARD_DESCRIPTION]: '',
};

interface BoardModalProps {
  openModal: boolean;
  closeModal: () => void;
}

export const BoardModal: FC<BoardModalProps> = ({ openModal, closeModal }) => {
  const [errStack, setErrStack] = useState<TErr>(err);
  const [isDisabledSubmitBtn, setIsDisabledSubmitBtn] = useState<boolean>(false);
  const { t } = useTranslation();
  // const [createBoard] = useCreateBoardMutation();

  const closeBoardModal = () => {
    setErrStack({
      [Constants.BOARD_TITLE]: '',
      [Constants.BOARD_DESCRIPTION]: '',
    });
    setCreateTitleError('');
    setCreateRequiredError('');
    setIsDisabledSubmitBtn(false);
    closeModal();
  };

  const handleChange: React.ChangeEventHandler<HTMLFormElement> = (e) => {
    const { name, value } = e.target;
    if (typeof value === 'string') {
      err[name] = validator[name].reduce((acc, fn) => (acc += fn(value)), '');
      setErrStack({ ...err });

      if (Object.values(err).every((err) => !err)) {
        setIsDisabledSubmitBtn(false);
      } else {
        setIsDisabledSubmitBtn(true);
      }
    }
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    for (const [name, value] of formData.entries()) {
      if (typeof value === 'string') {
        err[name] = validator[name].reduce((acc, fn) => (acc += fn(value)), '');
      }
      setErrStack(err);
    }

    if (Object.values(err).every((err) => err === '')) {
      // const dataForm = Object.fromEntries(formData.entries());
      // TO DO add POST method for create board
      closeBoardModal();
    } else {
      setIsDisabledSubmitBtn(true);
    }
  };

  return (
    <ModalWindow onClose={closeBoardModal} open={openModal} title={t('Create Board')}>
      <form onSubmit={handleSubmit} onChange={handleChange}>
        <TextField
          name={Constants.BOARD_TITLE}
          fullWidth
          label={t('Title')}
          error={!!errStack.boardTitle}
          helperText={setCreateTitleError(errStack.boardTitle)}
          defaultValue=""
          margin="normal"
        />

        <TextField
          name={Constants.BOARD_DESCRIPTION}
          fullWidth
          label={t('Description')}
          error={!!errStack.boardDescription}
          defaultValue=""
          helperText={setCreateRequiredError(errStack.boardDescription)}
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          size="large"
          disabled={isDisabledSubmitBtn}
          sx={{ mt: 2 }}
        >
          {t('Create Board')}
        </Button>
      </form>
    </ModalWindow>
  );
};
