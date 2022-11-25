import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Droppable, DroppableProvided } from 'react-beautiful-dnd';
import { DragDrop } from 'utils/constants';
import { IColumn } from 'types/columnTypes';
import { Column } from 'pages/BoardPage/ColumnDropContainer/Column';
import { ITaskPropsData } from 'types/taskTypes';
import { ButtonAddColumn } from './Column/ButtonAddColumn';

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
      className="h100-i"
      maxWidth={false}
      sx={{
        display: 'flex',
        overflowX: 'auto',
        py: 1,
      }}
    >
      {/* columns dnd zone*/}
      <Box
        className="h100-f"
        sx={{
          position: 'relative',
          mx: 'auto',
          // display: 'flex',
          // flexWrap: 'nowrap',
          // gap: 2,
          // p: 1,
          // flexDirection: 'row',
          // alignItems: 'top',
          // justifyContent: 'center',
          // maxWidth: '100%',
          // overflowX: 'auto',
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
              className="h100-i"
              ref={providedDropColumn.innerRef}
              {...providedDropColumn.droppableProps}
              sx={{
                margin: 'auto',
                display: 'flex',
                flexWrap: 'nowrap',
                gap: 2,
                px: 1,
                flexDirection: 'row',
                alignItems: 'stretch',
                // justifyContent: 'center',
                // maxWidth: '100%',
                // overflowX: 'auto',
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

        <ButtonAddColumn onClick={onClick} />
      </Box>
    </Container>
  );
};
