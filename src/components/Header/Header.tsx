import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  FormGroup,
  FormControlLabel,
  Switch,
  Box,
  Link,
  Menu,
  MenuItem,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import { Container } from '@mui/system';
import DnsIcon from '@mui/icons-material/Dns';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';

export const Header = () => {
  const [lang, setLang] = useState(true);
  const { t, i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  // temporary variable for authorization user
  const isAuth = false;

  const goHome = () => {
    navigate('/');
  };

  const goSignUp = () => {
    navigate('/signup');
  };

  const goSignIn = () => {
    navigate('/signin');
  };

  const goMain = () => {
    navigate('/main');
  };

  const goAccount = () => {
    navigate('/account');
  };

  const onClickBoard = () => {
    // TO DO add function for open modal window
  };

  const onExit = () => {
    // TO DO add function for open modal window
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    lang ? i18n.changeLanguage('en') : i18n.changeLanguage('ru');
  }, [i18n, lang]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLang(event.target.checked);
  };

  return isAuth ? (
    <AppBar position="sticky" sx={{ color: 'primary.main' }}>
      <Container maxWidth="xl">
        <Toolbar
          disableGutters={true}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Box>
            <Button sx={{ color: 'secondary.main', fontSize: 14 }} onClick={goHome}>
              <Link
                component={NavLink}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  color: 'inherit',
                  textDecoration: 'none',
                  '&.active': {
                    color: 'secondary.contrastText',
                  },
                }}
                to="/"
              >
                <HomeIcon sx={{ mb: 0.5 }} />
                {t('Home')}
              </Link>
            </Button>
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'block', lb: 'block' } }}>
            <Button sx={{ color: 'secondary.main', fontSize: 14 }} onClick={onClickBoard}>
              <DashboardCustomizeIcon sx={{ mb: 0.5, mr: 1 }} />
              {t('Create Board')}
            </Button>
          </Box>

          <Box
            sx={{
              display: { xs: 'none', md: 'flex', lb: 'flex' },
              alignItems: 'center',
              width: 420,
            }}
          >
            <FormGroup>
              <FormControlLabel
                sx={{ mr: 1, color: 'secondary.main' }}
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

            <Button sx={{ mr: 1, color: 'secondary.main' }} onClick={goMain}>
              <Link
                component={NavLink}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  color: 'inherit',
                  textDecoration: 'none',
                  '&.active': {
                    color: 'secondary.contrastText',
                  },
                }}
                to="/main"
              >
                <DnsIcon sx={{ mb: 0.3, mr: 0.5 }} />
                {t('Main')}
              </Link>
            </Button>

            <Button sx={{ mr: 1, color: 'secondary.main' }} onClick={goAccount}>
              <Link
                component={NavLink}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  color: 'inherit',
                  textDecoration: 'none',
                  '&.active': {
                    color: 'secondary.contrastText',
                  },
                }}
                to="/account"
              >
                <AccountCircleIcon sx={{ mb: 0.3, mr: 0.5 }} />
                {t('Account')}
              </Link>
            </Button>

            <Button sx={{ mr: 1, color: 'secondary.main' }} onClick={onExit}>
              <LogoutIcon sx={{ mb: 0.3, mr: 0.5 }} />
              {t('Sign Out')}
            </Button>
          </Box>

          <Box sx={{ display: { xs: 'flex', md: 'none', lb: 'none' }, alignItems: 'center' }}>
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

            <IconButton
              size="large"
              aria-controls="menu-header"
              aria-haspopup="true"
              onClick={handleMenu}
              color="secondary"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-header"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                <Button sx={{ color: 'secondary', fontSize: 14 }} onClick={onClickBoard}>
                  <DashboardCustomizeIcon sx={{ mb: 0.5, mr: 1 }} />
                  {t('Create Board')}
                </Button>
              </MenuItem>

              <MenuItem onClick={handleClose}>
                <Button sx={{ mr: 1, color: 'secondary' }} onClick={goMain}>
                  <Link
                    component={NavLink}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      color: 'inherit',
                      textDecoration: 'none',
                      '&.active': {
                        color: 'secondary.contrastText',
                      },
                    }}
                    to="/main"
                  >
                    <DnsIcon sx={{ mb: 0.3, mr: 0.5 }} />
                    {t('Main')}
                  </Link>
                </Button>
              </MenuItem>

              <MenuItem onClick={handleClose}>
                <Button sx={{ mr: 1, color: 'secondary' }} onClick={goAccount}>
                  <Link
                    component={NavLink}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      color: 'inherit',
                      textDecoration: 'none',
                      '&.active': {
                        color: 'secondary.contrastText',
                      },
                    }}
                    to="/account"
                  >
                    <AccountCircleIcon sx={{ mb: 0.3, mr: 0.5 }} />
                    {t('Account')}
                  </Link>
                </Button>
              </MenuItem>

              <MenuItem onClick={handleClose}>
                <Button sx={{ mr: 1, color: 'secondary' }} onClick={onExit}>
                  <LogoutIcon sx={{ mb: 0.3, mr: 0.5 }} />
                  {t('Sign Out')}
                </Button>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  ) : (
    <AppBar position="sticky" sx={{ color: 'primary.main' }}>
      <Container maxWidth="xl">
        <Toolbar
          disableGutters={true}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Box>
            <Button sx={{ color: 'secondary.main', fontSize: 14 }} onClick={goHome}>
              <Link
                component={NavLink}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  color: 'inherit',
                  textDecoration: 'none',
                  '&.active': {
                    color: 'secondary.contrastText',
                  },
                }}
                to="/"
              >
                <HomeIcon sx={{ mb: 0.5 }} />
                {t('Home')}
              </Link>
            </Button>
          </Box>

          <Box
            sx={{
              display: { xs: 'none', md: 'flex', lb: 'flex' },
              justifyContent: 'space-between',
              width: 310,
            }}
          >
            <FormGroup>
              <FormControlLabel
                sx={{ mr: 1, color: 'secondary.main' }}
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

            <Button sx={{ mr: 1, color: 'secondary.main' }} onClick={goSignIn}>
              <Link
                component={NavLink}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  color: 'inherit',
                  textDecoration: 'none',
                  '&.active': {
                    color: 'secondary.contrastText',
                  },
                }}
                to="/signin"
              >
                <LoginIcon sx={{ mr: 0.3, mb: 0.3 }} />
                {t('Sign In')}
              </Link>
            </Button>

            <Button sx={{ color: 'secondary.main' }} onClick={goSignUp}>
              <Link
                component={NavLink}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  color: 'inherit',
                  textDecoration: 'none',
                  '&.active': {
                    color: 'secondary.contrastText',
                  },
                }}
                to="/signup"
              >
                <HowToRegIcon sx={{ mr: 0.3, mb: 0.3 }} />
                {t('Sign Up')}
              </Link>
            </Button>
          </Box>

          <Box sx={{ display: { xs: 'flex', md: 'none', lb: 'none' }, alignItems: 'center' }}>
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

            <IconButton
              size="large"
              aria-controls="menu-header"
              aria-haspopup="true"
              onClick={handleMenu}
              color="secondary"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-header"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                <Button sx={{ mr: 1, color: 'secondary' }} onClick={goSignIn}>
                  <Link
                    component={NavLink}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      color: 'inherit',
                      textDecoration: 'none',
                      '&.active': {
                        color: 'secondary.contrastText',
                      },
                    }}
                    to="/signin"
                  >
                    <LoginIcon sx={{ mr: 0.3, mb: 0.3 }} />
                    {t('Sign In')}
                  </Link>
                </Button>
              </MenuItem>

              <MenuItem onClick={handleClose}>
                <Button sx={{ color: 'secondary' }} onClick={goSignUp}>
                  <Link
                    component={NavLink}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      color: 'inherit',
                      textDecoration: 'none',
                      '&.active': {
                        color: 'secondary.contrastText',
                      },
                    }}
                    to="/signup"
                  >
                    <HowToRegIcon sx={{ mr: 0.3, mb: 0.3 }} />
                    {t('Sign Up')}
                  </Link>
                </Button>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
