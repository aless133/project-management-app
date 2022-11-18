import React, { FC, useState } from 'react';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { useTranslation } from 'react-i18next';
import { InlineTextField } from 'components/InlineTextField';
import { IColumn, IColumnParams } from 'types/columnTypes';
import { TrashBasket } from 'components/TrashBasket';
import { useGetColumnsTaskQuery, useCreateTaskMutation } from 'api/tasksApiSlice';
import { FormModal } from 'components/UI/FormModal';
import { useStoreDispatch, useStoreSelector } from 'hooks/store.hooks';
import { selectUser } from 'store/userSlice';
import { alertError, alertSuccess } from 'store/uiSlice';
import { getErrorMessage } from 'utils/helpers';
import { Box } from '@mui/material';
import { Spinner } from 'components/Spinner';
import { useUpdateColumnMutation } from 'api/columnsApiSlice';
import {
  Draggable,
  DraggableStateSnapshot,
  Droppable,
  DroppableProvided,
} from 'react-beautiful-dnd';
import { Task } from 'components/Task';

interface IColumnProps {
  column: IColumn;
  onSetColumnId: (id: string) => void;
  loading: boolean;
}

export const Column: FC<IColumnProps> = ({ column, onSetColumnId, loading }) => {
  const [t] = useTranslation();
  const user = useStoreSelector(selectUser);
  const [isFormModal, setFormModal] = useState(false);
  const dispatch = useStoreDispatch();

  const {
    data: tasks,
    isFetching,
    isLoading,
  } = useGetColumnsTaskQuery({
    boardId: column.boardId as string,
    columnId: column._id,
  });
  const [createTask] = useCreateTaskMutation();
  const [updateColumn] = useUpdateColumnMutation();

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

  return (
    <Draggable
      draggableId={column._id}
      key={column._id}
      index={column.order}
      isDragDisabled={loading}
    >
      {(providedDragColumn, snapshotDragColum: DraggableStateSnapshot) => (
        <Paper
          elevation={3}
          ref={providedDragColumn.innerRef}
          {...providedDragColumn.draggableProps}
          {...providedDragColumn.dragHandleProps}
          sx={{
            backgroundColor: snapshotDragColum.isDragging ? 'lightgray' : 'inherit',
            userSelect: 'none',
          }}
        >
          <InlineTextField label={t('Title')} value={column.title} handleSave={handleSave} />
          <TrashBasket onAction={() => onSetColumnId(column._id)} />

          {tasks &&
            tasks
              .slice(0)
              .sort((a, b) => a.order - b.order)
              .map((task) => {
                // console.log('task', task);

                return (
                  <Droppable
                    key={task._id}
                    type="TASK"
                    direction="vertical"
                    droppableId={column._id}
                  >
                    {(
                      providedDropTask: DroppableProvided
                      // providerDropSnapshot: DroppableStateSnapshot
                    ) => (
                      <Box
                        key={task._id}
                        ref={providedDropTask.innerRef}
                        {...providedDropTask.droppableProps}
                        sx={{ maxHeight: 40 }}
                      >
                        <Task key={task._id} task={task} loading={isLoading} onAction={() => {}} />
                        {providedDropTask.placeholder}
                      </Box>
                    )}
                  </Droppable>
                );
              })}

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
      )}
    </Draggable>
  );
};
