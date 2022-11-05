import { Layout } from 'components/Layout';
import { AuthPage } from 'pages/AuthPage';
import { MainPage } from 'pages/MainPage';
import { WelcomePage } from 'pages/WelcomePage';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<WelcomePage />} />
        <Route path="main" element={<MainPage />} />
        <Route path="auth" element={<AuthPage />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
