import React from 'react';
import AddchartSharpIcon from '@mui/icons-material/AddchartSharp';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';

interface ButtonAddColumnProps {
  onClick: () => void;
}
export const ButtonAddColumn = ({ onClick }: ButtonAddColumnProps) => {
  const [t] = useTranslation();

  return (
    <Box
      key="column-add"
      sx={{
        position: 'absolute',
        left: 'calc(100% + 8px)',
        top: '8px',
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
        onClick={onClick}
      >
        <AddchartSharpIcon sx={{ display: { xs: 'block', sm: 'block', md: 'none', lg: 'none' } }} />
        <Box sx={{ display: { xs: 'none', sm: 'none', md: 'block', lg: 'block' } }}>
          {t('Add column')}
        </Box>
      </Button>
    </Box>
  );
};
