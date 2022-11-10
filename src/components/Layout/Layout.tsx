import React from 'react';
import { Outlet } from 'react-router-dom';
import { Footer } from 'components/Footer';
import { Header } from 'components/Header';
import { Spinner } from 'components/Spinner';
import { useCheckToken } from 'hooks/checkToken';
import styles from './layout.module.scss';

export const Layout = () => {
  const { isChecking } = useCheckToken();
  return (
    <div className={styles.layout}>
      {isChecking ? (
        <Spinner />
      ) : (
        <>
          <Header />
          <Outlet />
          <Footer />
        </>
      )}
    </div>
  );
};
