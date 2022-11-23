import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  DragDropContext,
  Droppable,
  DroppableProvided,
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
  DropResult,
} from 'react-beautiful-dnd';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ReplyIcon from '@mui/icons-material/Reply';
import AddchartSharpIcon from '@mui/icons-material/AddchartSharp';
import { Column } from 'components/Column';
import { Spinner } from 'components/Spinner';
import { FormModal } from 'components/UI/FormModal';
import { Constants } from 'utils';
import { useGetBoardQuery } from 'api/boardsApiSlice';
import { useStoreDispatch } from 'hooks/store.hooks';
import { alertSuccess, alertError } from 'store/uiSlice';
import { getErrorMessage } from 'utils/helpers';
import { TaskModal } from 'components/TaskModal';
import { ITask, ITaskPropsData } from 'types/taskTypes';
import {
  useCreateColumnMutation,
  useGetBoardColumnsQuery,
  useUpdateColumnSetMutation,
} from 'api/columnsApiSlice'; //useCreateColumnMutation,
import { DragDrop } from 'utils/constants';

import { useLazyGetColumnTasksQuery, useUpdateSetTaskMutation } from 'api/tasksApiSlice';
import { IColumn, IOrderColumnData } from 'types/columnTypes';

export const BoardPage = () => {
  const [t] = useTranslation();
  const { id } = useParams();
  const { data: board, isLoading: isBoardLoading } = useGetBoardQuery(id as string);
  const { data: columns, isLoading: isColumnsLoading } = useGetBoardColumnsQuery(id as string);
  const [createColumn] = useCreateColumnMutation();
  const [updateOrdersColumn, { isLoading: isOrderColumnsLoading }] = useUpdateColumnSetMutation();
  const [setTasksOrder, { isLoading: isOrderTasksLoading }] = useUpdateSetTaskMutation();
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

  const [getColumnTasks] = useLazyGetColumnTasksQuery();

  const openTaskModal = (data: ITaskPropsData) => {
    setIsOpenTaskModal(true);
    setTaskModalData(data);
  };

  const closeTaskModal = () => {
    setIsOpenTaskModal(false);
  };

  const isLoading = () => {
    return isBoardLoading || isColumnsLoading || isOrderTasksLoading;
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

  const dragEnd = async (result: DropResult) => {
    console.log(result);
    // return;

    if (!result.destination) return;

    if (columns && result.type === DragDrop.COLUMN) {
      const newOrder = result.destination.index;
      const oldOrder = result.source.index;

      if (newOrder === oldOrder) return;

      const reorderColumn = columns[oldOrder];
      const reorderColumns = Array.from(columns);
      console.log('origin', JSON.stringify(reorderColumns), oldOrder, newOrder);
      reorderColumns.splice(oldOrder, 1);
      console.log('delete', JSON.stringify(reorderColumns));
      reorderColumns.splice(newOrder, 0, reorderColumn);
      console.log('insert', JSON.stringify(reorderColumns));

      const data: IOrderColumnData[] = reorderColumns.map((column, inx) => ({
        _id: column._id,
        order: inx,
      }));

      console.log('data', data);

      await updateOrdersColumn({ boardId: board!._id, data })
        .unwrap()
        .then(() => {})
        .catch((err) => dispatch(alertError(getErrorMessage(err))));
    }

    // } else if (result.type === DragDrop.TASK) {
    //   const [columnIdDrop, TaskIdDrop] = result.destination.droppableId.split(':');
    //   const columnIdDrag = result.source.droppableId.split(':')[0];
    //   const taskIdDrag = result.draggableId;
    //   const newOrder = result.destination.index;
    //   const targetTasks =
    //     id && (await getColumnTasks({ boardId: id, columnId: columnIdDrop })).data;

    //   if (TaskIdDrop === 'empty') {
    //     const data = [{ _id: taskIdDrag, order: 0, columnId: columnIdDrop! }];
    //     await setTasksOrder(data)
    //       .unwrap()
    //       .then(() => {})
    //       .catch((err) => dispatch(alertError(getErrorMessage(err))));

    //     return;
    //   }

    //   if (columnIdDrop !== columnIdDrag) {
    //     const oldTasks = id && (await getColumnTasks({ boardId: id, columnId: columnIdDrag })).data;

    //     const reorderTask =
    //       oldTasks && (oldTasks.filter((task) => task._id === taskIdDrag)[0] as ITask);
    //     const reorderedTasks = [
    //       ...targetTasks!.slice(0, newOrder),
    //       reorderTask,
    //       ...targetTasks!.slice(newOrder),
    //     ] as ITask[];
    //     const copyReorderedTasks = JSON.parse(JSON.stringify(reorderedTasks)) as ITask[];

    //     const data = copyReorderedTasks.map((task, inx) => {
    //       task.order = inx;
    //       return { _id: task._id, order: task.order, columnId: columnIdDrop };
    //     });

    //     await setTasksOrder(data)
    //       .unwrap()
    //       .then(() => {})
    //       .catch((err) => dispatch(alertError(getErrorMessage(err))));

    //     return;
    //   }

    //   const reorderTask =
    //     targetTasks && (targetTasks.filter((task) => task._id === taskIdDrag)[0] as ITask);

    //   const filteredTasks =
    //     targetTasks && (targetTasks.filter((task) => task._id !== taskIdDrag) as ITask[]);

    //   const reorderedTasks = [
    //     ...filteredTasks!.slice(0, newOrder < 1 ? 0 : newOrder - 1),
    //     reorderTask,
    //     ...filteredTasks!.slice(newOrder < 1 ? 0 : newOrder + 1),
    //   ] as ITask[];

    //   const copyReorderedTasks = JSON.parse(JSON.stringify(reorderedTasks)) as ITask[];

    //   const data = copyReorderedTasks.map((task, inx) => {
    //     if (typeof task !== 'string' && task) {
    //       task.order = inx;
    //     }
    //     return {
    //       _id: task._id,
    //       order: task.order,
    //       columnId: task.columnId!,
    //     };
    //   });

    //   await setTasksOrder(data)
    //     .unwrap()
    //     .then(() => {})
    //     .catch((err) => dispatch(alertError(getErrorMessage(err))));
    // }
  };

  return (
    <Box component="main" className="has-loader">
      {isLoading() ? (
        <Spinner />
      ) : (
        <>
          {/* boardHeader */}
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
          {/* end boardHeader */}

          {/* columns */}
          {isColumns() ? (
            <Container
              maxWidth={false}
              sx={{
                display: 'flex',
                // overflowX: 'auto',
              }}
            >
              {/* columns dnd zone*/}
              <Box
                sx={{
                  position: 'relative',
                  margin: 'auto',
                  display: 'flex',
                  flexWrap: 'nowrap',
                  gap: 2,
                  py: 0,
                  flexDirection: 'row',
                  alignItems: 'top',
                  justifyContent: 'center',
                }}
              >
                <DragDropContext onDragEnd={dragEnd}>
                  <Droppable
                    type={DragDrop.COLUMN}
                    direction="horizontal"
                    droppableId={board!._id}
                    isCombineEnabled={false}
                  >
                    {(providedDropColumn: DroppableProvided) => (
                      <Box
                        ref={providedDropColumn.innerRef}
                        {...providedDropColumn.droppableProps}
                        sx={{
                          margin: 'auto',
                          display: 'flex',
                          flexWrap: 'nowrap',
                          gap: 2,
                          py: 0,
                          flexDirection: 'row',
                          alignItems: 'top',
                          justifyContent: 'center',
                        }}
                      >
                        {columns!
                          .slice(0)
                          .sort((a, b) => a.order - b.order)
                          .map((column, index) => (
                            <Column
                              key={column._id}
                              column={column}
                              index={index}
                              loading={isBoardLoading}
                              openTaskModal={openTaskModal}
                            />
                          ))}
                        {providedDropColumn.placeholder}
                      </Box>
                    )}
                  </Droppable>
                </DragDropContext>
                {/* end columns dnd zone*/}

                {/* columns additional button */}
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
                {/* add columns additional button */}
              </Box>
            </Container>
          ) : null}
          {/* end columns*/}

          {/* common modals */}
          <FormModal
            title={t('Add Column')}
            isOpen={isFormModalCol}
            onClose={() => setFormModalCol(false)}
            onAction={addColumn}
          />
          <TaskModal
            data={taskModalData}
            closeTaskModal={closeTaskModal}
            openModal={isOpenTaskModal}
          />
        </>
      )}
    </Box>
  );
};
