import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
// import Box from '@mui/material/Box';
import styles from './spinner.module.scss';

export const Spinner = () => {
  return (
    <div className={styles.box}>
      <CircularProgress />
    </div>
  );
};
