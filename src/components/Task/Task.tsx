import { Box, Grid, IconButton, Typography } from '@mui/material';
import { useDeleteTaskMutation } from 'api/tasksApiSlice';
import { useAppContext } from 'app.context';
import { TrashBasket } from 'components/TrashBasket';
import React from 'react';
import { Draggable, DraggableProvided } from 'react-beautiful-dnd';
import { ITask, ITaskPropsData } from 'types/taskTypes';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';

interface ITaskProps {
  task: ITask;
  boardId: string;
  columnId: string;
  loading: boolean;
  onAction: () => void;
  openTaskModal: (data: ITaskPropsData) => void;
}

export const Task = ({ task, boardId, columnId, loading, openTaskModal }: ITaskProps) => {
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

  const handleOpenTaskModal = () => {
    const taskData = {
      title: task.title,
      description: task.description,
      boardId,
      columnId,
      taskId: task._id,
      order: task.order,
    };
    openTaskModal(taskData);
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
          <Box sx={{ display: 'flex', alignItems: 'center', columnGap: 0.5 }}>
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                handleOpenTaskModal();
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
      )}
    </Draggable>
  );
};
