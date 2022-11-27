import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import Box from '@mui/material/Box';
import { Spinner } from 'components/UI/Spinner';
import { FormModal } from 'components/UI/FormModal';
import { useGetBoardQuery } from 'api/boardsApiSlice';
import { useStoreDispatch } from 'hooks/store.hooks';
import { alertSuccess, alertError } from 'store/uiSlice';
import { getErrorMessage } from 'utils/helpers';
import { TaskModal } from 'components/UI/TaskModal';
import { ITask, ITaskPropsData } from 'types/taskTypes';
import {
  useCreateColumnMutation,
  useGetBoardColumnsQuery,
  useUpdateColumnsSetMutation,
} from 'api/columnsApiSlice'; //useCreateColumnMutation,
import { DragDrop } from 'utils/constants';

import { useLazyGetColumnTasksQuery, useUpdateTasksSetMutation } from 'api/tasksApiSlice';
import { IOrderColumnData } from 'types/columnTypes';
import { IOrderTaskParams } from 'types/taskTypes';
import { BoardHeader } from './BoardHeader';
import { ColumnDropContainer } from './ColumnDropContainer';

const BoardPage = () => {
  const [t] = useTranslation();
  const { id } = useParams();
  const { data: board, isLoading: isBoardLoading } = useGetBoardQuery(id as string);
  const { data: columns, isLoading: isColumnsLoading } = useGetBoardColumnsQuery(id as string);
  const [createColumn, { isLoading: isColumnCreate }] = useCreateColumnMutation();
  const [updateColumnsSet] = useUpdateColumnsSetMutation();
  const [updateTaskSet] = useUpdateTasksSetMutation();
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
        .then(() => {
          dispatch(alertSuccess());
          setFormModalCol(false);
        })
        .catch((err) => {
          dispatch(alertError(getErrorMessage(err)));
        });
    }
  };

  const dragEnd = async (result: DropResult) => {
    if (!result.destination) return;

    const newOrder = result.destination.index;
    const oldOrder = result.source.index;
    const newDrop = result.destination.droppableId;
    const oldDrop = result.source.droppableId;
    if (newOrder === oldOrder && newDrop === oldDrop) return;

    //////////// DragDrop.COLUMN ///////////
    if (columns && result.type === DragDrop.COLUMN) {
      const reorderColumns = Array.from(columns);
      const reorderColumn = reorderColumns.splice(oldOrder, 1)[0];
      reorderColumns.splice(newOrder, 0, reorderColumn);

      const data: IOrderColumnData[] = reorderColumns.map((column, inx) => ({
        _id: column._id,
        order: inx,
      }));

      await updateColumnsSet({ boardId: board!._id, data })
        .unwrap()
        .then(() => {})
        .catch((err) => dispatch(alertError(getErrorMessage(err))));

      ///////////////  DragDrop.TASK  ////////////
    } else if (result.type === DragDrop.TASK) {
      const oldApiTasks = (await getColumnTasks({ boardId: id!, columnId: oldDrop }, true))
        .data as ITask[];
      const oldTasks = JSON.parse(JSON.stringify(oldApiTasks)) as ITask[];
      const reorderTask = oldTasks.splice(oldOrder, 1)[0];

      if (newDrop === oldDrop) {
        oldTasks.splice(newOrder, 0, reorderTask);
      }

      oldTasks.forEach((e, i) => {
        e.order = i;
      });

      const params: IOrderTaskParams = {
        boardId: board!._id,
        data: oldTasks.map(({ _id, order, columnId }) => ({ _id, order, columnId })),
        invalidate: [oldDrop],
        updateCache: { [oldDrop]: oldTasks },
      };

      if (newDrop !== oldDrop) {
        const newApiTasks = (await getColumnTasks({ boardId: id!, columnId: newDrop }, true))
          .data as ITask[];
        const newTasks = JSON.parse(JSON.stringify(newApiTasks)) as ITask[];
        reorderTask.columnId = newDrop;
        newTasks.splice(oldOrder, 0, reorderTask);

        newTasks.forEach((e, i) => {
          e.order = i;
        });
        params.invalidate.push(newDrop);
        params.data.push(...newTasks.map(({ _id, order, columnId }) => ({ _id, order, columnId })));
        params.updateCache[newDrop] = newTasks;
      }

      await updateTaskSet(params)
        .unwrap()
        .then(() => {})
        .catch((err) => dispatch(alertError(getErrorMessage(err))));
    }
  };

  return (
    <Box component="main" className="has-loader h100-f">
      {isLoading() ? (
        <Spinner />
      ) : (
        <>
          <BoardHeader
            title={board && board.title}
            isColumns={() => isColumns()}
            onClick={() => setFormModalCol(true)}
          />

          {isColumns() ? (
            <DragDropContext onDragEnd={dragEnd}>
              {board && columns && (
                <ColumnDropContainer
                  boardId={board._id}
                  columns={columns}
                  loading={isBoardLoading}
                  openTaskModal={openTaskModal}
                  onClick={() => setFormModalCol(true)}
                />
              )}
            </DragDropContext>
          ) : null}

          {/* common modals */}
          <FormModal
            title={t('Add Column')}
            loading={isColumnCreate}
            labelText={t('Column title')}
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

export default BoardPage;
