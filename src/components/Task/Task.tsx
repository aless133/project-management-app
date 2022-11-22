import { Box, Grid, IconButton, Typography } from '@mui/material';
import { useDeleteTaskMutation } from 'api/tasksApiSlice';
import { useAppContext } from 'app.context';
import { TrashBasket } from 'components/TrashBasket';
import React from 'react';
import {
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
  Droppable,
  DroppableProvided,
} from 'react-beautiful-dnd';
import { ITask, ITaskPropsData } from 'types/taskTypes';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import { DragDrop } from 'utils/constants';

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
    <Droppable
      key={task._id}
      type={DragDrop.TASK}
      direction="vertical"
      droppableId={`${columnId}:${task._id}`}
      ignoreContainerClipping={true}
      isCombineEnabled={true}
    >
      {(providedDropTask: DroppableProvided) => (
        <Box
          key={task._id}
          ref={providedDropTask.innerRef}
          {...providedDropTask.droppableProps}
          sx={{ transition: 'all .3s' }}
        >
          <Draggable
            draggableId={task._id}
            key={task._id}
            index={task.order}
            isDragDisabled={loading}
          >
            {(providedDragTask: DraggableProvided, snapshotDragTask: DraggableStateSnapshot) => (
              <Grid
                container
                justifyContent="space-between"
                ref={providedDragTask.innerRef}
                {...providedDragTask.draggableProps}
                {...providedDragTask.dragHandleProps}
                sx={{
                  flexWrap: 'nowrap',
                  my: snapshotDragTask.isDragging ? 0 : 2,
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  border: '.1rem solid #e8e3e3',
                  backgroundColor: snapshotDragTask.isDragging ? 'rgba(233,255,255,.3)' : 'inherit',
                }}
              >
                {/* textOverflow not work */}
                <Grid item sx={{ maxWidth: '50%', overflow: 'hidden', textOverflow: 'ellipsis' }}>
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
          {providedDropTask.placeholder}
        </Box>
      )}
    </Droppable>
  );
};
