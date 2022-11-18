import { Grid, Typography } from '@mui/material';
import { TrashBasket } from 'components/TrashBasket';
import React from 'react';
import { Draggable, DraggableProvided } from 'react-beautiful-dnd';
import { ITask } from 'types/taskTypes';
interface ITaskProps {
  task: ITask;
  loading: boolean;
  onAction: () => void;
}

export const Task = ({ task, loading, onAction }: ITaskProps) => {
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
          <TrashBasket onAction={onAction} />
        </Grid>
      )}
    </Draggable>
  );
};
