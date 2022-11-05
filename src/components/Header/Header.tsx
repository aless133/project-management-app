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
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { House } from '@mui/icons-material';
import { Trans, useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

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
    <AppBar position="static">
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
            color="inherit"
            aria-label="menu"
            sx={{ mr: { xs: 0, md: 1 } }}
          >
            <Link
              component={NavLink}
              sx={{
                color: 'inherit',
                textDecoration: 'none',
                '&.active': {
                  color: 'blue',
                },
              }}
              to="/"
            >
              <House sx={{ mt: 1 }} />
            </Link>
          </IconButton>
          <Typography variant="h6" component="span" sx={{ flexGrow: 1 }}>
            <Trans i18nKey={'welcome.home'}></Trans>
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <FormGroup>
            <FormControlLabel
              sx={{ mr: 3 }}
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

          <Button color="inherit" sx={{ width: 80, mr: 2 }}>
            <Link
              component={NavLink}
              sx={{
                color: 'inherit',
                textDecoration: 'none',
                '&.active': {
                  color: 'blue',
                },
              }}
              to="/auth"
            >
              <Trans i18nKey={'welcome.signin'}></Trans>
            </Link>
          </Button>
          <Button color="inherit" sx={{ width: 105 }}>
            <Link
              component={NavLink}
              sx={{
                color: 'inherit',
                textDecoration: 'none',
                '&.active': {
                  color: 'blue',
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
  );
};
