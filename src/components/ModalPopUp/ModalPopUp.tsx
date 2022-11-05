import React, { FC, Fragment, ReactNode, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

interface ModalPopUp {
  children: ReactNode;
  listener: ReactNode;
}

export const ModalPopUp: FC<ModalPopUp> = ({ children, listener }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {<div onClick={handleOpen}>{listener}</div>}
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ ...style, width: 400 }}>{children}</Box>
      </Modal>
    </div>
  );
};
