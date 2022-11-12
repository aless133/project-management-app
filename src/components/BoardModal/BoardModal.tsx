import { Button, TextField } from '@mui/material';
import { useCreateBoardMutation } from 'api/boardsApiSlice';
import { ModalWindow } from 'components/UI/ModalWindow';
import { useStoreSelector } from 'hooks/store.hooks';
import React, { useState, FC } from 'react';
import { useTranslation } from 'react-i18next';
import { selectUser } from 'store/userSlice';
import { TErr, TValidator } from 'types';
import { IBoard } from 'types/boardTypes';
import { Constants } from 'utils';
import { setCreateTitleError, validateMaxLength, validateRequiredField } from 'utils/helpers';

const validator: TValidator = {
  [Constants.BOARD_TITLE]: [
    validateRequiredField(Constants.REQUIRED_LENGTH),
    validateMaxLength(Constants.MAX_LENGTH),
  ],
};

const err: TErr = {
  [Constants.BOARD_TITLE]: '',
};

interface IBoardModalProps {
  openModal: boolean;
  closeModal: () => void;
  openAlertSuccess: () => void;
  openAlertError: () => void;
}

type TFormData = { boardTitle: string };

export const BoardModal: FC<IBoardModalProps> = ({
  openModal,
  closeModal,
  openAlertSuccess,
  openAlertError,
}) => {
  const [errStack, setErrStack] = useState<TErr>(err);
  const [isDisabledSubmitBtn, setIsDisabledSubmitBtn] = useState<boolean>(false);
  const { t } = useTranslation();
  const { id } = useStoreSelector(selectUser);
  const [createBoard] = useCreateBoardMutation();
  const [value, setValue] = useState<string>('');

  const clearForm = () => {
    setErrStack({
      [Constants.BOARD_TITLE]: '',
    });
    setCreateTitleError('');
    setIsDisabledSubmitBtn(false);
    setValue('');
  };

  const closeBoardModal = () => {
    clearForm();
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
      try {
        const dataForm = Object.fromEntries(formData.entries()) as TFormData;
        const data: IBoard = {
          title: dataForm.boardTitle,
          owner: id as string,
          users: [],
        };
        const answer = await createBoard(data).unwrap();
        if (answer?._id) {
          openAlertSuccess();
        }
      } catch (err) {
        openAlertError();
      } finally {
        closeBoardModal();
      }
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
          onChange={(newValue) => {
            setValue(newValue.target.value);
          }}
          value={value}
          label={t('Title')}
          error={!!errStack.boardTitle}
          helperText={setCreateTitleError(errStack.boardTitle)}
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
