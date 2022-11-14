import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
// import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { useGetBoardQuery } from 'api/boardsApiSlice';
import { useGetBoardColumnsQuery } from 'api/columnsApiSlice'; //useCreateColumnMutation,
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { Constants } from 'utils';
import { InlineTextField } from 'components/InlineTextField';
import { FormModal } from 'components/UI/FormModal';

export const BoardPage = () => {
  const [t] = useTranslation();
  const { id } = useParams();
  const { data: board } = useGetBoardQuery(id as string);
  const { data: columns } = useGetBoardColumnsQuery(id as string);

  const [isFormModalCol, setFormModalCol] = useState(false);
  const [isFormModalTask, setFormModalTask] = useState(false);

  return (
    <Box component="main" /*sx={{ flexGrow: 0 }}*/>
      <Container maxWidth="xl">
        <FormModal
          title="Add Column"
          isOpen={isFormModalCol}
          onClose={() => setFormModalCol(false)}
          onAction={() => {
            console.log('action column');
          }}
        />
        <FormModal
          title="Add task"
          isOpen={isFormModalTask}
          description={true}
          onClose={() => setFormModalTask(false)}
          onAction={() => console.log('action task')}
        />
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

          <Button
            size="large"
            variant="contained"
            color="secondary"
            sx={{ my: 4 }}
            onClick={() => setFormModalTask(true)}
          >
            {t('Add task')}
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
