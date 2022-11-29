import Box from '@mui/material/Box';
import { keyframes } from '@mui/material';
import Typography from '@mui/material/Typography';
import React, { FC, useState } from 'react';
import { Draggable, DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';
import { ITask, ITaskPropsData } from 'types/taskTypes';
import { useSearchParams } from 'react-router-dom';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useKeyDown } from 'hooks/keydown';
import { TaskPanel } from '../TaskPanel';

interface ITaskProps {
  task: ITask;
  index: number;
  loading: boolean;
  onAction: () => void;
  openTaskModal: (data: ITaskPropsData) => void;
  ref?: React.ForwardedRef<HTMLSpanElement>;
}

export const Task: FC<ITaskProps> = React.forwardRef(
  ({ task, index, loading, openTaskModal }, ref) => {
    const [isTaskPanel, setTaskPanel] = useState(false);

    const [searchParams] = useSearchParams();
    const searchTaskId = searchParams.get('taskId');
    const isAnimation = searchTaskId === task._id;
    const myKeyframe = keyframes`
  0%,
  10%,
  20%,
  30%,
  40%,
  50%,
  60%,
  70%,
  80%,
  90%,
  100% {
    background-color: rgba(2, 137, 209, .3);
  }
`;
    useKeyDown('Escape', () => setTaskPanel(false));

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
              animation: isAnimation ? `${myKeyframe} 4s ease-in-out` : '',
            }}
          >
            <Typography ref={ref} variant="h6" sx={{ flex: '1 1 auto' }}>
              {task.title}
            </Typography>

            <MoreHorizIcon
              sx={{
                padding: 1,
                borderRadius: '50%',
                transition: '.5s',
                ':hover': {
                  backgroundColor: '#ddd',
                },
              }}
              onClick={() => setTaskPanel(true)}
            />
            <TaskPanel
              task={task}
              openTaskModal={openTaskModal}
              isTaskPanel={isTaskPanel}
              setTaskPanel={setTaskPanel}
            />
          </Box>
        )}
      </Draggable>
    );
  }
);
