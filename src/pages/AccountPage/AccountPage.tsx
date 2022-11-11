import React, { useEffect, useState } from 'react';
import { TextField, Typography } from '@mui/material';
import { isErrCheck, setMinMaxLengthError } from 'utils/helpers';
import { useFormSign } from 'hooks/formSign.hook';
import Container from '@mui/system/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useStoreSelector } from 'hooks/store.hooks';
import { selectUser } from 'store/userSlice';
import { useDeleteUserMutation } from 'api/usersApiSlice';

export const AccountPage = () => {
  const { errStack, t, handleChange, handleSubmitProfile } = useFormSign(false);
  const [inValid, setInValid] = useState<boolean>(false);
  const { name, login, id } = useStoreSelector(selectUser);

  const [deleteUser] = useDeleteUserMutation();

  //TODO Confirmation Modal
  const handleDelete = async (id: string) => {
    if (!id) {
      return;
    }
    await deleteUser(id);
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
                fullWidth
                label={t('Name')}
                defaultValue={name}
                helperText={setMinMaxLengthError(errStack.name) || ' '}
                margin="normal"
              />

              <TextField
                error={!!errStack.login}
                name="login"
                fullWidth
                label={t('Login')}
                defaultValue={login}
                helperText={setMinMaxLengthError(errStack.login) || ' '}
                margin="normal"
              />
              <TextField
                error={!!errStack.password}
                name="password"
                fullWidth
                label={t('Password')}
                defaultValue=""
                helperText={setMinMaxLengthError(errStack.password) || ' '}
                margin="normal"
                type="password"
              />
              <Button
                type="submit"
                disabled={inValid}
                variant="contained"
                fullWidth
                size="large"
                sx={{ mt: 2 }}
              >
                {t('Save')}
              </Button>
            </form>
            <Button
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
            </Button>
          </Grid>
        </Grid>
      </Container>
    </main>
  );
};
