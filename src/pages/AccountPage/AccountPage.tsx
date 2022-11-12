import React, { useEffect, useState } from 'react';
import { TextField, Typography } from '@mui/material';
import Container from '@mui/system/Container';
import Grid from '@mui/material/Grid';
import { LoadingButton } from '@mui/lab';
import { isErrCheck, setMinMaxLengthError } from 'utils/helpers';
import { useStoreSelector } from 'hooks/store.hooks';
import { useCheckAccess } from 'hooks/checkAccess';
import { useFormSign } from 'hooks/formSign.hook';
import { selectUser } from 'store/userSlice';
import { Notifyer } from 'components/UI/Notifyer';

export const AccountPage = () => {
  const {
    errStack,
    t,
    handleChange,
    handleSubmitProfile,
    isUpdateLoad,
    isSuccess,
    isDeleteLoad,
    isFail,
    handleCloseNotify,
    handleDelete,
  } = useFormSign(false);
  const [inValid, setInValid] = useState<boolean>(false);
  const { name, login, id } = useStoreSelector(selectUser);
  useCheckAccess('user');

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
              <Notifyer
                open={isSuccess}
                onclose={() => handleCloseNotify('success')}
                text="Successfully"
                type="success"
              />
              <Notifyer
                open={isFail}
                onclose={() => handleCloseNotify('error')}
                text="Something went wrong"
                type="error"
              />
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
            <LoadingButton
              loading={isDeleteLoad}
              type="submit"
              color="error"
              disabled={inValid}
              variant="outlined"
              fullWidth
              size="large"
              sx={{ mt: 2 }}
              onClick={() => id && handleDelete(id)}
            >
              {t('Delete account')}
            </LoadingButton>
          </Grid>
        </Grid>
      </Container>
    </main>
  );
};
