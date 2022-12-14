import React, { useState } from 'react';
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
import { TrashBasket } from 'components/UI/TrashBasket';
import { useAppContext } from 'app.context';
import { Spinner } from 'components/UI/Spinner';
import Box from '@mui/material/Box';
import { BoardModal } from 'components/BoardModal';
import { UpdateButton } from 'components/UI/UpdateButton';

const MainPage = () => {
  const [t] = useTranslation();
  const user = useStoreSelector(selectUser);
  const { data: boards, isFetching } = useGetUserBoardsQuery(user.id as string);
  const [deleteBoard] = useDeleteBoardMutation();
  const navigate = useNavigate();
  const { confirm } = useAppContext();
  const [boardId, setBoardId] = useState<string>('');
  const [boardTitle, setBoardTitle] = useState<string>('');
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleOpenBoardModal = (id: string, title: string) => {
    setOpenModal(true);
    setBoardId(id);
    setBoardTitle(title);
  };

  const handleCloseBoardModal = () => {
    setOpenModal(false);
  };

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
      <Container maxWidth="xl" sx={{ pb: 2 }}>
        <BoardModal
          mode="update"
          boardId={boardId}
          boardTitle={boardTitle}
          openModal={openModal}
          closeModal={handleCloseBoardModal}
        />
        <Grid container spacing={3} justifyContent="center" alignItems="center" sx={{ mt: 8 }}>
          {boards && boards.length ? (
            boards.map((board) => (
              <Grid key={board._id} item xs={12} sm={4} md={3}>
                <Card
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h2"
                      component="h2"
                      sx={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        fontSize: { xs: 30, sm: 30, md: 40, lg: 60 },
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
                    <Box
                      sx={{ display: 'flex', alignItems: 'center', columnGap: { sm: 0, md: 1 } }}
                    >
                      <UpdateButton onAction={() => handleOpenBoardModal(board._id, board.title)} />
                      <TrashBasket onAction={() => handleDeleteBoard(board._id)} />
                    </Box>

                    <Button
                      size="small"
                      sx={{ fontSize: { sm: 10, md: 13 } }}
                      onClick={() => navigate(`${Constants.BOARD}/${board._id}`)}
                    >
                      {t('View tasks')}
                    </Button>
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

export default MainPage;
