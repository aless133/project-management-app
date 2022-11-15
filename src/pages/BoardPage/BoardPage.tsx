import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
// import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { useGetBoardQuery } from 'api/boardsApiSlice';
import { useCreateColumnMutation, useGetBoardColumnsQuery } from 'api/columnsApiSlice'; //useCreateColumnMutation,
import { Constants } from 'utils';
import { InlineTextField } from 'components/InlineTextField';
import { FormModal } from 'components/UI/FormModal';
import { useStoreDispatch } from 'hooks/store.hooks';
import { setAlert } from 'store/uiSlice';
import { NotifierText, NotifierType } from 'types/NotifierTypes';

export const BoardPage = () => {
  const [t] = useTranslation();
  const { id } = useParams();
  const { data: board } = useGetBoardQuery(id as string);
  const { data: columns } = useGetBoardColumnsQuery(id as string);
  const [createColumn] = useCreateColumnMutation();
  const dispatch = useStoreDispatch();

  const [isFormModalCol, setFormModalCol] = useState(false);
  // const [isFormModalTask, setFormModalTask] = useState(false);

  const addColumn = (fields: { name: string; login?: string } | undefined) => {
    if (id && fields?.name) {
      const order = columns?.length || 0;
      const data = { title: fields?.name, order };

      createColumn({ id, data })
        .unwrap()
        .then(() => dispatch(setAlert({ type: NotifierType.SUCCESS, text: NotifierText.SUCCESS })))
        .catch(() => {
          dispatch(setAlert({ type: NotifierType.ERROR, text: NotifierText.ERROR }));
        });

      setFormModalCol(false);
    }
  };

  const addTask = () => {
    //TODO
  };

  return (
    <Box component="main" /*sx={{ flexGrow: 0 }}*/>
      <FormModal
        title="Add Column"
        isOpen={isFormModalCol}
        onClose={() => setFormModalCol(false)}
        onAction={addColumn}
      />
      <Container maxWidth="xl">
        {/* <FormModal
          title="Add task"
          isOpen={isFormModalTask}
          description={true}
          onClose={() => setFormModalTask(false)}
        /> */}
        <Box sx={{ my: 1, display: 'flex', alignItems: 'center' }}>
          <Button variant="outlined">
            <Link
              style={{ textDecoration: 'none', color: 'inherit' }}
              to={Constants.MAIN}
              replace={true}
            >
              {t('Back to main')}
            </Link>
          </Button>
          <Typography variant="h3" sx={{ margin: 'auto' }}>
            {board && board.title}
          </Typography>
          {/* <Button
            size="large"
            variant="contained"
            color="secondary"
            sx={{ my: 4 }}
            onClick={() => setFormModalTask(true)}
          >
            {t('Add task')}
          </Button> */}
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <Button
            size="large"
            variant="contained"
            color="secondary"
            sx={{ my: 4 }}
            onClick={() => setFormModalCol(true)}
          >
            {t('Add first column')}
          </Button>
        </Box>
      </Container>
      {columns ? (
        <Container>
          <Grid container>
            {columns.map((column) => (
              <Grid key={column._id}>
                <InlineTextField
                  label={t('Title')}
                  value="custom current value"
                  handleSave={() => {}}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      ) : null}
    </Box>
  );
};
