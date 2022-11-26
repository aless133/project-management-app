import { Box, TextField, Typography } from '@mui/material';
import { Container } from '@mui/system';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import LoadingButton from '@mui/lab/LoadingButton';
import CircularProgress from '@mui/material/CircularProgress';
import { useStoreDispatch, useStoreSelector } from 'hooks/store.hooks';
import { selectUser } from 'store/userSlice';
import { useGetTasksSetQuery } from 'api/tasksApiSlice';
import { SearchTask } from './SearchTask';
import SearchIcon from '@mui/icons-material/Search';
import { alertError } from 'store/uiSlice';
import { getErrorMessage } from 'utils/helpers';
import { TaskModal } from 'components/UI/TaskModal';
import { ITaskPropsData } from 'types/taskTypes';

const SearchPage = () => {
  const [t] = useTranslation();
  const [value, setValue] = useState<string>('');
  const { id } = useStoreSelector(selectUser);
  const dispatch = useStoreDispatch();
  const [skip, setSkip] = useState<boolean>(true);
  const [dataRequest, setDataRequest] = useState({ userId: id, search: value });
  const { data, isLoading, isSuccess } = useGetTasksSetQuery(dataRequest, { skip });
  const [isOpenTaskModal, setIsOpenTaskModal] = useState<boolean>(false);
  const [taskModalData, setTaskModalData] = useState<ITaskPropsData>({
    title: '',
    description: '',
    boardId: '',
    columnId: '',
    taskId: '',
    order: 0,
  });

  const openTaskModal = (data: ITaskPropsData) => {
    setIsOpenTaskModal(true);
    setTaskModalData(data);
  };

  const closeTaskModal = () => {
    setIsOpenTaskModal(false);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      if (value) {
        setDataRequest({ userId: id, search: value });
        setSkip(false);
      }
    } catch (err) {
      dispatch(alertError(getErrorMessage(err)));
    }
  };

  return (
    <main>
      <Container maxWidth="xl">
        <Box sx={{ maxWidth: 'sm', mx: 'auto', mt: 2 }}>
          <form onSubmit={handleSubmit}>
            <Typography variant="h4" component="h2" align="center">
              {t('Search task')}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'stretch', columnGap: 2 }}>
              <TextField
                name="Search task"
                value={value}
                onChange={(newValue) => {
                  setValue(newValue.target.value);
                }}
                fullWidth
                autoFocus
                label={t('Search task')}
                margin="normal"
              />

              <LoadingButton
                loading={isLoading}
                loadingIndicator={<CircularProgress color="primary" size={25} />}
                type="submit"
                disabled={!!!value}
                variant="contained"
                fullWidth
                size="large"
                sx={{
                  maxWidth: { xs: 50, sm: 100, md: 100, lg: 100 },
                  mt: '16px',
                  mb: '8px',
                }}
              >
                <SearchIcon />
              </LoadingButton>
            </Box>
          </form>
        </Box>
        <Container
          maxWidth="xl"
          sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 2, mt: 3 }}
        >
          {isSuccess ? (
            data?.length ? (
              data.map((task) => (
                <SearchTask key={task._id} data={task} openTaskModal={openTaskModal} />
              ))
            ) : (
              <Box sx={{ fontSize: 22 }}>{t('Nothing found')}</Box>
            )
          ) : (
            ''
          )}
        </Container>
        <TaskModal
          mode="search"
          data={taskModalData}
          closeTaskModal={closeTaskModal}
          openModal={isOpenTaskModal}
        />
      </Container>
    </main>
  );
};

export default SearchPage;
