import { Box, keyframes, Typography } from '@mui/material';
import { useDeleteTaskMutation } from 'api/tasksApiSlice';
import { useAppContext } from 'app.context';
import { TrashBasket } from 'components/UI/TrashBasket';
import React from 'react';
import { Draggable, DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';
import { ITask, ITaskPropsData } from 'types/taskTypes';
import { UpdateButton } from 'components/UI/UpdateButton';
import { useSearchParams } from 'react-router-dom';

interface ITaskProps {
  task: ITask;
  index: number;
  loading: boolean;
  onAction: () => void;
  openTaskModal: (data: ITaskPropsData) => void;
}

export const Task = ({ task, index, loading, openTaskModal }: ITaskProps) => {
  const { confirm } = useAppContext();
  const [deleteTask] = useDeleteTaskMutation();

  const handleDeleteTask = (taskId: string) => {
    confirm(async () => {
      const data = {
        boardId: task.boardId as string,
        columnId: task.columnId as string,
        taskId,
      };
      return await deleteTask(data).unwrap();
    });
  };

  const [searchParams] = useSearchParams();
  const searchTaskId = searchParams.get('taskId');
  const isAnimation = searchTaskId === task._id;
  const myKeyframe = keyframes`
  0%,
  50%,
  100% {
    transform: rotate(0deg);
  }
  10%,
  30% {
    transform: rotate(-10deg);
  }
  20%,
  40% {
    transform: rotate(10deg);
  }
`;

  const handleOpenTaskModal = () => {
    const taskData = {
      title: task.title,
      description: task.description,
      boardId: task.boardId,
      columnId: task.columnId,
      taskId: task._id,
      order: task.order,
    };
    openTaskModal(taskData);
  };

  return (
    <Draggable draggableId={task._id} key={task._id} index={index} isDragDisabled={loading}>
      {(providedDragTask: DraggableProvided, snapshotDragTask: DraggableStateSnapshot) => (
        <Box
          ref={providedDragTask.innerRef}
          {...providedDragTask.draggableProps}
          {...providedDragTask.dragHandleProps}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            transition: 'all .3s',
            flexWrap: 'nowrap',
            my: 1,
            p: 1,
            pl: 2,
            borderRadius: 2,
            border: '.1rem solid #e8e3e3',
            backgroundColor: snapshotDragTask.isDragging ? 'rgba(233,255,255,.3)' : 'inherit',
            animation: isAnimation ? `${myKeyframe} 1.5s ease-in-out` : '',
            animationIterationCount: 3,
          }}
        >
          <Typography variant="h6" sx={{ flex: '1 1 auto' }}>
            {task.title}
          </Typography>
          <UpdateButton onAction={handleOpenTaskModal} />
          <TrashBasket onAction={() => handleDeleteTask(task._id)} />
        </Box>
      )}
    </Draggable>
  );
};
