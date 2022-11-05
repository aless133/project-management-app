import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import { FormField } from 'components/FormField';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { SignUpFlags } from 'types';
import { Constants, validateLogin, validatePsw } from 'utils';
import styles from './SignUp.module.scss';

export const SignUpPage = () => {
  const [name, setName] = useState('');
  const [login, setLogin] = useState('');
  const [psw, setPsw] = useState('');
  const [t] = useTranslation();

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: SignUpFlags
  ): void => {
    if (field === Constants.LOGIN) {
      setLogin(event.target.value);
    }
    if (field === Constants.NAME) {
      setName(event.target.value);
    }
    if (field === Constants.PSW) {
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
          handlerFlag={Constants.LOGIN}
          onChange={handleChange}
          validator={validateLogin}
        />

        <FormField
          value={psw}
          label={t('auth.psw')}
          text={t('auth.rules.psw')}
          handlerFlag={Constants.PSW}
          onChange={handleChange}
          validator={validatePsw}
        />

        <Button
          className={styles['sign-up__btn']}
          variant="contained"
          disabled={validateLogin(name) || validateLogin(login) || validatePsw(psw)}
          onClick={handleSignUp}
        >
          {t('auth.signUpBtn')}
        </Button>
        <Box className={styles.terms}>
          <Link className={styles['terms__link']} to={Constants.SIGN_IN} replace>
            {t('auth.terms')}
          </Link>
        </Box>
      </Box>
    </>
  );
};
