import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
// import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { useGetBoardQuery } from 'api/boardsApiSlice';
import { useCreateColumnMutation, useGetBoardColumnsQuery } from 'api/columnsApiSlice'; //useCreateColumnMutation,
import { Column } from 'components/Column';
import { Spinner } from 'components/Spinner';
import { Constants } from 'utils';
import { FormModal } from 'components/UI/FormModal';
import { useStoreDispatch } from 'hooks/store.hooks';
import { alertSuccess, alertError } from 'store/uiSlice';
import { getErrorMessage } from 'utils/helpers';
import { useCheckAccess } from 'hooks/checkAccess';

export const BoardPage = () => {
  useCheckAccess('user');
  const [t] = useTranslation();
  const { id } = useParams();
  const { data: board, isLoading: isBoardLoading } = useGetBoardQuery(id as string);
  const { data: columns, isLoading: isColumnsLoading } = useGetBoardColumnsQuery(id as string);
  const [createColumn] = useCreateColumnMutation();
  const dispatch = useStoreDispatch();

  const [isFormModalCol, setFormModalCol] = useState(false);
  // const [isFormModalTask, setFormModalTask] = useState(false);

  const isLoading = () => {
    return isBoardLoading || isColumnsLoading;
  };
  const isColumns = () => {
    return !!columns && columns.length > 0;
  };

  const addColumn = (fields: { name: string; login?: string } | undefined) => {
    if (id && fields?.name) {
      const order = columns?.length || 0;
      const data = { title: fields?.name, order };

      createColumn({ id, data })
        .unwrap()
        .then(() => dispatch(alertSuccess()))
        .catch((err) => {
          dispatch(alertError(getErrorMessage(err)));
        });

      setFormModalCol(false);
    }
  };

  // const addTask = () => {
  //   //TODO
  // };

  return (
    <Box component="main" className="has-loader">
      {isLoading() ? (
        <Spinner />
      ) : (
        <>
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
            {isColumns() ? null : (
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
              </Box>
            )}
          </Container>
          {isColumns() ? (
            <Container>
              <Grid container spacing={2} sx={{ flexWrap: 'nowrap' }}>
                {columns!.map((column) => (
                  <Grid item key={column._id} sx={{ minWidth: 300 }}>
                    <Column column={column} />
                  </Grid>
                ))}
                <Grid item key="column-add">
                  <Button
                    size="large"
                    variant="contained"
                    color="secondary"
                    sx={{ my: 4, whiteSpace: 'nowrap' }}
                    onClick={() => setFormModalCol(true)}
                  >
                    {t('Add column')}
                  </Button>
                </Grid>
              </Grid>
            </Container>
          ) : null}
          <FormModal
            title={t('Add Column')}
            isOpen={isFormModalCol}
            onClose={() => setFormModalCol(false)}
            onAction={addColumn}
          />
        </>
      )}
    </Box>
  );
};
