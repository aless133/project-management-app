import React, { useRef, useState } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ClearIcon from '@mui/icons-material/Clear';
import { useCheckAccess } from 'hooks/checkAccess';
import { useGetUserBoardsQuery } from 'api/boardsApiSlice';
import { useStoreSelector } from 'hooks/store.hooks';
import { selectUser } from 'store/userSlice';
import { useNavigate } from 'react-router-dom';
import { Constants } from 'utils';
import { ConfirmModal } from 'components/UI/ConfirmModal';
import { useTranslation } from 'react-i18next';
// import { Constants } from 'utils';

export const MainPage = () => {
  const user = useStoreSelector(selectUser);
  const { data: boards /*, error, isLoading*/ } = useGetUserBoardsQuery(user.id as string);
  const [isConfirm, setConfirm] = useState(false);
  const navigate = useNavigate();
  const [t] = useTranslation();
  const boardIdRef = useRef('');

  useCheckAccess('user');

  const handleDeleteBoard = (id: string) => {
    if (boardIdRef.current) {
      alert(JSON.stringify(id));
    }
  };

  return (
    <main>
      <Container maxWidth="xl">
        <ConfirmModal
          isOpen={isConfirm}
          onClose={() => setConfirm(false)}
          onAction={() => {
            boardIdRef.current && handleDeleteBoard(boardIdRef.current);
          }}
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

                    <CardActions sx={{ display: 'flex', columnGap: 2 }}>
                      <Button size="small">{t('View tasks')}</Button>
                      <ClearIcon
                        color="error"
                        onClick={(e) => {
                          e.stopPropagation();
                          setConfirm(true);
                          boardIdRef.current = `${board._id}` || '';
                        }}
                      />
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
