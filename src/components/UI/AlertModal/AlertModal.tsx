import React, { FC, useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Slide, { SlideProps } from '@mui/material/Slide';
import { useTranslation } from 'react-i18next';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="standard" {...props} />;
});

type TransitionProps = Omit<SlideProps, 'direction'>;

function TransitionUp(props: TransitionProps) {
  return <Slide {...props} direction="up" />;
}

type TAlertModal = {
  alertValue: boolean;
  closeAlert: () => void;
  isSuccess: boolean;
};

export const AlertModal: FC<TAlertModal> = ({ alertValue, closeAlert, isSuccess }) => {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const [transition, setTransition] = React.useState<
    React.ComponentType<TransitionProps> | undefined
  >(undefined);

  useEffect(() => {
    if (alertValue) {
      setTransition(() => TransitionUp);
      setOpen(alertValue);
    }
  }, [alertValue]);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    closeAlert();
    setOpen(false);
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
        <Alert
          onClose={handleClose}
          severity={isSuccess ? 'success' : 'error'}
          sx={{ width: '100%' }}
        >
          {isSuccess ? t('Success') : t('Something went wrong')}
        </Alert>
      </Snackbar>
    </>
  );
};
