import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import styles from './spinner.module.scss';

export const Spinner = () => {
  return (
    <div className={styles.box}>
      <CircularProgress />
    </div>
  );
};
