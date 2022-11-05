import React from 'react';
import { StoreProvider } from 'store/store';
import AppRouter from 'router/AppRouter';

function App() {
  return (
    <StoreProvider>
      <AppRouter />
    </StoreProvider>
  );
}

export default App;
