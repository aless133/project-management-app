import React from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import IconButton from '@mui/material/IconButton/IconButton';

interface TrashBasketProps {
  onAction: () => void;
}

export const TrashBasket = ({ onAction }: TrashBasketProps) => {
  return (
    <IconButton
      onClick={(e) => {
        e.stopPropagation();
        onAction();
      }}
      sx={{
        color: 'gray',
        ':hover': {
          color: '#dc5b5b',
          backgroundColor: '#f4d8d8',
        },
        transition: '0.3s',
      }}
    >
      <DeleteOutlineIcon />
    </IconButton>
  );
};
