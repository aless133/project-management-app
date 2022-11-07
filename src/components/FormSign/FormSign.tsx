import React from 'react';
import { Button, TextField, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Link } from 'react-router-dom';
import { useFormSign } from 'hooks/formSign.hook';
import { Constants } from 'utils';

export const FormSign = ({ isName = true }) => {
  const { t, errStack, inValid, handleSubmit, handleChange } = useFormSign();

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
