import { Box, Button, Typography } from '@mui/material';
import { FormField } from 'components/FormField';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, Navigate } from 'react-router-dom';
import { SignUpFlags } from 'types';
import { Constants, validateLogin, validatePsw } from 'utils';
import styles from './SignInPage.module.scss';

export const SignInPage = () => {
  const token = 'yes'; //useSelector
  const [login, setLogin] = useState('');
  const [psw, setPsw] = useState('');
  const [t] = useTranslation();

  if (token) {
    return <Navigate to={Constants.MAIN} replace={true} />;
  }

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: SignUpFlags
  ): void => {
    if (field === Constants.LOGIN) {
      setLogin(event.target.value);
    }
    if (field === Constants.PSW) {
      setPsw(event.target.value);
    }
  };

  const handleSignIn: React.MouseEventHandler<HTMLButtonElement> = () => {
    // reducer action
    setLogin('');
    setPsw('');
  };

  return (
    <>
      <Box component="form" className={styles['sign-in']} noValidate autoComplete="off">
        <Typography className={styles['sign-in__title']} variant="h3" component="h2">
          {t('auth.titleSignIn')}
        </Typography>
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
          className={styles['sign-in__btn']}
          variant="contained"
          disabled={validateLogin(login) || validatePsw(psw)}
          onClick={handleSignIn}
        >
          {t('auth.signInBtn')}
        </Button>
        <Box className={styles.terms}>
          <Link className={styles['terms__link']} to={Constants.SIGN_UP} replace>
            {t('auth.termsSignUp')}
          </Link>
        </Box>
      </Box>
    </>
  );
};
