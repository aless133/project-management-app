import { Box, Link, Typography } from '@mui/material';
import React from 'react';
import Container from '@mui/system/Container';
import { useTranslation } from 'react-i18next';

export const WelcomePage = () => {
  const { t } = useTranslation();

  return (
    <main>
      <Box sx={{ pt: 5, pb: 5 }}>
        <Container maxWidth={'xl'}>
          <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: 5 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: { xs: 'column', md: 'row', lg: 'row' },
                alignItems: 'center',
                gap: 5,
                width: '100%',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: { xs: 'center', sm: 'center', md: 'start', lg: 'start' },
                  rowGap: 4,
                  maxWidth: { xs: '100%', sm: '100%', md: '50%', lg: '50%' },
                }}
              >
                <Typography
                  variant="h2"
                  component="h2"
                  sx={{
                    textAlign: { xs: 'center', sm: 'center', md: 'start', lg: 'start' },
                    fontWeight: 800,
                    fontSize: { xs: 30, sm: 40, md: 40, lg: 60 },
                  }}
                >
                  {t('Project Management')}
                </Typography>
                <Box>
                  <Typography
                    variant="h5"
                    component="p"
                    sx={{
                      textAlign: { xs: 'center', sm: 'center', md: 'start', lg: 'start' },
                      fontWeight: 400,
                      fontSize: { xs: 20, sm: 20, md: 26, lg: 30 },
                    }}
                  >
                    {t(
                      'It is a project management tool that helps to visualize tasks, limit the amount of work in progress and achieve maximum efficiency.'
                    )}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ width: '100%', height: '100%' }}>
                <Box
                  sx={{
                    width: '100%',
                    minHeight: { xs: 200, sm: 300, md: 400, lg: 400 },
                    backgroundImage: 'url(./board-1.svg)',
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                  }}
                />
              </Box>
            </Box>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                rowGap: { sx: 2, sm: 2, md: 3, lg: 5 },
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography
                  variant="h2"
                  component="h2"
                  sx={{ fontWeight: 800, fontSize: { xs: 30, sm: 40, md: 40, lg: 50 } }}
                >
                  Our Team
                </Typography>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  flexDirection: { xs: 'column', sm: 'row', md: 'row', lg: 'row' },
                  gap: 2,
                }}
              >
                <Box sx={{ width: '100%' }}>
                  <Link
                    href="https://github.com/aless133"
                    target="_blank"
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textDecoration: 'none',
                    }}
                  >
                    <Box
                      sx={{
                        width: '100%',
                        minHeight: { xs: 120, sm: 200, md: 300, lg: 350 },
                        backgroundImage: 'url(./dev3.png)',
                        backgroundSize: 'contain',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                      }}
                    />
                    <Typography
                      variant="h6"
                      component="span"
                      sx={{ color: '#000000', fontSize: 22 }}
                    >
                      aless133
                    </Typography>
                  </Link>
                </Box>
                <Box sx={{ width: '100%' }}>
                  <Link
                    href="https://github.com/PartyZzzan77"
                    target="_blank"
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textDecoration: 'none',
                    }}
                  >
                    <Box
                      sx={{
                        width: '100%',
                        minHeight: { xs: 120, sm: 200, md: 300, lg: 350 },
                        backgroundImage: 'url(./dev2.png)',
                        backgroundSize: 'contain',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                      }}
                    />
                    <Typography
                      variant="h6"
                      component="span"
                      sx={{ color: '#000000', fontSize: 22 }}
                    >
                      PartyZzzan77
                    </Typography>
                  </Link>
                </Box>
                <Box sx={{ width: '100%' }}>
                  <Link
                    href="https://github.com/DimaTeniuta"
                    target="_blank"
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textDecoration: 'none',
                    }}
                  >
                    <Box
                      sx={{
                        width: '100%',
                        minHeight: { xs: 120, sm: 200, md: 300, lg: 350 },
                        backgroundImage: 'url(./dev1.png)',
                        backgroundSize: 'contain',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                      }}
                    />
                    <Typography
                      variant="h6"
                      component="span"
                      sx={{ color: '#000000', fontSize: 22 }}
                    >
                      DimaTeniuta
                    </Typography>
                  </Link>
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </main>
  );
};
