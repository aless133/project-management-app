import React from 'react';
import Drawer from '@mui/material/Drawer';
import CloseIcon from '@mui/icons-material/Close';
import { TrashBasket } from 'components/UI/TrashBasket';
import { UpdateButton } from 'components/UI/UpdateButton';
import { ITask, ITaskPropsData } from 'types/taskTypes';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useDeleteTaskMutation } from 'api/tasksApiSlice';
import { useAppContext } from 'app.context';
import { useTranslation } from 'react-i18next';
import { Constants } from 'utils';

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
      disableEscapeKeyDown
    >
      <Card sx={{ width: { xs: 300, lg: 500 }, boxShadow: 'none', pl: 1 }}>
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
          <Typography sx={{ mb: 2 }}>{t('Title')}</Typography>
          <Typography variant="h5" component="div" sx={{ mb: 4 }}>
            {task.title}
          </Typography>
          <Typography sx={{ mb: 2 }}>{t('Description')}</Typography>
          <Typography
            variant="h5"
            component="div"
            sx={{
              mb: 4,
              maxHeight: '50vh',
              overflowY: 'auto',
              whiteSpace: 'pre-wrap',
              wordWrap: 'break-word',
              wordBreak: 'break-word',
            }}
          >
            {task.description === ' ' ? (
              <Typography
                component="div"
                sx={{ opacity: '0.7', fontSize: '.9rem', fontStyle: 'italic' }}
              >
                {t(Constants.TASK_NO_DESCRIPTION)}
              </Typography>
            ) : (
              task.description
            )}
          </Typography>
        </CardContent>
        <CardActions>
          <UpdateButton onAction={handleOpenTaskModal} />
          <TrashBasket onAction={() => handleDeleteTask(task._id)} />
        </CardActions>
      </Card>
    </Drawer>
  );
};
