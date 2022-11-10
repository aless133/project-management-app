import { Button, Grid, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import Container from '@mui/system/Container';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Constants } from 'utils';

export const ErrorPage = ({ text = 'Sorry, page not found' }) => {
  const { t } = useTranslation();

  return (
    <Container maxWidth="xl" sx={{ height: '100%', flexGrow: 1 }}>
      <Grid2 container rowGap={4} justifyContent="center" alignItems="center" sx={{ mt: 15 }}>
        <Grid item xl={8} sx={{ textAlign: 'center' }}>
          <Typography
            variant="h3"
            component="h3"
            sx={{
              fontSize: { xs: 22, sm: 34, md: 34, lg: 50 },
            }}
          >
            {t(text)}...
          </Typography>
        </Grid>
        <Grid item xl={4}>
          <img style={{ width: '100%' }} src="./broken_robot.png" alt="broken robot" />
        </Grid>
        <Grid item xl={10}>
          <Button variant="contained" sx={{ mr: 2, mt: { xs: 4 } }}>
            <Link
              style={{ textDecoration: 'none', color: 'inherit' }}
              to={Constants.MAIN}
              replace={true}
            >
              {t('Back to Home')}
            </Link>
          </Button>
          <Button variant="contained" sx={{ mt: { xs: 4 } }}>
            Action
          </Button>
        </Grid>
      </Grid2>
    </Container>
  );
};
