import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Droppable, DroppableProvided } from 'react-beautiful-dnd';
import { DragDrop } from 'utils/constants';
import { IColumn } from 'types/columnTypes';
import { Column } from 'pages/BoardPage/Column';
import { ITaskPropsData } from 'types/taskTypes';
import { ColumnButton } from 'pages/BoardPage/Column/ColumnButton';
interface ColumnDropContainerProps {
  boardId: string;
  columns: IColumn[];
  loading: boolean;
  openTaskModal: (data: ITaskPropsData) => void;
  onClick: () => void;
}

export const ColumnDropContainer = ({
  boardId,
  columns,
  loading,
  openTaskModal,
  onClick,
}: ColumnDropContainerProps) => {
  return (
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
        <Droppable
          type={DragDrop.COLUMN}
          direction="horizontal"
          droppableId={boardId}
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
              {columns
                .slice(0)
                .sort((a, b) => a.order - b.order)
                .map((column, index) => (
                  <Column
                    key={column._id}
                    column={column}
                    index={index}
                    loading={loading}
                    openTaskModal={openTaskModal}
                  />
                ))}
              {providedDropColumn.placeholder}
            </Box>
          )}
        </Droppable>

        {/* end columns dnd zone*/}

        <ColumnButton onClick={onClick} />
      </Box>
    </Container>
  );
};
