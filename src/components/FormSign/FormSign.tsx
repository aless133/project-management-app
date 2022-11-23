import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Container from '@mui/system/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import LoadingButton from '@mui/lab/LoadingButton';
import CircularProgress from '@mui/material/CircularProgress';
import { Constants } from 'utils';
import { setMinMaxLengthError } from 'utils/helpers';
import { useFormSign } from 'hooks/formSign.hook';

export const FormSign = ({ isSignUp = true }) => {
  const {
    errStack,
    isSigninLoading,
    isSignupLoading,
    handleSubmit,
    handleChange,
    isSignInLoad,
    isSignUpLoad,
  } = useFormSign(isSignUp);
  const [t] = useTranslation();
  // const [inValid, setInValid] = useState<boolean | null>(null);

  // if (navigated) return null;

  // useEffect(() => {
  //   if (inValid === null || !isErrCheck(errStack)) {
  //     setInValid(false);
  //   } else {
  //     setInValid(true);
  //   }
  // }, [errStack, inValid]);

  return (
    <main style={{ display: 'flex', alignItems: 'center' }}>
      <Container maxWidth="xl" sx={{ height: '100%' }}>
        <Grid container direction="row" justifyContent="center" alignItems="center">
          <Grid item xl={4}>
            <form onSubmit={handleSubmit} onChange={handleChange}>
              <Typography variant="h3" component="h2" align="center">
                {isSignUp ? t('Sign Up') : t('Sign In')}
              </Typography>
              {isSignUp && (
                <TextField
                  error={!!errStack.name}
                  name="name"
                  fullWidth
                  autoFocus
                  label={t('Name')}
                  defaultValue=""
                  helperText={setMinMaxLengthError(errStack.name)}
                  margin="normal"
                />
              )}
              <TextField
                error={!!errStack.login}
                name="login"
                fullWidth
                autoFocus={isSignUp ? false : true}
                label={t('Login')}
                defaultValue=""
                helperText={setMinMaxLengthError(errStack.login)}
                margin="normal"
              />
              <TextField
                error={!!errStack.password}
                name="password"
                fullWidth
                label={t('Password')}
                defaultValue=""
                helperText={setMinMaxLengthError(errStack.password)}
                margin="normal"
                type="password"
              />
              <LoadingButton
                loading={isSignUp ? isSignUpLoad : isSignInLoad}
                loadingIndicator={<CircularProgress color="primary" size={25} />}
                type="submit"
                disabled={isSigninLoading || isSignupLoading}
                variant="contained"
                fullWidth
                size="large"
                sx={{ mt: 2 }}
              >
                {isSignUp ? t('Sign Up') : t('Sign In')}
              </LoadingButton>
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
