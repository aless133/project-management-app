import { Layout } from 'components/Layout';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedPage from './ProtectedPage';
import {
  AccountPage,
  BoardPage,
  ErrorPage,
  MainPage,
  SignInPage,
  SignUpPage,
  WelcomePage,
} from './pages';

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
            <ProtectedPage key="board" rules={['user', 'boardOwner']} component={<BoardPage />} />
          }
        />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
