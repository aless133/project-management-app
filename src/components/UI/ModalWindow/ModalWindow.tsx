import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';
import IconButton from '@mui/material/IconButton';

export interface ModalWindowProps {
  children: React.ReactNode;
  title: React.ReactNode;
  open: boolean;
  onClose?: () => void;
}

const WrapperTheme = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
}));

export function ModalWindow(props: ModalWindowProps) {
  const { children, onClose, open, title, ...other } = props;

  return (
    <WrapperTheme open={open} onClick={onClose} disableEscapeKeyDown>
      <DialogTitle sx={{ m: 0, p: 2 }} {...other} onClick={(e) => e.stopPropagation()}>
        {title}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
      <DialogContent sx={{ overflowX: 'hidden' }} onClick={(e) => e.stopPropagation()}>
        {children}
      </DialogContent>
    </WrapperTheme>
  );
}
