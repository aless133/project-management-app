import { FormSign } from 'components/FormSign';
import React from 'react';
import { Navigate } from 'react-router-dom';
import { Constants } from 'utils';

export const SignInPage = () => {
  const isToken = ''; //store

  if (isToken) {
    return <Navigate to={Constants.MAIN} replace={true} />;
  }

  return <FormSign isName={false} />;
};
