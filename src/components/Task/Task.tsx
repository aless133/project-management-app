import { Grid, Typography } from '@mui/material';
import { useDeleteTaskMutation } from 'api/tasksApiSlice';
import { useAppContext } from 'app.context';
import { TrashBasket } from 'components/TrashBasket';
import React from 'react';
import { Draggable, DraggableProvided } from 'react-beautiful-dnd';
import { ITask } from 'types/taskTypes';
interface ITaskProps {
  task: ITask;
  boardId: string;
  columnId: string;
  loading: boolean;
  onAction: () => void;
}

export const Task = ({ task, boardId, columnId, loading }: ITaskProps) => {
  const { confirm } = useAppContext();
  const [deleteTask] = useDeleteTaskMutation();

  const handleDeleteTask = (taskId: string) => {
    confirm(async () => {
      const data = {
        boardId: boardId as string,
        columnId: columnId as string,
        taskId,
      };
      return await deleteTask(data).unwrap();
    });
  };

  return (
    <Draggable draggableId={task._id} key={task._id} index={task.order} isDragDisabled={loading}>
      {(providedDragTask: DraggableProvided) => (
        <Grid
          container
          justifyContent="space-between"
          ref={providedDragTask.innerRef}
          {...providedDragTask.draggableProps}
          {...providedDragTask.dragHandleProps}
          sx={{ backgroundColor: '#ebebeb' }}
        >
          <Grid item>
            <Typography variant="h5" component="h5">
              {task.title}
            </Typography>
          </Grid>
          <TrashBasket
            onAction={(e) => {
              e.stopPropagation();
              handleDeleteTask(task._id);
            }}
          />
        </Grid>
      )}
    </Draggable>
  );
};
