import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
  FormGroup,
  FormControlLabel,
  Switch,
  Box,
  Link,
  createTheme,
  ThemeProvider,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { House } from '@mui/icons-material';
import { Trans, useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0288d1',
    },
    secondary: {
      main: '#e3f2fd',
      contrastText: 'blue',
    },
  },
});

export const Header = () => {
  const [lang, setLang] = useState(true);
  const { i18n } = useTranslation();

  useEffect(() => {
    lang ? i18n.changeLanguage('en') : i18n.changeLanguage('ru');
  }, [i18n, lang]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLang(event.target.checked);
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" sx={{ color: 'primary.main' }}>
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: { xs: 'column', md: 'row' },
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              size="large"
              edge="start"
              aria-label="menu"
              sx={{ mr: { xs: 0, md: 1 }, color: 'secondary.main' }}
            >
              <Link
                component={NavLink}
                sx={{
                  color: 'inherit',
                  textDecoration: 'none',
                  '&.active': {
                    color: 'secondary.contrastText',
                  },
                }}
                to="/"
              >
                <House sx={{ mt: 1 }} />
              </Link>
            </IconButton>
            <Typography variant="h6" component="span" sx={{ flexGrow: 1, color: 'secondary.main' }}>
              <Trans i18nKey={'welcome.home'}></Trans>
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <FormGroup>
              <FormControlLabel
                sx={{ mr: 3, color: 'secondary.main' }}
                control={
                  <Switch
                    checked={lang}
                    onChange={handleChange}
                    color="default"
                    aria-label="login switch"
                  />
                }
                label={lang ? 'EN' : 'RU'}
              />
            </FormGroup>

            <Button sx={{ width: 80, mr: 2, color: 'secondary.main' }}>
              <Link
                component={NavLink}
                sx={{
                  color: 'inherit',
                  textDecoration: 'none',
                  '&.active': {
                    color: 'secondary.contrastText',
                  },
                }}
                to="/auth"
              >
                <Trans i18nKey={'welcome.signin'}></Trans>
              </Link>
            </Button>
            <Button sx={{ width: 105, color: 'secondary.main' }}>
              <Link
                component={NavLink}
                sx={{
                  color: 'inherit',
                  textDecoration: 'none',
                  '&.active': {
                    color: 'secondary.contrastText',
                  },
                }}
                to="/reg"
              >
                <Trans i18nKey={'welcome.signup'}></Trans>
              </Link>
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};
