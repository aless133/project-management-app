import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  FormGroup,
  FormControlLabel,
  Switch,
  Box,
  Menu,
  MenuItem,
  useScrollTrigger,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import Container from '@mui/system/Container';
import DnsIcon from '@mui/icons-material/Dns';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { /*selectUser, */ selectIsLogged } from 'store/userSlice';
import { useStoreSelector } from 'hooks/store.hooks';
import { Constants } from 'utils';

export const Header = () => {
  const [lang, setLang] = useState(true);
  const { t, i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const trigger = useScrollTrigger({ disableHysteresis: true });

  const isAuth = useStoreSelector(selectIsLogged);

  const openBoardModal = () => {
    // TO DO add function for open modal window
  };

  const openExitModal = () => {
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
    <AppBar position="sticky" sx={{ backgroundColor: 'primary.main' }}>
      <Container maxWidth="xl">
        <Toolbar
          disableGutters={true}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            pt: trigger ? 1 : 0,
            pb: trigger ? 1 : 0,
          }}
        >
          <Box>
            <Button
              component={NavLink}
              sx={{
                display: 'flex',
                alignItems: 'center',
                color: 'secondary.main',
                fontSize: 14,
                textDecoration: 'none',
                '&.active': {
                  color: 'secondary.contrastText',
                },
              }}
              to={Constants.HOME}
            >
              <HomeIcon sx={{ mb: 0.5 }} />
              {t('Home')}
            </Button>
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'block', lb: 'block' } }}>
            <Button sx={{ color: 'secondary.main', fontSize: 14 }} onClick={openBoardModal}>
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

            <Button
              component={NavLink}
              sx={{
                display: 'flex',
                alignItems: 'center',
                mr: 1,
                color: 'secondary.main',
                textDecoration: 'none',
                '&.active': {
                  color: 'secondary.contrastText',
                },
              }}
              to={Constants.MAIN}
            >
              <DnsIcon sx={{ mb: 0.3, mr: 0.5 }} />
              {t('Main')}
            </Button>

            <Button
              component={NavLink}
              sx={{
                display: 'flex',
                alignItems: 'center',
                mr: 1,
                color: 'secondary.main',
                textDecoration: 'none',
                '&.active': {
                  color: 'secondary.contrastText',
                },
              }}
              to={Constants.ACCOUNT}
            >
              <AccountCircleIcon sx={{ mb: 0.3, mr: 0.5 }} />
              {t('Account')}
            </Button>

            <Button sx={{ mr: 1, color: 'secondary.main' }} onClick={openExitModal}>
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
                <Button sx={{ color: 'secondary', fontSize: 14 }} onClick={openBoardModal}>
                  <DashboardCustomizeIcon sx={{ mb: 0.5, mr: 1 }} />
                  {t('Create Board')}
                </Button>
              </MenuItem>

              <MenuItem onClick={handleClose}>
                <Button
                  component={NavLink}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mr: 1,
                    color: 'secondary',
                    textDecoration: 'none',
                    '&.active': {
                      color: 'secondary.contrastText',
                    },
                  }}
                  to={Constants.MAIN}
                >
                  <DnsIcon sx={{ mb: 0.3, mr: 0.5 }} />
                  {t('Main')}
                </Button>
              </MenuItem>

              <MenuItem onClick={handleClose}>
                <Button
                  component={NavLink}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mr: 1,
                    color: 'secondary',
                    textDecoration: 'none',
                    '&.active': {
                      color: 'secondary.contrastText',
                    },
                  }}
                  to={Constants.ACCOUNT}
                >
                  <AccountCircleIcon sx={{ mb: 0.3, mr: 0.5 }} />
                  {t('Account')}
                </Button>
              </MenuItem>

              <MenuItem onClick={handleClose}>
                <Button sx={{ mr: 1, color: 'secondary' }} onClick={openExitModal}>
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
    <AppBar position="sticky" sx={{ backgroundColor: 'primary.main' }}>
      <Container maxWidth="xl">
        <Toolbar
          disableGutters={true}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            pt: trigger ? 1 : 0,
            pb: trigger ? 1 : 0,
          }}
        >
          <Box>
            <Button
              component={NavLink}
              sx={{
                display: 'flex',
                alignItems: 'center',
                color: 'secondary.main',
                fontSize: 14,
                textDecoration: 'none',
                '&.active': {
                  color: 'secondary.contrastText',
                },
              }}
              to={Constants.HOME}
            >
              <HomeIcon sx={{ mb: 0.5 }} />
              {t('Home')}
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

            <Button
              component={NavLink}
              sx={{
                display: 'flex',
                alignItems: 'center',
                mr: 1,
                color: 'secondary.main',
                textDecoration: 'none',
                '&.active': {
                  color: 'secondary.contrastText',
                },
              }}
              to={Constants.SIGN_IN}
            >
              <LoginIcon sx={{ mr: 0.3, mb: 0.3 }} />
              {t('Sign In')}
            </Button>

            <Button
              component={NavLink}
              sx={{
                display: 'flex',
                alignItems: 'center',
                color: 'secondary.main',
                textDecoration: 'none',
                '&.active': {
                  color: 'secondary.contrastText',
                },
              }}
              to={Constants.SIGN_UP}
            >
              <HowToRegIcon sx={{ mr: 0.3, mb: 0.3 }} />
              {t('Sign Up')}
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
                <Button
                  component={NavLink}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mr: 1,
                    color: 'secondary',
                    textDecoration: 'none',
                    '&.active': {
                      color: 'secondary.contrastText',
                    },
                  }}
                  to={Constants.SIGN_IN}
                >
                  <LoginIcon sx={{ mr: 0.3, mb: 0.3 }} />
                  {t('Sign In')}
                </Button>
              </MenuItem>

              <MenuItem onClick={handleClose}>
                <Button
                  component={NavLink}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    color: 'secondary',
                    textDecoration: 'none',
                    '&.active': {
                      color: 'secondary.contrastText',
                    },
                  }}
                  to={Constants.SIGN_UP}
                >
                  <HowToRegIcon sx={{ mr: 0.3, mb: 0.3 }} />
                  {t('Sign Up')}
                </Button>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
