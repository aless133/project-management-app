import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
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

export const FormSign = ({ isName = true }) => {
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
    <form onSubmit={handleSubmit}>
      <Grid2
        sx={{ mt: '2rem' }}
        container
        spacing={4}
        justifyContent="center"
        alignItems="center"
        direction="column"
      >
        <Grid2 xl={3} textAlign="center">
          <Typography variant="h3" component="h2">
            {isName ? t('Sign Up') : t('Sign In')}
          </Typography>
        </Grid2>
        {isName && (
          <Grid2 xl={3}>
            <TextField
              error={!!errStack.name}
              name={Constants.NAME}
              fullWidth
              id="signUpLogin"
              label={t('Name')}
              defaultValue=""
              helperText={t(errStack.name)}
              onChange={handleChange}
            />
          </Grid2>
        )}
        <Grid2 xl={3}>
          <TextField
            error={!!errStack.login}
            name={Constants.LOGIN}
            fullWidth
            id="signUpLogin"
            label={t('Login')}
            defaultValue=""
            helperText={t(errStack.login)}
            onChange={handleChange}
          />
        </Grid2>
        <Grid2 xl={3}>
          <TextField
            error={!!errStack.password}
            name={Constants.PASSWORD}
            fullWidth
            id="signUpLogin"
            label={t('Password')}
            defaultValue=""
            helperText={t(errStack.password)}
            onChange={handleChange}
          />
        </Grid2>
        <Grid2 xl={3}>
          <Button type="submit" disabled={inValid}>
            {isName ? t('Sign Up') : t('Sign In')}
          </Button>
        </Grid2>
        <Grid2>
          <Link
            style={{ textDecoration: 'none', color: 'inherit' }}
            to={isName ? `${Constants.SIGN_IN}` : `${Constants.SIGN_UP}`}
            replace
          >
            {isName ? t(`Do you have an account? Sign in`) : t(`Do you have an account? Sign up`)}
          </Link>
        </Grid2>
      </Grid2>
    </form>
  );
};
