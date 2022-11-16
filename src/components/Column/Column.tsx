import React, { FC } from 'react';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { useTranslation } from 'react-i18next';
import { InlineTextField } from 'components/InlineTextField';
import { IColumn, IColumnParams } from 'types/columnTypes';
import { TrashBasket } from 'components/TrashBasket';
import { useUpdateColumnMutation } from 'api/columnsApiSlice';

interface IColumnProps {
  column: IColumn;
  onSetColumnId: (id: string) => void;
}

export const Column: FC<IColumnProps> = ({ column, onSetColumnId }) => {
  const [t] = useTranslation();
  const [updateColumn] = useUpdateColumnMutation();

  const handleSave = async (value: string) => {
    const requestObj: IColumnParams = {
      boardId: column.boardId as string,
      columnId: column._id as string,
      data: {
        title: value,
        order: column.order,
      },
    };
    const resp = await updateColumn(requestObj).unwrap();
    return resp;
  };

  return (
    <Paper elevation={3}>
      <InlineTextField label={t('Title')} value={column.title} handleSave={handleSave} />
      <TrashBasket onAction={() => onSetColumnId(column._id)} />
      <Button
        variant="contained"
        color="secondary"
        fullWidth
        sx={{ mt: 2 }}
        onClick={() => true /*setFormModalTask(true)*/}
      >
        {t('Add task')}
      </Button>
      {/* <FormModal
          title="Add task"
          isOpen={isFormModalTask}
          description={true}
          onClose={() => setFormModalTask(false)}
        /> */}
    </Paper>
  );
};
