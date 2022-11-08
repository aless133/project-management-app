import { Box, Typography } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';

export const WelcomePage = () => {
  return (
    <main>
      <Box sx={{ pt: 5, pb: 5 }}>
        <Container maxWidth={'xl'}>
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
                rowGap: 5,
                maxWidth: { xs: '100%', sm: '100%', md: '50%', lg: '50%' },
              }}
            >
              <Typography
                variant="h2"
                component="h1"
                sx={{
                  textAlign: { xs: 'center', sm: 'center', md: 'start', lg: 'start' },
                  fontWeight: 800,
                  fontSize: { xs: 30, sm: 40, md: 40, lg: 60 },
                }}
              >
                Project Management
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
                  It is a project management tool that helps to visualize tasks, limit the amount of
                  work in progress and achieve maximum efficiency.
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
              ></Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </main>
  );
};
