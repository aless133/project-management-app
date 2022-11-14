import React, { useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Slide, { SlideProps } from '@mui/material/Slide';
import { useStoreDispatch, useStoreSelector } from 'hooks/store.hooks';
import { clearAlert, selectAlert } from 'store/uiSlice';
import i18next from 'i18next';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="standard" {...props} />;
});

type TransitionProps = Omit<SlideProps, 'direction'>;

function Transition(props: TransitionProps) {
  return <Slide {...props} direction="up" />;
}

export const Notifier = () => {
  const dispatch = useStoreDispatch();
  const { open, text, type } = useStoreSelector(selectAlert);
  const [transition, setTransition] = React.useState<
    React.ComponentType<TransitionProps> | undefined
  >(undefined);

  useEffect(() => {
    if (open) {
      setTransition(() => Transition);
    }
  }, [open]);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(clearAlert());
  };

  return (
    <>
      <Snackbar
        open={open}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        autoHideDuration={3000}
        onClose={handleClose}
        TransitionComponent={transition}
      >
        <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
          {i18next.t(text)}
        </Alert>
      </Snackbar>
    </>
  );
};
