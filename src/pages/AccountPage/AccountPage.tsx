import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Container from '@mui/system/Container';
import Grid from '@mui/material/Grid';
import LoadingButton from '@mui/lab/LoadingButton';
import { isErrCheck, setMinMaxLengthError } from 'utils/helpers';
import { useStoreSelector } from 'hooks/store.hooks';
import { useFormSign } from 'hooks/formSign.hook';
import { selectUser } from 'store/userSlice';
import { useAppContext } from 'app.context';
import Button from '@mui/material/Button';
import { Constants } from 'utils';
import { Link } from 'react-router-dom';

const AccountPage = () => {
  const { errStack, handleChange, handleSubmitProfile, isUpdateLoad, isDeleteLoad, handleDelete } =
    useFormSign(false);
  const [t] = useTranslation();
  const [inValid, setInValid] = useState<boolean>(false);
  const { name, login, id } = useStoreSelector(selectUser);
  const { confirm } = useAppContext();

  const handleDeleteAccount = () => {
    confirm(() => handleDelete(id));
  };

  useEffect(() => {
    if (!isErrCheck(errStack)) {
      setInValid(false);
    } else {
      setInValid(true);
    }
  }, [errStack, inValid]);

  return (
    <main style={{ display: 'flex', alignItems: 'center' }}>
      <Container maxWidth="xl" sx={{ height: '100%' }}>
        <Grid container direction="row" justifyContent="center" alignItems="center">
          <Grid item xl={4}>
            <form onChange={handleChange} onSubmit={handleSubmitProfile}>
              <Typography
                variant="h3"
                component="h2"
                align="center"
                sx={{
                  fontSize: { xs: 22, sm: 34, md: 34, lg: 40 },
                  mt: { xs: 5 },
                }}
              >
                {t('Edit Account')}
              </Typography>
              <TextField
                error={!!errStack.name}
                name="name"
                autoFocus
                fullWidth
                label={t('Name')}
                defaultValue={name || ''}
                helperText={setMinMaxLengthError(errStack.name)}
                margin="normal"
              />

              <TextField
                error={!!errStack.login}
                name="login"
                fullWidth
                label={t('Login')}
                defaultValue={login || ''}
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
                loading={isUpdateLoad}
                loadingIndicator={<CircularProgress color="primary" size={25} />}
                type="submit"
                disabled={inValid}
                variant="contained"
                fullWidth
                size="large"
                sx={{ mt: 2 }}
              >
                {t('Save')}
              </LoadingButton>
            </form>
            <Button
              component={Link}
              to={Constants.MAIN}
              color="primary"
              variant="outlined"
              fullWidth
              size="large"
              sx={{ mt: 2 }}
            >
              {t('Cancel')}
            </Button>
            <LoadingButton
              loading={isDeleteLoad}
              loadingIndicator={<CircularProgress color="primary" size={25} />}
              type="submit"
              color="error"
              disabled={inValid}
              variant="outlined"
              fullWidth
              size="large"
              sx={{ mt: 2 }}
              onClick={handleDeleteAccount}
            >
              {t('Delete account')}
            </LoadingButton>
          </Grid>
        </Grid>
      </Container>
    </main>
  );
};

export default AccountPage;
