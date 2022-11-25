import { Box, TextField, Typography } from '@mui/material';
import { Container } from '@mui/system';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import LoadingButton from '@mui/lab/LoadingButton';
import CircularProgress from '@mui/material/CircularProgress';
import { useStoreDispatch, useStoreSelector } from 'hooks/store.hooks';
import { selectUser } from 'store/userSlice';
import { useLazyGetTasksSetQuery } from 'api/tasksApiSlice';
import { ISearchTaskData } from 'types/taskTypes';
import { SearchTask } from './SearchTask';
import SearchIcon from '@mui/icons-material/Search';
import { alertError } from 'store/uiSlice';
import { getErrorMessage } from 'utils/helpers';

const SearchPage = () => {
  const [t] = useTranslation();
  const [value, setValue] = useState<string>('');
  const [tasks, setTasks] = useState<ISearchTaskData[]>([]);
  const { id } = useStoreSelector(selectUser);
  const [getTasks] = useLazyGetTasksSetQuery();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const dispatch = useStoreDispatch();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      if (value) {
        setIsLoading(true);
        const res = await getTasks({ userId: id, search: value }).unwrap();
        setIsSearch(true);
        res && setTasks(res);
      }
    } catch (err) {
      dispatch(alertError(getErrorMessage(err)));
    } finally {
      setIsLoading(false);
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
            <Box sx={{ display: 'flex', alignItems: 'center', columnGap: 2 }}>
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
                  mt: 0.5,
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
          {isSearch ? (
            tasks.length ? (
              tasks.map((task) => <SearchTask key={task._id} data={task} />)
            ) : (
              <Box sx={{ fontSize: 22 }}>{t('Nothing found')}</Box>
            )
          ) : (
            ''
          )}
        </Container>
      </Container>
    </main>
  );
};

export default SearchPage;
