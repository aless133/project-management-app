import React from 'react';
import Container from '@mui/system/Container';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import styles from './formsign.module.scss';
import { Link } from 'react-router-dom';
import { useFormSign } from 'hooks/formSign.hook';
import { Constants } from 'utils';

export const FormSign = ({ isSignUp = true }) => {
  const { errStack, inValid, isSigninLoading, t, handleSubmit, handleChange } =
    useFormSign(isSignUp);

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
                  helperText={t(errStack.name)}
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
                helperText={t(errStack.login)}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                error={!!errStack.password}
                name={Constants.PASSWORD}
                fullWidth
                label={t('Password')}
                defaultValue=""
                helperText={t(errStack.password)}
                onChange={handleChange}
                margin="normal"
                type="password"
              />
              {errStack.submit ? (
                <Typography align="center" sx={{ mt: 2, color: 'error.main' }}>
                  {errStack.submit}
                </Typography>
              ) : null}
              <Button
                type="submit"
                disabled={inValid || isSigninLoading /*|| isSignupLoading*/}
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
