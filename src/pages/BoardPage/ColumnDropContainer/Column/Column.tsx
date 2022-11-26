import React, { FC, useState } from 'react';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { useTranslation } from 'react-i18next';
import { InlineTextField } from 'pages/BoardPage/ColumnDropContainer/Column/InlineTextField';
import { IColumn, IColumnParams } from 'types/columnTypes';
import { TrashBasket } from 'components/UI/TrashBasket';
import { useGetColumnTasksQuery, useCreateTaskMutation } from 'api/tasksApiSlice';
import { FormModal } from 'components/UI/FormModal';
import { useStoreDispatch, useStoreSelector } from 'hooks/store.hooks';
import { selectUser } from 'store/userSlice';
import { alertError, alertSuccess } from 'store/uiSlice';
import { getErrorMessage } from 'utils/helpers';
import { Box } from '@mui/material';
import { useDeleteColumnMutation, useUpdateColumnMutation } from 'api/columnsApiSlice';
import {
  Droppable,
  DroppableProvided,
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
} from 'react-beautiful-dnd';
import { Task } from 'pages/BoardPage/Task';
import { DragDrop } from 'utils/constants';
import { useAppContext } from 'app.context';
import { ITaskPropsData } from 'types/taskTypes';

interface IColumnProps {
  column: IColumn;
  openTaskModal: (data: ITaskPropsData) => void;
  loading: boolean;
  index: number; //need this if data from server is incorrect
}

export const Column: FC<IColumnProps> = ({ column, loading, openTaskModal, index }) => {
  const [t] = useTranslation();
  const user = useStoreSelector(selectUser);
  const [isFormModal, setFormModal] = useState(false);
  const dispatch = useStoreDispatch();
  const { data: tasks, isLoading } = useGetColumnTasksQuery({
    boardId: column.boardId as string,
    columnId: column._id,
  });
  const [createTask] = useCreateTaskMutation();
  const [updateColumn] = useUpdateColumnMutation();

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
        users: [user.id] as string[],
      };

      createTask({ boardId: column.boardId, columnId: column._id, data })
        .unwrap()
        .then(() => {
          dispatch(alertSuccess());
          setFormModal(false);
        })
        .catch((err) => {
          dispatch(alertError(getErrorMessage(err)));
        });
    }
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

  // if (isFetching) {
  //   return <Spinner />;
  // }

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
    <Draggable draggableId={column._id} key={column._id} index={index} isDragDisabled={loading}>
      {(providedDragColumn: DraggableProvided, snapshotDragColumn: DraggableStateSnapshot) => (
        <Paper
          className="h100-f"
          elevation={3}
          ref={providedDragColumn.innerRef}
          {...providedDragColumn.draggableProps}
          {...providedDragColumn.dragHandleProps}
          sx={{
            width: 300,
            flexShrink: 0,
            overflow: 'hidden',
            backgroundColor: snapshotDragColumn.isDragging ? 'rgba(233,255,255,.3)' : 'inherit',
          }}
        >
          {/*column title    */}
          <Box sx={{ display: 'flex', alignItems: 'center', px: 1, backgroundColor: '#ddd' }}>
            <InlineTextField label={t('Title')} value={column.title} handleSave={handleSave} />
            <TrashBasket onAction={() => handleDeleteColumn(column._id)} />
          </Box>

          {/*column tasks*/}
          <Droppable
            key={column._id}
            type={DragDrop.TASK}
            direction="vertical"
            droppableId={column._id}
            isCombineEnabled={false}
          >
            {(providedDropTask: DroppableProvided) => (
              <Box
                className="h100-i"
                sx={{ px: 1, overflowY: 'auto', minHeight: 2 }}
                ref={providedDropTask.innerRef}
                {...providedDropTask.droppableProps}
              >
                {tasks &&
                  tasks
                    .slice(0)
                    .sort((a, b) => a.order - b.order)
                    .map((task, index) => (
                      <Task
                        key={task._id}
                        task={task}
                        index={index}
                        loading={isLoading}
                        openTaskModal={openTaskModal}
                        onAction={() => {}}
                      />
                    ))}
                {providedDropTask.placeholder}
              </Box>
            )}
          </Droppable>
          {/* end tasks */}

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
