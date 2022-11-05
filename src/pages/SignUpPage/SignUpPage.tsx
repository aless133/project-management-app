import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import { FormField } from 'components/FormField';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styles from './SignUp.module.scss';

const validateLogin = (login: string): boolean => !!login && login.length < 2;
const validatePsw = (psw: string): boolean => !!psw && psw.length < 8;

export const SignUpPage = () => {
  const [name, setName] = useState('');
  const [login, setLogin] = useState('');
  const [psw, setPsw] = useState('');
  const [t] = useTranslation();

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

  const handleSignUp: React.MouseEventHandler<HTMLButtonElement> = () => {
    // reducer action
    setName('');
    setLogin('');
    setPsw('');
  };

  return (
    <>
      <Box component="form" className={styles['sign-up']} noValidate autoComplete="off">
        <FormField
          value={name}
          label={t('auth.name')}
          text={t('auth.rules.login')}
          handlerFlag="name"
          onChange={handleChange}
          validator={validateLogin}
        />

        <FormField
          value={login}
          label={t('auth.login')}
          text={t('auth.rules.login')}
          handlerFlag="login"
          onChange={handleChange}
          validator={validateLogin}
        />

        <FormField
          value={psw}
          label={t('auth.psw')}
          text={t('auth.rules.psw')}
          handlerFlag="psw"
          onChange={handleChange}
          validator={validatePsw}
        />

        <Button
          className={styles['sign-up__btn']}
          type="submit"
          variant="contained"
          disabled={validateLogin(name) || validateLogin(login) || validatePsw(psw)}
          onClick={handleSignUp}
        >
          {t('auth.signUpBtn')}
        </Button>
        <Box className={styles.terms}>
          <Link className={styles['terms__link']} to="signin" replace>
            {t('auth.terms')}
          </Link>
        </Box>
      </Box>
    </>
  );
};
