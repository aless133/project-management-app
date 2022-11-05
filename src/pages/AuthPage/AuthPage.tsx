import React, { useState } from 'react';
import { Box } from '@mui/material';
import { Navigate } from 'react-router-dom';
import { FormField } from 'components/FormField';

const validateLogin = (login: string): boolean => !!login && login.length < 2;
const validatePsw = (psw: string): boolean => psw.length < 8;

export const AuthPage = () => {
  const isAuth = ''; //redux useSelector

  const [name, setName] = useState('');
  const [login, setLogin] = useState('');
  const [psw, setPsw] = useState('');

  if (isAuth) {
    return <Navigate to="/main" replace={true} />;
  }

  // return <ModalPopUp listener="test">text</ModalPopUp>;

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: 'name' | 'login' | 'psw'
  ): void => {
    if (field === 'login') {
      setLogin(event.target.value);
    }
    if (field === 'name') {
      setName(event.target.value);
    }
    if (field === 'psw') {
      setPsw(event.target.value);
    }
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e): void => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1 },
          display: 'flex',
          flexDirection: 'column',
          width: '30rem',
        }}
        noValidate
        autoComplete="off"
      >
        <FormField
          value={name}
          label="Name"
          text="at least 2 characters<"
          handlerFlag="name"
          onChange={handleChange}
          validator={validateLogin}
        />

        <FormField
          value={login}
          label="Login"
          text="at least 2 characters<"
          handlerFlag="login"
          onChange={handleChange}
          validator={validateLogin}
        />

        <FormField
          value={psw}
          label="Password"
          text="at least 8 characters"
          handlerFlag="psw"
          onChange={handleChange}
          validator={validatePsw}
        />
      </Box>
    </form>
  );
};
