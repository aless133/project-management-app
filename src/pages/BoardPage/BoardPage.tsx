import { Button, Card, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import { useGetBoardByIdQuery } from 'api/boardsApiSlice';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { Constants } from 'utils';

export const BoardPage = () => {
  const [t] = useTranslation();
  const { id } = useParams();
  const { data } = useGetBoardByIdQuery(id as string);

  return (
    <main>
      <Container maxWidth="xl">
        <Card sx={{ width: '300px', m: 4, p: 4 }}>
          <Typography variant="h3">{data && data.title}</Typography>
          <Button variant="contained" sx={{ mr: 2, mt: { xs: 4 } }}>
            <Link
              style={{ textDecoration: 'none', color: 'inherit' }}
              to={Constants.MAIN}
              replace={true}
            >
              {t('Back to main')}
            </Link>
          </Button>
        </Card>
      </Container>
    </main>
  );
};
