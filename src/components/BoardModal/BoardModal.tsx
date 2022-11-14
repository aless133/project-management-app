import { Box, Button, TextField } from '@mui/material';
import { useCreateBoardMutation } from 'api/boardsApiSlice';
import { ModalWindow } from 'components/UI/ModalWindow';
import { useStoreDispatch, useStoreSelector } from 'hooks/store.hooks';
import React, { useState, FC } from 'react';
import { useTranslation } from 'react-i18next';
import { selectUser } from 'store/userSlice';
import { TErr, TValidator } from 'types';
import { IBoard } from 'types/boardTypes';
import { Constants } from 'utils';
import { setCreateTitleError, validateMaxLength, validateRequiredField } from 'utils/helpers';
import { LoadingButton } from '@mui/lab';
import { addAlert } from 'store/uiSlice';
import { NotifierText, NotifierType } from 'types/NotifierTypes';

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
}

type TFormData = { boardTitle: string };

export const BoardModal: FC<IBoardModalProps> = ({ openModal, closeModal }) => {
  const [errStack, setErrStack] = useState<TErr>(err);
  const [isDisabledSubmitBtn, setIsDisabledSubmitBtn] = useState<boolean>(false);
  const { t } = useTranslation();
  const { id } = useStoreSelector(selectUser);
  const [createBoard] = useCreateBoardMutation();
  const [value, setValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useStoreDispatch();

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
        setIsLoading(true);
        const answer = await createBoard(data).unwrap();
        if (answer?._id) {
          dispatch(
            addAlert({ type: NotifierType.SUCCESS, open: true, text: NotifierText.SUCCESS })
          );
        }
      } catch (err) {
        dispatch(addAlert({ type: NotifierType.ERROR, open: true, text: NotifierText.ERROR }));
      } finally {
        setIsLoading(false);
        closeBoardModal();
      }
    } else {
      setIsDisabledSubmitBtn(true);
    }
  };

  return (
    <ModalWindow onClose={closeBoardModal} open={openModal} title={t('Create Board')}>
      <Box sx={{ width: { lg: '20vw' }, p: { lg: 2 } }}>
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
          <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: 2 }}>
            <LoadingButton
              loading={isLoading}
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              disabled={isDisabledSubmitBtn}
              sx={{ mt: 2 }}
            >
              {t('Create Board')}
            </LoadingButton>
            <Button
              type="reset"
              size="large"
              variant="outlined"
              fullWidth
              color="error"
              onClick={closeBoardModal}
            >
              {t('Cancel')}
            </Button>
          </Box>
        </form>
      </Box>
    </ModalWindow>
  );
};
