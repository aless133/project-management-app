import { Box, Button } from '@mui/material';
import React, { FC } from 'react';
import { ISearchTaskData, ITaskPropsData } from 'types/taskTypes';
import { TrashBasket } from 'components/UI/TrashBasket';
import { useTranslation } from 'react-i18next';
import { useAppContext } from 'app.context';
import { Constants } from 'utils';
import { useNavigate } from 'react-router-dom';
import { UpdateButton } from 'components/UI/UpdateButton';
import { useDeleteTaskMutation } from 'api/tasksApiSlice';

interface ISearchTaskProps {
  data: ISearchTaskData;
  openTaskModal: (data: ITaskPropsData) => void;
}

export const SearchTask: FC<ISearchTaskProps> = ({ data, openTaskModal }) => {
  const [t] = useTranslation();
  const { confirm } = useAppContext();
  const [deleteTask] = useDeleteTaskMutation();
  const navigate = useNavigate();

  const handleDeleteBoard = () => {
    confirm(async () => {
      const requestData = {
        boardId: data.boardId as string,
        columnId: data.columnId as string,
        taskId: data._id,
      };
      return await deleteTask(requestData).unwrap();
    });
  };

  const handleOpenTaskModal = () => {
    const taskData = {
      title: data.title,
      description: data.description,
      boardId: data.boardId,
      columnId: data.columnId,
      taskId: data._id,
      order: data.order,
    };
    openTaskModal(taskData);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '300px',
        width: '100%',
        flexShrink: 0,
        p: { xs: 1, sm: 2 },
        borderRadius: 2,
        border: '.1rem solid #e8e3e3',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          rowGap: 2,
        }}
      >
        <Box sx={{ display: 'flex', flexWrap: 'wrap', fontSize: 22 }}>{data.title}</Box>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            fontSize: 20,
            color: 'gray',
            fontWeight: 200,
            whiteSpace: 'pre-wrap',
          }}
        >
          {data.description}
        </Box>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', columnGap: 1 }}>
          <UpdateButton onAction={handleOpenTaskModal} />
          <TrashBasket
            onAction={() => {
              handleDeleteBoard();
            }}
          />
        </Box>

        <Button
          size="small"
          sx={{ fontSize: { xs: 12, sm: 14 } }}
          onClick={() => navigate(`${Constants.BOARD}/${data.boardId}`)}
        >
          {t('View in project')}
        </Button>
      </Box>
    </Box>
  );
};
