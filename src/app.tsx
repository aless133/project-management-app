import React from 'react';
import { StoreProvider } from 'store/store';
// import logo from './logo.svg';
// import styles from './app.module.scss';
// import { Trans, useTranslation } from 'react-i18next';
import AppRouter from 'router/AppRouter';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';

// function App() {
//   const { t, i18n } = useTranslation();

//   const toggleLangHandler = () => {
//     if (t('lng') === 'EN') {
//       i18n.changeLanguage('ru');
//       return;
//     }

//     i18n.changeLanguage('en');
//   };

//   return (
//     <StoreProvider>
//       <div className={styles.app}>
//         <header className={styles.header}>
//           <img src={logo} className={styles.logo} alt="logo" />
//           <p>
//             Edit <code>src/App.tsx</code> and save to reload.
//           </p>
//           <a
//             className={styles.link}
//             href="https://reactjs.org"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             {t('Learn React')}
//           </a>
//           <p>
//             <span onClick={() => i18n.changeLanguage('ru')}>RU</span>{' '}
//             <span onClick={() => i18n.changeLanguage('en')}>EN</span>
//           </p>

//           <button
//             style={{ width: '4rem', padding: '1rem', backgroundColor: 'violet' }}
//             onClick={toggleLangHandler}
//           >
//             <Trans i18nKey="lng"></Trans>
//           </button>
//           <Trans i18nKey={'welcome.description'}></Trans>
//         </header>
//       </div>
//       <AppRouter />
//     </StoreProvider>
//   );
// }

const theme = createTheme({
  palette: {
    primary: {
      main: '#0288d1',
    },
    secondary: {
      main: '#e3f2fd',
      contrastText: 'blue',
    },
  },
});

function App() {
  return (
    <StoreProvider>
      <ThemeProvider theme={theme}>
        <AppRouter />
      </ThemeProvider>
    </StoreProvider>
  );
}

export default App;
