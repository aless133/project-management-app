import { lazy } from 'react';

const LazyPage = (path: string) => {
  const Component = lazy(() => import(`/src/pages/${path}`));

  return Component;
};

const AccountPage = LazyPage('AccountPage');
const MainPage = LazyPage('MainPage');
const SignInPage = LazyPage('SignInPage');
const SignUpPage = LazyPage('SignUpPage');
const WelcomePage = LazyPage('WelcomePage');
const ErrorPage = LazyPage('ErrorPage');
const BoardPage = LazyPage('BoardPage');
const SearchPage = LazyPage('SearchPage');

export {
  AccountPage,
  MainPage,
  SignInPage,
  SignUpPage,
  WelcomePage,
  ErrorPage,
  BoardPage,
  SearchPage,
};
