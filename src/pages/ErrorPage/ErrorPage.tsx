import React from 'react';
// import { Link } from 'react-router-dom';
import Link from '@mui/material/Link';
import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Constants } from 'utils';

export const ErrorPage = ({ isNotFound = true }) => {
  const { t } = useTranslation();

  const img = isNotFound ? './not_found.jpg' : './error_image.jpg';

  return (
    <main>
      <Grid2 container justifyContent="center" alignItems="center" sx={{ mt: 15 }}>
        <Grid item xl={8} sx={{ textAlign: 'center', justifyContent:center }}>
          <Typography
            variant="h3"
            component="h3"
            sx={{
              fontSize: { xs: 22, sm: 34, md: 34, lg: 50 },
            }}
          >
            {isNotFound ? t('Sorry, page not found') : t('Something went wrong')}...
          </Typography>
          <Grid item xl={10}>
            <Button variant="contained" sx={{ mr: 2, mt: { xs: 4 } }}>
              <Link sx={{ textDecoration: 'none', color: 'inherit' }} href={Constants.HOME}>
                {t('Back to Home')}
              </Link>
            </Button>
            <Button variant="contained" sx={{ mr: 2, mt: { xs: 4 } }}>
              <Link
                sx={{ textDecoration: 'none', color: 'inherit' }}
                href="3"
                onClick={() => window.location.reload()}
              >
                {t('Refresh page')}
              </Link>
            </Button>
          </Grid>
        </Grid>
        <Grid item xl={4}>
          <img
            style={{ display: 'block', width: '50%', margin: 'auto' }}
            src={img}
            alt="broken robot"
          />
        </Grid>
      </Grid2>
    </main>
  );
};
