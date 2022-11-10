import React from 'react';
import { useCheckAccess } from 'hooks/checkAccess';

export const MainPage = () => {
  useCheckAccess('user');
  return <main>MainPage</main>;
};
