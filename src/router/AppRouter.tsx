import { Layout } from 'components/Layout';
import { AuthorizationPage } from 'pages/AuthorizationPage';
import { RegistrationPage } from 'pages/RegistrationPage';
import { WelcomePage } from 'pages/WelcomePage';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<WelcomePage />} />
        <Route path="auth" element={<AuthorizationPage />} />
        <Route path="reg" element={<RegistrationPage />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
