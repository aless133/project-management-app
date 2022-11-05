import { Layout } from 'components/Layout';
import { AccountPage } from 'pages/AccountPage';
import { MainPage } from 'pages/MainPage';
import { SingInPage } from 'pages/SingInPage';
import { SingUpPage } from 'pages/SingUpPage';
import { WelcomePage } from 'pages/WelcomePage';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<WelcomePage />} />
        <Route path="singin" element={<SingInPage />} />
        <Route path="singup" element={<SingUpPage />} />
        <Route path="account" element={<AccountPage />} />
        <Route path="main" element={<MainPage />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
