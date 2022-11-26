import { Box, Link, Typography, Paper } from '@mui/material';
import Container from '@mui/system/Container';
import React from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';

export const Footer = () => {
  return (
    <Paper component="footer" sx={{ backgroundColor: 'primary.main', /* mt: 5,*/ borderRadius: 0 }}>
      <Container maxWidth={'xl'}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row', lb: 'row' },
            justifyContent: { xs: 'center', md: 'space-between', lb: 'space-between' },
            alignItems: { xs: 'center', md: 'space-between', lb: 'space-between' },
            rowGap: 2,
            pt: 1,
            pb: 1,
          }}
        >
          <Box sx={{ display: { xs: 'none', md: 'block', lb: 'block' } }}>
            <Link href="https://rs.school/react/">
              <Box
                component="img"
                sx={{
                  height: 30,
                }}
                alt="rss"
                src="https://rs.school/images/rs_school_js.svg"
              />
            </Link>
          </Box>

          <Box
            sx={{
              display: 'flex',
              gap: { xs: 1, md: 3, lb: 3 },
              flexDirection: { xs: 'column', md: 'row', lb: 'row' },
            }}
          >
            <Link
              href="https://github.com/aless133"
              target="_blank"
              rel="noreferrer"
              sx={{
                display: 'flex',
                alignItems: 'center',
                color: 'secondary.main',
                textDecoration: 'none',
              }}
            >
              <GitHubIcon color="secondary" sx={{ mr: 1 }} />
              <Typography variant="h6" component="span" sx={{ fontSize: 16 }}>
                aless133
              </Typography>
            </Link>

            <Link
              href="https://github.com/PartyZzzan77"
              target="_blank"
              rel="noreferrer"
              sx={{
                display: 'flex',
                alignItems: 'center',
                color: 'secondary.main',
                textDecoration: 'none',
              }}
            >
              <GitHubIcon color="secondary" sx={{ mr: 1 }} />
              <Typography variant="h6" component="span" sx={{ fontSize: 16 }}>
                PartyZzzan77
              </Typography>
            </Link>

            <Link
              href="https://github.com/DimaTeniuta"
              target="_blank"
              rel="noreferrer"
              sx={{
                display: 'flex',
                alignItems: 'center',
                color: 'secondary.main',
                textDecoration: 'none',
              }}
            >
              <GitHubIcon color="secondary" sx={{ mr: 1 }} />
              <Typography variant="h6" component="span" sx={{ fontSize: 16 }}>
                DimaTeniuta
              </Typography>
            </Link>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', columnGap: 4 }}>
            <Typography variant="h6" component="span" sx={{ fontSize: 16 }}>
              &copy;2022
            </Typography>

            <Box sx={{ display: { xs: 'block', md: 'none', lb: 'none' } }}>
              <Link href="https://rs.school/react/">
                <Box
                  component="img"
                  sx={{
                    height: 30,
                  }}
                  alt="rss"
                  src="https://rs.school/images/rs_school_js.svg"
                />
              </Link>
            </Box>
          </Box>
        </Box>
      </Container>
    </Paper>
  );
};
