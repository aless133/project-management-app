import { LoadingButton } from '@mui/lab';
import { Box, Button, TextField } from '@mui/material';
import { useUpdateTaskMutation } from 'api/tasksApiSlice';
import { ModalWindow } from 'components/UI/ModalWindow';
import { useStoreDispatch, useStoreSelector } from 'hooks/store.hooks';
import React, { FC, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { alertError, alertSuccess } from 'store/uiSlice';
import { selectUser } from 'store/userSlice';
import { TErr, TValidator } from 'types';
import { ITaskParams, ITaskPropsData } from 'types/taskTypes';
import { Constants, validateMaxLength, validateMinLength } from 'utils';
import { getErrorMessage, setMinMaxLengthError } from 'utils/helpers';

const err: TErr = {
  [Constants.TASK_TITLE]: '',
  [Constants.TASK_DESCRIPTION]: '',
};

const validator: TValidator = {
  [Constants.TASK_TITLE]: [
    validateMinLength(Constants.MIN_LENGTH),
    validateMaxLength(Constants.MAX_LENGTH),
  ],
  [Constants.TASK_DESCRIPTION]: [validateMinLength(Constants.MIN_LENGTH)],
};

interface ITaskModal {
  openModal: boolean;
  closeTaskModal: () => void;
  data: ITaskPropsData;
}

export const TaskModal: FC<ITaskModal> = ({ openModal, closeTaskModal, data }) => {
  const [errStack, setErrStack] = useState<TErr>(err);
  const { t } = useTranslation();
  const [value1, setValue1] = useState<string>('');
  const [value2, setValue2] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDisabledSubmitBtn, setIsDisabledSubmitBtn] = useState<boolean>(false);
  const dispatch = useStoreDispatch();
  const [updateTask] = useUpdateTaskMutation();
  const { id } = useStoreSelector(selectUser);

  useEffect(() => {
    if (openModal) {
      setValue1(data.title);
      setValue2(data.description);
    }
  }, [data.description, data.title, openModal]);

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
        const taskData: ITaskParams = {
          boardId: data.boardId,
          columnId: data.columnId,
          taskId: data.taskId,
          data: {
            title: value1,
            order: data.order,
            description: value2,
            columnId: data.columnId,
            userId: id,
            users: [],
          },
        };
        setIsLoading(true);
        await updateTask(taskData).unwrap();
        dispatch(alertSuccess());
        closeTaskModal();
      } catch (err) {
        dispatch(alertError(getErrorMessage(err)));
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsDisabledSubmitBtn(true);
    }
  };

  return (
    <ModalWindow onClose={closeTaskModal} open={openModal} title={t('Update task')}>
      <Box sx={{ width: { lg: '20vw' }, p: { lg: 2 } }}>
        <form onSubmit={handleSubmit} onChange={handleChange}>
          <TextField
            name={Constants.TASK_TITLE}
            fullWidth
            autoFocus
            onChange={(newValue) => {
              setValue1(newValue.target.value);
            }}
            value={value1}
            label={t('Title')}
            error={!!errStack.taskTitle}
            helperText={setMinMaxLengthError(errStack.taskTitle)}
            margin="normal"
          />
          <TextField
            name={Constants.TASK_DESCRIPTION}
            fullWidth
            onChange={(newValue) => {
              setValue2(newValue.target.value);
            }}
            multiline
            maxRows={4}
            value={value2}
            label={t('Description')}
            error={!!errStack.taskDescription}
            helperText={setMinMaxLengthError(errStack.taskDescription)}
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
              {t('Update task')}
            </LoadingButton>
            <Button
              type="reset"
              size="large"
              variant="outlined"
              fullWidth
              color="error"
              onClick={closeTaskModal}
            >
              {t('Cancel')}
            </Button>
          </Box>
        </form>
      </Box>
    </ModalWindow>
  );
};
