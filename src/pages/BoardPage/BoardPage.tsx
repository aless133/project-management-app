import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
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
import ReplyIcon from '@mui/icons-material/Reply';
import AddchartSharpIcon from '@mui/icons-material/AddchartSharp';
import { TaskModal } from 'components/TaskModal';
import { ITaskPropsData } from 'types/taskTypes';

export const BoardPage = () => {
  const [t] = useTranslation();
  const { id } = useParams();
  const { data: board, isLoading: isBoardLoading } = useGetBoardQuery(id as string);
  const { data: columns, isLoading: isColumnsLoading } = useGetBoardColumnsQuery(id as string);
  const [createColumn] = useCreateColumnMutation();
  const dispatch = useStoreDispatch();
  const [isOpenTaskModal, setIsOpenTaskModal] = useState<boolean>(false);
  const [isFormModalCol, setFormModalCol] = useState<boolean>(false);
  const [taskModalData, setTaskModalData] = useState<ITaskPropsData>({
    title: '',
    description: '',
    boardId: '',
    columnId: '',
    taskId: '',
    order: 0,
  });

  const openTaskModal = (data: ITaskPropsData) => {
    setIsOpenTaskModal(true);
    setTaskModalData(data);
  };

  const closeTaskModal = () => {
    setIsOpenTaskModal(false);
  };

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

      createColumn({ boardId: id, data })
        .unwrap()
        .then(() => dispatch(alertSuccess()))
        .catch((err) => {
          dispatch(alertError(getErrorMessage(err)));
        });

      setFormModalCol(false);
    }
  };

  return (
    <Box component="main" className="has-loader">
      {isLoading() ? (
        <Spinner />
      ) : (
        <>
          <TaskModal
            data={taskModalData}
            closeTaskModal={closeTaskModal}
            openModal={isOpenTaskModal}
          />
          <Container maxWidth="xl">
            <Box
              sx={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                my: 1,
              }}
            >
              <Button variant="outlined" sx={{ position: 'absolute', left: 0 }}>
                <Link
                  style={{ textDecoration: 'none', color: 'inherit' }}
                  to={Constants.MAIN}
                  replace={true}
                >
                  <ReplyIcon sx={{ display: { xs: 'block', sm: 'block', md: 'none' } }} />
                  <Box
                    sx={{
                      display: { xs: 'none', sm: 'none', md: 'block' },
                    }}
                  >
                    {t('Back to main')}
                  </Box>
                </Link>
              </Button>
              <Typography
                variant="h3"
                sx={{
                  fontSize: { xs: 30, sm: 38 },
                  maxWidth: { xs: 120, sm: 220, md: 400, lg: 700 },
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
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
            <Container
              maxWidth={false}
              sx={{
                display: 'flex',
                overflowX: 'auto',
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  margin: 'auto',
                  display: 'flex',
                  flexWrap: 'nowrap',
                  gap: 2,
                  py: 2,
                  flexDirection: 'row',
                  alignItems: 'top',
                  justifyContent: 'center',
                }}
              >
                {columns!.map((column) => (
                  <Box key={column._id} sx={{ width: 300, flexShrink: 0 }}>
                    <Column openTaskModal={openTaskModal} column={column} />
                  </Box>
                ))}
                <Box
                  key="column-add"
                  sx={{
                    position: 'absolute',
                    left: 'calc(100% + 16px)',
                  }}
                >
                  <Button
                    size="large"
                    variant="contained"
                    color="secondary"
                    sx={{
                      width: { md: 205, lg: 205 },
                      whiteSpace: 'nowrap',
                      mr: 2,
                    }}
                    onClick={() => setFormModalCol(true)}
                  >
                    <AddchartSharpIcon
                      sx={{ display: { xs: 'block', sm: 'block', md: 'none', lg: 'none' } }}
                    />
                    <Box sx={{ display: { xs: 'none', sm: 'none', md: 'block', lg: 'block' } }}>
                      {t('Add column')}
                    </Box>
                  </Button>
                </Box>
              </Box>
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
