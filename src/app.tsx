import React from 'react';
import { StoreProvider } from 'store/store';
import AppRouter from 'router/AppRouter';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import { AppContextProvider } from 'app.context';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0288d1',
    },
    secondary: {
      main: '#e3f2fd',
      contrastText: '#153551',
    },
  },
});

function App() {
  return (
    <StoreProvider>
      <ThemeProvider theme={theme}>
        <AppContextProvider>
          <AppRouter />
        </AppContextProvider>
      </ThemeProvider>
    </StoreProvider>
  );
}

export default App;
