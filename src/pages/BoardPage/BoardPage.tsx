import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { useGetBoardQuery } from 'api/boardsApiSlice';
import { useCreateColumnMutation, useGetBoardColumnsQuery } from 'api/columnsApiSlice';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { Constants } from 'utils';

export const BoardPage = () => {
  const [t] = useTranslation();
  const { id } = useParams();
  const { data: board } = useGetBoardQuery(id as string);
  const { data: columns } = useGetBoardColumnsQuery(id as string);

  return (
    <Box component="main" /*sx={{ flexGrow: 0 }}*/>
      <Container maxWidth="xl">
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
          <Button size="large" variant="contained" color="secondary" sx={{ my: 4 }}>
            {t('Add first column')}
          </Button>
        </Box>
      </Container>
      {columns ? (
        <Container>
          <Grid container>
            {columns.map((column) => (
              <Grid key={column._id}>тут будет компонент column</Grid>
            ))}
          </Grid>
        </Container>
      ) : null}
    </Box>
  );
};
