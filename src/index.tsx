import React from 'react';
// import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import './index.scss';
import App from './app';
import './i18n/i18n';
import { ErrorBoundary } from 'components/ErrorBoundary';
// import { Spinner } from 'components/UI/Spinner';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <>
    {/*<Suspense fallback={<Spinner />}>*/}
    <HashRouter>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </HashRouter>
    {/*</Suspense>*/}
  </>
);
