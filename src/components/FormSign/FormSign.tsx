import React, { useState } from 'react';
import Container from '@mui/system/Container';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import Grid from '@mui/material/Grid';
import styles from './formsign.module.scss';
import { TErr, TValidator } from 'types';
import {
  validateMaxLength,
  validateMinLength,
  validatePassword,
  Constants,
  isErrCheck,
} from 'utils';
import { Link } from 'react-router-dom';

const validator: TValidator = {
  [Constants.NAME]: [validateMinLength, validateMaxLength],
  [Constants.LOGIN]: [validateMinLength, validateMaxLength],
  [Constants.PASSWORD]: [validatePassword],
};

const err: TErr = {
  [Constants.NAME]: '',
  [Constants.LOGIN]: '',
  [Constants.PASSWORD]: '',
};

export const FormSign = ({ isSignUp = true }) => {
  const [t] = useTranslation();
  const [inValid, setInValid] = useState(false);
  const [errStack, setErrStack] = useState<TErr>(err);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    for (const [name, value] of formData.entries()) {
      if (typeof value === 'string') {
        err[name] = validator[name].reduce((acc, fn) => (acc += fn(value)), '');
      }
    }

    setErrStack({ ...err });

    if (!isErrCheck(err)) {
      setInValid(false);
    } else {
      setInValid(true);
    }
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;

    if (typeof value === 'string') {
      err[name] = validator[name].reduce((acc, fn) => (acc += fn(value)), '');
      setErrStack({ ...err });

      if (!isErrCheck(err)) {
        setInValid(false);
      } else {
        setInValid(true);
      }
    }
  };

  return (
    <main className={styles.form_sign}>
      <Container maxWidth="xl" sx={{ height: '100%' }}>
        <Grid container direction="row" justifyContent="center" alignItems="center">
          <Grid item xl={4}>
            <form onSubmit={handleSubmit}>
              <Typography variant="h3" component="h2" align="center">
                {isSignUp ? t('Sign Up') : t('Sign In')}
              </Typography>
              {isSignUp && (
                <TextField
                  error={!!errStack.name}
                  name={Constants.NAME}
                  fullWidth
                  id="signUpLogin"
                  label={t('Name')}
                  defaultValue=""
                  helperText={t(errStack.name)}
                  onChange={handleChange}
                  margin="normal"
                />
              )}
              <TextField
                error={!!errStack.login}
                name={Constants.LOGIN}
                fullWidth
                id="signUpLogin"
                label={t('Login')}
                defaultValue=""
                helperText={t(errStack.login)}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                error={!!errStack.password}
                name={Constants.PASSWORD}
                fullWidth
                id="signUpLogin"
                label={t('Password')}
                defaultValue=""
                helperText={t(errStack.password)}
                onChange={handleChange}
                margin="normal"
              />
              <Button
                type="submit"
                disabled={inValid}
                variant="contained"
                fullWidth
                size="large"
                sx={{ mt: 2 }}
              >
                {isSignUp ? t('Sign Up') : t('Sign In')}
              </Button>
              <Typography align="center" sx={{ mt: 2 }}>
                {isSignUp ? (
                  <>
                    <span>{t('Do you have an account?')}</span>{' '}
                    <Link to={Constants.SIGN_IN}>{t('Sign in')}</Link>
                  </>
                ) : (
                  <>
                    <span>{t("Don't have an account?")}</span>{' '}
                    <Link to={Constants.SIGN_UP}>{t('Sign up')}</Link>
                  </>
                )}
              </Typography>
            </form>
          </Grid>
        </Grid>
      </Container>
    </main>
  );
};
