import IconButton from '@mui/material/IconButton';
import React, { FC } from 'react';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';

interface UpdateButtonProps {
  onAction: () => void;
}

export const UpdateButton: FC<UpdateButtonProps> = ({ onAction }) => {
  return (
    <IconButton
      onClick={(e) => {
        e.stopPropagation();
        onAction();
      }}
      sx={{
        color: 'gray',
        ':hover': {
          color: 'primary.main',
          backgroundColor: '#c2eafc',
        },
        transition: '0.3s',
      }}
    >
      <ModeEditOutlineOutlinedIcon />
    </IconButton>
  );
};
