import React, { FC } from 'react';
// import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { useTranslation } from 'react-i18next';
import { InlineTextField } from 'components/InlineTextField';
import { IColumn } from 'types/columnTypes';
import { Trash } from 'components/Trash';

interface IColumnProps {
  column: IColumn;
  onSetColumnId: (id: string) => void;
}

export const Column: FC<IColumnProps> = ({ column, onSetColumnId }) => {
  const [t] = useTranslation();

  return (
    <Paper elevation={3}>
      <InlineTextField label={t('Title')} value={column.title} handleSave={() => {}} />
      <Trash onAction={() => onSetColumnId(column._id)} />
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
