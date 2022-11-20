import React, { FC, useState } from 'react';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { useTranslation } from 'react-i18next';
import { InlineTextField } from 'components/InlineTextField';
import { IColumn, IColumnParams } from 'types/columnTypes';
import { TrashBasket } from 'components/TrashBasket';
import {
  useGetColumnsTaskQuery,
  useCreateTaskMutation,
  useDeleteTaskMutation,
} from 'api/tasksApiSlice';
import { FormModal } from 'components/UI/FormModal';
import { useStoreDispatch, useStoreSelector } from 'hooks/store.hooks';
import { selectUser } from 'store/userSlice';
import { alertError, alertSuccess } from 'store/uiSlice';
import { getErrorMessage } from 'utils/helpers';
import { Box, Grid, IconButton, Typography } from '@mui/material';
import { Spinner } from 'components/Spinner';
import { useDeleteColumnMutation, useUpdateColumnMutation } from 'api/columnsApiSlice';
import { useAppContext } from 'app.context';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import { ITask, ITaskPropsData } from 'types/taskTypes';

interface IColumnProps {
  column: IColumn;
  openTaskModal: (data: ITaskPropsData) => void;
}

export const Column: FC<IColumnProps> = ({ column, openTaskModal }) => {
  const [t] = useTranslation();
  const user = useStoreSelector(selectUser);
  const [isFormModal, setFormModal] = useState(false);
  const dispatch = useStoreDispatch();

  const { data: tasks, isFetching } = useGetColumnsTaskQuery({
    boardId: column.boardId as string,
    columnId: column._id,
  });
  const [createTask] = useCreateTaskMutation();
  const [updateColumn] = useUpdateColumnMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const { confirm } = useAppContext();
  const [deleteColumn] = useDeleteColumnMutation();

  const addTask = (fields: { name: string; login?: string } | undefined) => {
    if (fields?.name && fields.login) {
      const order = (tasks && tasks.length) || 0;
      const data = {
        title: fields?.name,
        order,
        description: fields.login,
        userId: user.id,
        users: [user.name] as string[],
      };

      createTask({ boardId: column.boardId, columnId: column._id, data })
        .unwrap()
        .then(() => dispatch(alertSuccess()))
        .catch((err) => {
          dispatch(alertError(getErrorMessage(err)));
        });

      setFormModal(false);
    }
  };

  if (isFetching) {
    return <Spinner />;
  }

  const handleSave = async (value: string) => {
    const requestObj: IColumnParams = {
      boardId: column.boardId as string,
      columnId: column._id as string,
      data: {
        title: value,
        order: column.order,
      },
    };
    const resp = await updateColumn(requestObj).unwrap();
    return resp;
  };

  const handleDeleteTask = (taskId: string) => {
    confirm(async () => {
      const data = {
        boardId: column.boardId as string,
        columnId: column._id as string,
        taskId,
      };
      return await deleteTask(data).unwrap();
    });
  };

  const handleDeleteColumn = (columnId: string) => {
    confirm(async () => {
      const data = {
        boardId: column.boardId,
        columnId,
      };
      return await deleteColumn(data).unwrap();
    });
  };

  const handleOpenTaskModal = (taskData: ITask, columnData: IColumn) => {
    const data: ITaskPropsData = {
      title: taskData.title,
      description: taskData.description,
      boardId: columnData.boardId,
      columnId: columnData._id,
      taskId: taskData._id,
      order: taskData.order,
    };
    openTaskModal(data);
  };

  return (
    <Paper elevation={3}>
      <InlineTextField label={t('Title')} value={column.title} handleSave={handleSave} />
      <TrashBasket onAction={() => handleDeleteColumn(column._id)} />
      {tasks &&
        tasks.map((task) => (
          <Grid
            container
            key={task._id}
            justifyContent="space-between"
            sx={{ backgroundColor: '#ebebeb' }}
          >
            <Grid item>
              <Typography variant="h5" component="h5">
                {task.title}
              </Typography>
            </Grid>
            <Box sx={{ display: 'flex', alignItems: 'center', columnGap: 0.5 }}>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenTaskModal(task, column);
                }}
                sx={{
                  color: 'gray',
                  ':hover': {
                    color: 'primary.main',
                    backgroundColor: '#c2eafc',
                  },
                  transition: '0.3s',
                }}
              >
                <ModeEditOutlineOutlinedIcon />
              </IconButton>
              <TrashBasket
                onAction={(e) => {
                  e.stopPropagation();
                  handleDeleteTask(task._id);
                }}
              />
            </Box>
          </Grid>
        ))}
      <Button
        variant="contained"
        color="secondary"
        fullWidth
        sx={{ mt: 2 }}
        onClick={() => setFormModal(true)}
      >
        {t('Add task')}
      </Button>
      <FormModal
        title="Add task"
        isOpen={isFormModal}
        description={true}
        onClose={() => setFormModal(false)}
        onAction={addTask}
      />
    </Paper>
  );
};
