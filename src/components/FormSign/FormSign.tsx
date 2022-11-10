import React, { useState } from 'react';
import Container from '@mui/system/Container';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import styles from './formsign.module.scss';
import { Link } from 'react-router-dom';
import { Constants, isErrCheck, validateMaxLength, validateMinLength } from 'utils';
import { IApiError, TErr, TValidator } from 'types';
import { useTranslation } from 'react-i18next';
import { useSignInMutation, useSignUpMutation } from 'api/authApiSlice';
import { useStoreDispatch } from 'hooks/store.hooks';
import { setToken, setTokenLogged } from 'store/userSlice';
import { setMinMaxLengthError } from 'utils/helpers';
import { useCheckAccess } from 'hooks/checkAccess';

const validator: TValidator = {
  [Constants.NAME]: [
    validateMinLength(Constants.MIN_LENGTH),
    validateMaxLength(Constants.MAX_LENGTH),
  ],
  [Constants.LOGIN]: [
    validateMinLength(Constants.MIN_LENGTH),
    validateMaxLength(Constants.MAX_LENGTH),
  ],
  [Constants.PASSWORD]: [validateMinLength(Constants.PASSWORD_LENGTH)],
};

const err: TErr = {
  [Constants.NAME]: '',
  [Constants.LOGIN]: '',
  [Constants.PASSWORD]: '',
};

export const FormSign = ({ isSignUp = true }) => {
  useCheckAccess('guest');
  const [t] = useTranslation();
  const [inValid, setInValid] = useState(false);
  const [errStack, setErrStack] = useState<TErr>(err);
  const [signin, { isLoading: isSigninLoading }] = useSignInMutation();
  const [signup, { isLoading: isSignupLoading }] = useSignUpMutation();
  const dispatch = useStoreDispatch();

  // if (navigated) return null;

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    for (const [name, value] of formData.entries()) {
      if (typeof value === 'string') {
        err[name] = validator[name].reduce((acc, fn) => (acc += fn(value)), '');
      }

      setErrStack(err);
    }

    if (!isErrCheck(errStack)) {
      setInValid(false);

      const data = Object.fromEntries(formData.entries());
      if (isSignUp) {
        try {
          const signupData = await signup(data).unwrap();
          console.log(signupData);
          const signinData = await signin({
            login: data.login,
            password: data.password,
          }).unwrap();
          dispatch(setTokenLogged(signinData.token));
        } catch (err) {
          setErrStack({ submit: (err as IApiError).data.message });
        }
      } else {
        try {
          const signinData = await signin(data).unwrap();
          dispatch(setToken(signinData.token));
        } catch (err) {
          setErrStack({ submit: (err as IApiError).data.message });
        }
      }
    } else {
      setInValid(true);
    }
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;

    if (typeof value === 'string') {
      err[name] = validator[name].reduce((acc, fn) => (acc += fn(value)), '');
    }

    setErrStack(err);

    if (!isErrCheck(errStack)) {
      setInValid(false);
    } else {
      setInValid(true);
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
                  label={t('Name')}
                  defaultValue=""
                  helperText={setMinMaxLengthError(errStack.name)}
                  onChange={handleChange}
                  margin="normal"
                />
              )}
              <TextField
                error={!!errStack.login}
                name={Constants.LOGIN}
                fullWidth
                label={t('Login')}
                defaultValue=""
                helperText={setMinMaxLengthError(errStack.login)}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                error={!!errStack.password}
                name={Constants.PASSWORD}
                fullWidth
                label={t('Password')}
                defaultValue=""
                helperText={setMinMaxLengthError(errStack.password)}
                onChange={handleChange}
                margin="normal"
                type="password"
              />
              {errStack && errStack.submit ? (
                <Typography align="center" sx={{ mt: 2, color: 'error.main' }}>
                  {errStack.submit}
                </Typography>
              ) : null}
              <Button
                type="submit"
                disabled={inValid || isSigninLoading || isSignupLoading}
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
