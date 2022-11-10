import { Layout } from 'components/Layout';
import { AccountPage } from 'pages/AccountPage';
import { MainPage } from 'pages/MainPage';
import { SignInPage } from 'pages/SignInPage';
import { SignUpPage } from 'pages/SignUpPage';
import { WelcomePage } from 'pages/WelcomePage';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useCheckToken } from 'hooks/checkToken';
import { ErrorPage } from 'pages/ErrorPage';
import { Constants } from 'utils';

const AppRouter = () => {
  useCheckToken();

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<WelcomePage />} />
        <Route path="signin" element={<SignInPage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="account" element={<AccountPage />} />
        <Route path="main" element={<MainPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
