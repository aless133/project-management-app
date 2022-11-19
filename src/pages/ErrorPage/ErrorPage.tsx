import React from 'react';
// import { Link } from 'react-router-dom';
import Link from '@mui/material/Link';
import { useTranslation } from 'react-i18next';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Constants } from 'utils';

export const ErrorPage = ({ isNotFound = true }) => {
  const { t } = useTranslation();

  const img = isNotFound ? './not_found.jpg' : './error_image.jpg';

  return (
    <main>
      <Container sx={{ pt: 15, pb: 10 }}>
        <Typography
          variant="h3"
          component="h3"
          sx={{
            textAlign: 'center',
            fontSize: { xs: 22, sm: 34, md: 34, lg: 50 },
          }}
        >
          {isNotFound ? t('Sorry, page not found') : t('Something went wrong')}...
        </Typography>
        <Grid container justifyContent="center" gap={2} my={4}>
          <Grid item>
            <Button component={Link} variant="contained" href={Constants.HOME}>
              {t('Back to Home')}
            </Button>
          </Grid>
          <Grid item>
            <Button
              component={Link}
              variant="contained"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.location.reload();
              }}
            >
              {t('Refresh page')}
            </Button>
          </Grid>
        </Grid>
        <Grid container justifyContent="center">
          <Grid item xs={8}>
            <img style={{ display: 'block', maxWidth: '100%' }} src={img} alt="broken robot" />
          </Grid>
        </Grid>
      </Container>
    </main>
  );
};
