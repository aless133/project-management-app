import { Button } from 'components/UI/Button';
import React from 'react';
import styles from './Header.module.scss';

export const Header = () => {
  return (
    <header className={styles.header}>
      <Button>SingUp</Button>
      <Button>LogIn</Button>
    </header>
  );
};
