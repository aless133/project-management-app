import { Box, Button, TextField } from '@mui/material';
import { useCreateBoardMutation, useUpdateBoardMutation } from 'api/boardsApiSlice';
import { ModalWindow } from 'components/UI/ModalWindow';
import { useStoreDispatch, useStoreSelector } from 'hooks/store.hooks';
import React, { useState, FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { selectUser } from 'store/userSlice';
import { TErr, TValidator } from 'types';
import { IBoardData, IBoardParams } from 'types/boardTypes';
import { Constants } from 'utils';
import { setCreateTitleError, validateMaxLength, validateRequiredField } from 'utils/helpers';
import { LoadingButton } from '@mui/lab';
import { alertError, alertSuccess } from 'store/uiSlice';
import { getErrorMessage } from 'utils/helpers';

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
  mode: 'update' | 'create';
  boardId?: string;
  boardTitle?: string;
}

type TFormData = { boardTitle: string };

export const BoardModal: FC<IBoardModalProps> = ({
  openModal,
  closeModal,
  mode,
  boardId,
  boardTitle,
}) => {
  const [errStack, setErrStack] = useState<TErr>(err);
  const [isDisabledSubmitBtn, setIsDisabledSubmitBtn] = useState<boolean>(false);
  const { t } = useTranslation();
  const { id } = useStoreSelector(selectUser);
  const [createBoard] = useCreateBoardMutation();
  const [updateBoard] = useUpdateBoardMutation();
  const [value, setValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useStoreDispatch();

  useEffect(() => {
    if (boardTitle) {
      setValue(boardTitle);
    }
  }, [boardTitle, openModal]);

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
        setIsLoading(true);
        const dataForm = Object.fromEntries(formData.entries()) as TFormData;
        if (mode === 'create') {
          const data: IBoardData = {
            title: dataForm.boardTitle,
            owner: id as string,
            users: [],
          };
          await createBoard(data).unwrap();
        } else {
          const data: IBoardParams = {
            boardId: boardId as string,
            data: {
              title: dataForm.boardTitle,
              owner: id as string,
              users: [],
            },
          };
          await updateBoard(data).unwrap();
        }
        dispatch(alertSuccess());
        closeBoardModal();
      } catch (err) {
        dispatch(alertError(getErrorMessage(err)));
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsDisabledSubmitBtn(true);
    }
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        closeBoardModal();
      }
    };
    document.addEventListener('keydown', handleEsc);

    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  });

  return (
    <ModalWindow
      onClose={closeBoardModal}
      open={openModal}
      title={mode === 'create' ? t('Create Board') : t('Update Board')}
    >
      <Box sx={{ width: { lg: '20vw' }, p: { lg: 2 } }}>
        <form onSubmit={handleSubmit} onChange={handleChange}>
          <TextField
            name={Constants.BOARD_TITLE}
            fullWidth
            autoFocus
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
              {mode === 'create' ? t('Create Board') : t('Update Board')}
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
