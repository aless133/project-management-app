import { Footer } from 'components/Footer';
import { Header } from 'components/Header';
import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from './layout.module.scss';

export const Layout = () => {
  return (
    <div className={styles.layout}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};
