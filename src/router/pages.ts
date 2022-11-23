import { lazy } from 'react';

const LazyPage = (path: string) => {
  const Component = lazy(() => import(`src/pages/${path}`));

  return Component;
};

export const AccountPage = LazyPage('AccountPage');
export const MainPage = LazyPage('MainPage');
export const SignInPage = LazyPage('SignInPage');
export const SignUpPage = LazyPage('SignUpPage');
export const WelcomePage = LazyPage('WelcomePage');
export const ErrorPage = LazyPage('ErrorPage');
export const BoardPage = LazyPage('BoardPage');
