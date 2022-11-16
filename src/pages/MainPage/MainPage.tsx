import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useCheckAccess } from 'hooks/checkAccess';
import { useDeleteBoardMutation, useGetUserBoardsQuery } from 'api/boardsApiSlice';
import { useStoreSelector } from 'hooks/store.hooks';
import { selectUser } from 'store/userSlice';
import { Constants } from 'utils';
import { ConfirmModal } from 'components/UI/ConfirmModal';
import { TrashBasket } from 'components/TrashBasket';
// import { setAlert } from 'store/uiSlice';
// import { NotifierText, NotifierType } from 'types/NotifierTypes';

export const MainPage = () => {
  const [isConfirm, setConfirm] = useState(false);
  const user = useStoreSelector(selectUser);
  const { data: boards /*, error, isLoading*/ } = useGetUserBoardsQuery(user.id as string);
  const [deleteBoard] = useDeleteBoardMutation();
  const navigate = useNavigate();
  const [t] = useTranslation();
  // const dispatch = useStoreDispatch();
  const boardIdRef = useRef('');

  useCheckAccess('user');

  const handleDeleteBoard = (id: string) => {
    boardIdRef.current = id;
    setConfirm(true);
  };

  const handleDeleteBoardConfirmed = async () => {
    if (boardIdRef.current) {
      return await deleteBoard(boardIdRef.current).unwrap();
    }
  };

  return (
    <main>
      <Container maxWidth="xl">
        <ConfirmModal
          isOpen={isConfirm}
          onClose={() => setConfirm(false)}
          onAction={handleDeleteBoardConfirmed}
        />
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
