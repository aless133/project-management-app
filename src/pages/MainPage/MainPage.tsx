import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useDeleteBoardMutation, useGetUserBoardsQuery } from 'api/boardsApiSlice';
import { useStoreSelector } from 'hooks/store.hooks';
import { selectUser } from 'store/userSlice';
import { Constants } from 'utils';
import { TrashBasket } from 'components/TrashBasket';
import { useAppContext } from 'app.context';
import { Spinner } from 'components/Spinner';

export const MainPage = () => {
  const [t] = useTranslation();
  const user = useStoreSelector(selectUser);
  const { data: boards, isFetching } = useGetUserBoardsQuery(user.id as string);
  const [deleteBoard] = useDeleteBoardMutation();
  const navigate = useNavigate();
  const { confirm } = useAppContext();

  const handleDeleteBoard = (id: string) => {
    confirm(async () => {
      return await deleteBoard(id).unwrap();
    });
  };

  if (isFetching) {
    return <Spinner />;
  }

  return (
    <main>
      <Container maxWidth="xl">
        <Grid container gap={4} justifyContent="center" alignItems="center" sx={{ mt: 8 }}>
          {boards && boards.length ? (
            boards.map((board) => (
              <Grid key={board._id} item xs={12} sm={4} md={3}>
                <Card
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    ':hover': { cursor: 'pointer' },
                  }}
                  onClick={() => navigate(`${Constants.BOARD}/${board._id}`)}
                >
                  <CardContent>
                    <Typography
                      variant="h2"
                      sx={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {board.title}
                    </Typography>
                  </CardContent>

                  <CardActions
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <TrashBasket
                      onAction={(e) => {
                        e.stopPropagation();
                        handleDeleteBoard(board._id);
                      }}
                    />
                    <Button size="small">{t('View tasks')}</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography variant="h2" component="h2" sx={{ fontSize: { xs: 25, sm: 55, md: 75 } }}>
              {t('No boards available')}
            </Typography>
          )}
        </Grid>
      </Container>
    </main>
  );
};
