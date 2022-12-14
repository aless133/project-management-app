import { Layout } from 'components/Layout';
import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedPage from './ProtectedPage';
import ErrorPage from 'pages/ErrorPage';
import { Spinner } from 'components/UI/Spinner';

const AccountPage = React.lazy(() => import('pages/AccountPage'));
const BoardPage = React.lazy(() => import('pages/BoardPage'));
const MainPage = React.lazy(() => import('pages/MainPage'));
const SignInPage = React.lazy(() => import('pages/SignInPage'));
const SignUpPage = React.lazy(() => import('pages/SignUpPage'));
const WelcomePage = React.lazy(() => import('pages/WelcomePage'));
const SearchPage = React.lazy(() => import('pages/SearchPage'));

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <Suspense fallback={<Spinner />}>
              <WelcomePage />
            </Suspense>
          }
        />
        <Route
          path="signin"
          element={<ProtectedPage key="signin" rules={['guest']} component={<SignInPage />} />}
        />
        <Route
          path="signup"
          element={<ProtectedPage key="signup" rules={['guest']} component={<SignUpPage />} />}
        />
        <Route
          path="account"
          element={<ProtectedPage key="account" rules={['user']} component={<AccountPage />} />}
        />
        <Route
          path="main"
          element={<ProtectedPage key="main" rules={['user']} component={<MainPage />} />}
        />
        <Route
          path="search"
          element={<ProtectedPage key="search" rules={['user']} component={<SearchPage />} />}
        />
        <Route
          path="board/:id"
          element={
            <ProtectedPage key="board" rules={['user', 'boardOwner']} component={<BoardPage />} />
          }
        />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
