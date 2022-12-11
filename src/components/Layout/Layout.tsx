import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Footer } from 'components/Footer';
import { Header } from 'components/Header';
import { Spinner } from 'components/UI/Spinner';
import { useCheckToken } from 'hooks/checkToken';
import styles from './layout.module.scss';
import { Notifier } from 'components/UI/Notifier';

export const Layout = () => {
  const location = useLocation();
  const { isChecking } = useCheckToken();

  return (
    <div
      className={styles.layout + ' ' + (location.pathname.startsWith('/board/') ? styles.h100 : '')}
    >
      {isChecking ? (
        <Spinner />
      ) : (
        <>
          <Header />
          <Outlet />
          <div className={styles.filler} />
          <Footer />
          <Notifier />
        </>
      )}
    </div>
  );
};
