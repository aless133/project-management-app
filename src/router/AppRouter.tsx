import { lazy } from 'react';
import { Layout } from 'components/Layout';
const AccountPage = lazy(() => import('pages/AccountPage'));
const MainPage = lazy(() => import('pages/MainPage'));
const SignInPage = lazy(() => import('pages/SignInPage'));
const SignUpPage = lazy(() => import('pages/SignUpPage'));
const WelcomePage = lazy(() => import('pages/WelcomePage'));
import React from 'react';
import { Route, Routes } from 'react-router-dom';
const ErrorPage = lazy(() => import('pages/ErrorPage'));
const BoardPage = lazy(() => import('pages/BoardPage'));
//const ProtectedPage = lazy(() => import('./ProtectedPage'));
import ProtectedPage from './ProtectedPage';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<WelcomePage />} />
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
          path="board/:id"
          element={
            <ProtectedPage key="main" rules={['user', 'boardOwner']} component={<BoardPage />} />
          }
        />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
