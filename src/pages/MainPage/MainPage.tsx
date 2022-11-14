import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useCheckAccess } from 'hooks/checkAccess';
import { useDeleteBoardMutation, useGetUserBoardsQuery } from 'api/boardsApiSlice';
import { useStoreSelector } from 'hooks/store.hooks';
import { selectUser } from 'store/userSlice';
import { useNavigate } from 'react-router-dom';
import { Constants } from 'utils';
import { ConfirmModal } from 'components/UI/ConfirmModal';
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

                    <CardActions
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <DeleteOutlineIcon
                        sx={{
                          borderRadius: '50%',
                          p: 0.5,
                          ':hover': { backgroundColor: '#f4d8d8' },
                          transition: 'background-color .3s',
                        }}
                        color="error"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteBoard(board._id);
                        }}
                      />
                      <Button size="small">{t('View tasks')}</Button>
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
