import React from 'react';
import { StoreProvider } from 'store/store';
import logo from './logo.svg';
import styles from './app.module.scss';
import { useTranslation } from 'react-i18next';

function App() {
  const { t, i18n } = useTranslation();
  return (
    <StoreProvider>
      <div className={styles.app}>
        <header className={styles.header}>
          <img src={logo} className={styles.logo} alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className={styles.link}
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('Learn React')}
          </a>
          <p>
            <span onClick={() => i18n.changeLanguage('ru')}>RU</span>{' '}
            <span onClick={() => i18n.changeLanguage('en')}>EN</span>
          </p>
        </header>
      </div>
    </StoreProvider>
  );
}

export default App;
