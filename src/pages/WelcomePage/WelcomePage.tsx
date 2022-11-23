import { Box, Button, Link, Typography } from '@mui/material';
import React from 'react';
import Container from '@mui/system/Container';
import { useTranslation } from 'react-i18next';
import { useStoreSelector } from 'hooks/store.hooks';
import { selectIsLogged } from 'store/userSlice';
import { useNavigate } from 'react-router-dom';
import { Constants } from 'utils';

const WelcomePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const isAuth = useStoreSelector(selectIsLogged);

  const handleClick = () => {
    isAuth ? navigate(Constants.MAIN) : navigate(Constants.SIGN_IN);
  };

  return (
    <main>
      <Box sx={{ pt: 5, pb: 5 }}>
        <Container maxWidth={'xl'}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              rowGap: { xs: 5, sm: 8, md: 8, lg: 10 },
            }}
          >
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
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box
                    sx={{
                      width: { xs: 35, sm: 40, md: 40, lg: 60 },
                      height: { xs: 35, sm: 40, md: 40, lg: 60 },
                      mr: 1,
                      backgroundImage: 'url(./logo.svg)',
                      backgroundSize: 'contain',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                    }}
                  />
                  <Typography
                    variant="h2"
                    component="h2"
                    color="primary.main"
                    sx={{
                      textAlign: { xs: 'center', sm: 'center', md: 'start', lg: 'start' },
                      fontWeight: 800,
                      fontSize: { xs: 22, sm: 34, md: 34, lg: 50 },
                    }}
                  >
                    {t('Project Management')}
                  </Typography>
                </Box>

                <Box>
                  <Typography
                    variant="h5"
                    component="p"
                    sx={{
                      color: 'gray',
                      textAlign: { xs: 'center', sm: 'center', md: 'start', lg: 'start' },
                      fontWeight: 400,
                      fontSize: { xs: 16, sm: 18, md: 22, lg: 30 },
                    }}
                  >
                    {t(
                      'It is a project management tool that helps to visualize tasks, limit the amount of work in progress and achieve maximum efficiency.'
                    )}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: { xs: 'center', sm: 'center', md: 'end', lg: 'end' },
                    width: '100%',
                  }}
                >
                  <Button
                    variant="contained"
                    sx={{
                      width: { xs: 200, sm: 200, md: 200, lg: 300 },
                      height: { xs: 50, sm: 50, md: 50, lg: 60 },
                      borderRadius: 22,
                      backgroundColor: '#ff7961',
                      fontSize: { xs: 18, sm: 18, md: 20, lg: 22 },
                      ':hover': {
                        backgroundColor: '#f44336',
                      },
                    }}
                    onClick={handleClick}
                  >
                    {t('Get started')}
                  </Button>
                </Box>
              </Box>

              <Box sx={{ width: '100%', height: '100%' }}>
                <Box
                  sx={{
                    width: '100%',
                    minHeight: { xs: 200, sm: 300, md: 400, lg: 400 },
                    backgroundImage: 'url(./board-1.png)',
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
                  color="primary.main"
                  sx={{ fontWeight: 800, fontSize: { xs: 22, sm: 34, md: 34, lg: 50 } }}
                >
                  {t('Our Team')}
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
                    <Typography variant="h6" component="span" sx={{ color: 'gray', fontSize: 22 }}>
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
                    <Typography variant="h6" component="span" sx={{ color: 'gray', fontSize: 22 }}>
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
                    <Typography variant="h6" component="span" sx={{ color: 'gray', fontSize: 22 }}>
                      DimaTeniuta
                    </Typography>
                  </Link>
                </Box>
              </Box>
            </Box>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: { xs: 'column', sm: 'row', md: 'row', lg: 'row' },
                justifyContent: 'space-between',
                gap: 2,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  maxWidth: { xs: '100%', sm: '33%', md: '33%', lg: '33%' },
                }}
              >
                <Typography
                  variant="h6"
                  component="span"
                  sx={{
                    color: 'gray',
                    fontSize: { xs: 16, sm: 16, md: 20, lg: 22 },
                    textAlign: 'center',
                  }}
                >
                  {t(
                    'The RS School is working by the principle of Pay it forward. Members of our community share their knowledge and check students tasks for free. And we hope our students will continue this work as our mentors in the future.'
                  )}
                </Typography>
              </Box>

              <Box
                sx={{
                  order: { xs: -1, sm: 0, md: 0, lg: 0 },
                  width: { xs: '100%', sm: '33%', md: '33%', lg: '33%' },
                  mr: { xs: 2, sm: 2, md: 2, lg: 3 },
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    height: { xs: 120, sm: 200, md: 250, lg: 300 },
                    backgroundImage: 'url(./logo-rs.svg)',
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                  }}
                />
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  maxWidth: { xs: '100%', sm: '33%', md: '33%', lg: '33%' },
                }}
              >
                <Typography
                  variant="h6"
                  component="span"
                  sx={{
                    color: 'gray',
                    fontSize: { xs: 16, sm: 16, md: 20, lg: 22 },
                    textAlign: 'center',
                  }}
                >
                  {t(
                    'RS School is free-of-charge and community-based education program conducted by The Rolling Scopes developer community since 2013.'
                  )}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </main>
  );
};

export default WelcomePage;
