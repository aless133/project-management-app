import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import './index.scss';
import App from './app';
import './i18n/i18n';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Suspense fallback={<h2>Loading...</h2>}>
      <HashRouter>
        <App />
      </HashRouter>
    </Suspense>
  </React.StrictMode>
);
