import { Box, TextField, Typography } from '@mui/material';
import { Container } from '@mui/system';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import LoadingButton from '@mui/lab/LoadingButton';
import CircularProgress from '@mui/material/CircularProgress';

const SearchPage = () => {
  const [t] = useTranslation();
  const [value, setValue] = useState<string>();
  const [tasks, setTasks] = useState([]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
  };

  return (
    <main>
      <Container maxWidth="xl">
        <Box sx={{ maxWidth: 'sm', mx: 'auto', mt: 2 }}>
          <form onSubmit={handleSubmit}>
            <Typography variant="h3" component="h2" align="center">
              {t('Search task')}
            </Typography>

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
              // loading={false}
              loadingIndicator={<CircularProgress color="primary" size={25} />}
              type="submit"
              // disabled={}
              variant="contained"
              fullWidth
              size="large"
              sx={{ mt: 2 }}
            >
              {t('Search task')}
            </LoadingButton>
          </form>
        </Box>
        <Box>{/* {tasks.map((task) => <SearchTask data={task} />}) */}</Box>
      </Container>
    </main>
  );
};

export default SearchPage;
