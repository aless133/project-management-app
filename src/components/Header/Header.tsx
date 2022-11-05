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
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';

export const Header = () => {
  const [lang, setLang] = useState(true);
  const { i18n } = useTranslation();
  const isAuth = false;

  useEffect(() => {
    lang ? i18n.changeLanguage('en') : i18n.changeLanguage('ru');
  }, [i18n, lang]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLang(event.target.checked);
  };

  return (
    <AppBar position="static" sx={{ color: 'primary.main' }}>
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', width: { lg: 320, md: 320 } }}>
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

        <Box sx={{ display: isAuth ? 'block' : 'none' }}>
          <Button sx={{ width: 150, color: 'secondary.main' }}>
            <Link
              component={NavLink}
              sx={{
                color: 'inherit',
                textDecoration: 'none',
                '&.active': {
                  color: 'secondary.contrastText',
                },
              }}
              to="/board"
            >
              <Trans i18nKey={'main.create.header'}></Trans>
            </Link>
          </Button>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row', lg: 'row' },
            alignItems: 'center',
          }}
        >
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

          <Box sx={{ display: isAuth ? 'none' : 'block' }}>
            <Button sx={{ width: 80, mr: 1, color: 'secondary.main' }}>
              <Link
                component={NavLink}
                sx={{
                  color: 'inherit',
                  textDecoration: 'none',
                  '&.active': {
                    color: 'secondary.contrastText',
                  },
                }}
                to="/singin"
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
                to="/singup"
              >
                <Trans i18nKey={'welcome.signup'}></Trans>
              </Link>
            </Button>
          </Box>

          <Box sx={{ display: isAuth ? 'block' : 'none' }}>
            <Button
              sx={{
                mr: { xs: 0, md: 1 },
                color: 'secondary.main',
                fontSize: 14,
              }}
            >
              <Link
                component={NavLink}
                sx={{
                  color: 'inherit',
                  display: 'flex',
                  textDecoration: 'none',
                  '&.active': {
                    color: 'secondary.contrastText',
                  },
                }}
                to="/account"
              >
                <AccountCircleRoundedIcon sx={{ mr: 1 }} />
                <Trans i18nKey={'welcome.account'}></Trans>
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
                to="/singup"
              >
                <Trans i18nKey={'welcome.signout'}></Trans>
              </Link>
            </Button>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
