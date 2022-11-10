import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useCheckAccess } from 'hooks/checkAccess';
import { useGetUserBoardsQuery } from 'api/boardsApiSlice';
import { useStoreSelector } from 'hooks/store.hooks';
import { selectUser } from 'store/userSlice';
// import { Constants } from 'utils';

export const MainPage = () => {
  const user = useStoreSelector(selectUser);
  useCheckAccess('user');
  const { data: boards /*, error, isLoading*/ } = useGetUserBoardsQuery(user.id as string);
  return (
    <main>
      <Container maxWidth="xl">
        <Grid container direction="row" justifyContent="center" alignItems="center">
          <Grid item xl={4}>
            {boards
              ? boards.map((board) => (
                  <Card key={board._id}>
                    <CardContent>
                      <Typography variant="h2">{board.title}</Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small">View tasks</Button>
                    </CardActions>
                  </Card>
                ))
              : null}
          </Grid>
        </Grid>
      </Container>
    </main>
  );
};
