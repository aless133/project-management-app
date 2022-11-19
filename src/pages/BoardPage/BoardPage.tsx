import React, { useRef, useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { DragDropContext, Droppable, DroppableProvided, DropResult } from 'react-beautiful-dnd';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
// import Grid from '@mui/material/Grid';
// import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import ReplyIcon from '@mui/icons-material/Reply';
import AddchartSharpIcon from '@mui/icons-material/AddchartSharp';
import { Column } from 'components/Column';
import { Spinner } from 'components/Spinner';
import { FormModal } from 'components/UI/FormModal';
import { ConfirmModal } from 'components/UI/ConfirmModal';
import { Constants } from 'utils';
import { useStoreSelector } from 'hooks/store.hooks';
import { selectUser } from 'store/userSlice';
import { useUpdateSetTaskMutation } from 'api/tasksApiSlice';
import { useGetBoardQuery } from 'api/boardsApiSlice';
import { useStoreDispatch } from 'hooks/store.hooks';
import { alertSuccess, alertError } from 'store/uiSlice';
import { getErrorMessage } from 'utils/helpers';
import { useCheckAccess } from 'hooks/checkAccess';
import {
  useCreateColumnMutation,
  useDeleteColumnMutation,
  useGetBoardColumnsQuery,
  useUpdateColumnSetMutation,
} from 'api/columnsApiSlice'; //useCreateColumnMutation,

export const BoardPage = () => {
  useCheckAccess('user');
  const [t] = useTranslation();
  const { id } = useParams();
  const dispatch = useStoreDispatch();
  const navigate = useNavigate();
  const user = useStoreSelector(selectUser);

  const [isFormModalCol, setFormModalCol] = useState(false);
  const [isConfirm, setConfirm] = useState(false);
  const columnRef = useRef('');

  const {
    data: board,
    isLoading: isBoardLoading,
    isSuccess: isBoardSuccess,
  } = useGetBoardQuery(id as string);

  const { data: columns, isLoading: isColumnsLoading } = useGetBoardColumnsQuery(id as string);

  const [setTasksOrder, { isLoading: isOrderTasksLoading }] = useUpdateSetTaskMutation();

  const [createColumn] = useCreateColumnMutation();
  const [updateOrdersColumn, { isLoading: isOrderColumnsLoading }] = useUpdateColumnSetMutation();
  const [deleteColumn] = useDeleteColumnMutation();

  const isLoading = () => {
    return isBoardLoading || isColumnsLoading || isOrderColumnsLoading || isOrderTasksLoading;
  };
  const isColumns = () => {
    return !!columns && columns.length > 0;
  };

  useEffect(() => {
    if (!!board && !!user && user.id && board.owner !== user.id) {
      navigate(Constants.MAIN, { replace: true });
    }
  }, [isBoardSuccess, board, user, navigate]);

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

  const setColumnId = (id: string) => {
    columnRef.current = id;
    setConfirm(true);
  };

  const handleDeleteColumnConfirmed = async () => {
    if (id && columnRef.current) {
      return await deleteColumn({ boardId: id, columnId: columnRef.current }).unwrap();
    }
  };

  const dragEnd = async (result: DropResult) => {
    if (!result.destination) return;

    if (result.type === 'COLUMN') {
      const newOrder = result.destination.index;
      const oldOrder = result.source.index;
      const startId = result.draggableId;
      const [finishId] =
        result.destination.droppableId.split(':') || result.destination.droppableId;

      if (newOrder === oldOrder) return;

      const columnDrag = columns && columns.filter((column) => column._id === startId)[0];
      const columnDrop = columns && columns.filter((column) => column._id === finishId)[0];

      if (id && startId && columnDrag && columnDrop) {
        const dataDrag = { _id: startId, order: newOrder };
        const dataDrop = { _id: finishId, order: oldOrder };

        await updateOrdersColumn([dataDrag, dataDrop])
          .unwrap()
          .then(() => {})
          .catch((err) => dispatch(alertError(getErrorMessage(err))));
      }
    } else if (result.type === 'TASK') {
      const [columnId] = result.destination.droppableId.split(':');
      const startId = result.draggableId;
      const finishId = result.source.droppableId.split(':')[1];
      const newOrder = result.destination.index;
      const oldOrder = result.source.index;

      const data = [
        {
          _id: startId,
          order: newOrder,
          columnId,
        },
        {
          _id: finishId,
          order: oldOrder,
          columnId,
        },
      ];

      await setTasksOrder(data)
        .unwrap()
        .then(() => {})
        .catch((err) => dispatch(alertError(getErrorMessage(err))));

      console.log(result);
    }
  };

  return (
    <DragDropContext onDragEnd={dragEnd}>
      <Box component="main" className="has-loader">
        {isLoading() ? (
          <Spinner />
        ) : (
          <>
            <Container maxWidth="xl">
              <ConfirmModal
                isOpen={isConfirm}
                onClose={() => setConfirm(false)}
                onAction={handleDeleteColumnConfirmed}
              />
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
                  {columns!
                    .slice(0)
                    .sort((a, b) => a.order - b.order)
                    .map((column) => (
                      <Droppable
                        key={column._id}
                        type="COLUMN"
                        direction="vertical"
                        droppableId={column._id}
                      >
                        {(providedDropColumn: DroppableProvided) => (
                          <Box
                            sx={{ width: 300, flexShrink: 0 }}
                            ref={providedDropColumn.innerRef}
                            {...providedDropColumn.droppableProps}
                          >
                            <Column
                              column={column}
                              onSetColumnId={setColumnId}
                              loading={isBoardLoading}
                            />
                            {providedDropColumn.placeholder}
                          </Box>
                        )}
                      </Droppable>
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
    </DragDropContext>
  );
};
