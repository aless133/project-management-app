import React from 'react';
import Drawer from '@mui/material/Drawer';
import CloseIcon from '@mui/icons-material/Close';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import { TrashBasket } from 'components/UI/TrashBasket';
import { UpdateButton } from 'components/UI/UpdateButton';
import { ITask, ITaskPropsData } from 'types/taskTypes';
import { Card, CardActions, CardContent, IconButton, Typography } from '@mui/material';
import { useDeleteTaskMutation } from 'api/tasksApiSlice';
import { useAppContext } from 'app.context';
import { useTranslation } from 'react-i18next';

interface TaskPanelProps {
  task: ITask;
  isTaskPanel: boolean;
  setTaskPanel: React.Dispatch<React.SetStateAction<boolean>>;
  openTaskModal: (data: ITaskPropsData) => void;
}
export const TaskPanel = ({ task, openTaskModal, isTaskPanel, setTaskPanel }: TaskPanelProps) => {
  const { confirm } = useAppContext();
  const [deleteTask] = useDeleteTaskMutation();
  const [t] = useTranslation();

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
    <Drawer
      anchor="right"
      open={isTaskPanel}
      onClick={() => setTaskPanel(false)}
      PaperProps={{
        sx: {
          backgroundColor: 'rgba(233,255,255,.5)',
        },
      }}
      disableEscapeKeyDown
    >
      <Card sx={{ width: { xs: 300 }, m: { md: 2 }, p: 2 }}>
        <CardContent sx={{ mt: 4 }}>
          <IconButton
            aria-label="close"
            onClick={() => setTaskPanel(false)}
            sx={{
              position: 'absolute',
              right: { xs: 10, md: 20 },
              top: { xs: 10, md: 20 },
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <Typography
            sx={{ mb: 2, p: 1, backgroundColor: '#ddd', borderRadius: 0.6 }}
            color="text.secondary"
            gutterBottom
          >
            <TextSnippetIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            {t('Task Title')}
          </Typography>
          <Typography variant="h5" component="div">
            {task.title}
          </Typography>
          <Typography
            sx={{ my: 2, p: 1, backgroundColor: '#ddd', borderRadius: 0.6 }}
            color="text.secondary"
          >
            <PlaylistAddCheckIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            {t('Task Description')}
          </Typography>
          <Typography variant="h5">{task.description}</Typography>
        </CardContent>
        <CardActions>
          <UpdateButton onAction={handleOpenTaskModal} />
          <TrashBasket onAction={() => handleDeleteTask(task._id)} />
        </CardActions>
      </Card>
    </Drawer>
  );
};
