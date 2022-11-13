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
import { useNavigate } from 'react-router-dom';
import { Constants } from 'utils';
// import { Constants } from 'utils';

export const MainPage = () => {
  const user = useStoreSelector(selectUser);
  useCheckAccess('user');
  const { data: boards /*, error, isLoading*/ } = useGetUserBoardsQuery(user.id as string);
  const navigate = useNavigate();

  return (
    <main>
      <Container maxWidth="xl">
        <Grid container gap={4} justifyContent="center" alignItems="center" sx={{ mt: 8 }}>
          {boards
            ? boards.map((board) => (
                <Grid key={board._id} item xs={12} sm={4} md={3}>
                  <Card
                    sx={{ ':hover': { cursor: 'pointer' } }}
                    onClick={() => navigate(`${Constants.BOARD}/${board._id}`)}
                  >
                    <CardContent>
                      <Typography variant="h2">{board.title}</Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small">View tasks</Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))
            : null}
        </Grid>
      </Container>
    </main>
  );
};
