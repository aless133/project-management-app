import React from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

interface TrashBasketProps {
  onAction: React.MouseEventHandler<SVGSVGElement>;
}

export const TrashBasket = ({ onAction }: TrashBasketProps) => {
  return (
    <DeleteOutlineIcon
      sx={{
        borderRadius: '50%',
        color: 'gray',
        p: 0.5,
        ':hover': { backgroundColor: '#f4d8d8', color: '#dc5b5b' },
        transition: 'background-color .3s',
      }}
      onClick={onAction}
    />
  );
};