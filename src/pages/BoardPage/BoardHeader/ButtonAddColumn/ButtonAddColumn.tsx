import React from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

interface ButtonAddColumnProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export const ButtonAddColumn = ({ onClick }: ButtonAddColumnProps) => {
  const [t] = useTranslation();
  return (
    <Box sx={{ textAlign: 'center' }}>
      <Button size="large" variant="contained" color="secondary" sx={{ my: 4 }} onClick={onClick}>
        {t('Add first column')}
      </Button>
    </Box>
  );
};
