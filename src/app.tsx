import React from 'react';
import { StoreProvider } from 'store/store';
import AppRouter from 'router/AppRouter';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';

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
