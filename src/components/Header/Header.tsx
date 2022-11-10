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
  SvgIcon,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import Container from '@mui/system/Container';
import DnsIcon from '@mui/icons-material/Dns';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { selectUser } from 'store/userSlice';
import { useStoreSelector } from 'hooks/store.hooks';
import { Constants } from 'utils';
import { useStoreDispatch } from 'hooks/store.hooks';
import { clearUser } from 'store/userSlice';
import { BoardModal } from 'components/BoardModal';

export const Header = () => {
  const [lang, setLang] = useState(true);
  const { t, i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const trigger0 = useScrollTrigger({ disableHysteresis: true, threshold: 100 });
  const trigger1 = useScrollTrigger({ disableHysteresis: true, threshold: 120 });
  const [headerMinHeight, setHMH] = useState(64);

  // const isAuth = useStoreSelector(selectIsLogged);
  const isAuth = true;
  const user = useStoreSelector(selectUser);
  const dispatch = useStoreDispatch();
  const [openModal, setOpenModal] = useState<boolean>(false);

  useEffect(() => {
    if (trigger1) setHMH(50);
    else if (!trigger0) setHMH(64);
  }, [trigger0, trigger1]);

  const handleClickOpenModal = () => {
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  const openExitModal = () => {
    dispatch(clearUser());
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

  return (
    <AppBar position="sticky" sx={{ backgroundColor: 'primary.main' }}>
      <Container maxWidth="xl">
        <Toolbar
          disableGutters={true}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            minHeight: { sm: headerMinHeight },
            transition: '0.5s',
          }}
        >
          {isAuth ? (
            <>
              <BoardModal openModal={openModal} closeModal={closeModal} />
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
                  <SvgIcon viewBox="0 0 123 110" sx={{ mr: 1 }}>
                    <path d="M0 52.88L22.68 52.58C31.6035 57.7167 39.5079 64.4483 46 72.44C62.129 45.4464 82.2196 21.0275 105.6 0L122.88 0C92.9226 33.1829 67.344 70.0704 46.77 109.76C36 86.69 21 67.27 0 52.88Z" />
                  </SvgIcon>
                  P.Management
                </Button>
              </Box>
              <Box sx={{ display: { xs: 'none', md: 'block', lb: 'block' } }}>
                <Button
                  sx={{ color: 'secondary.main', fontSize: 14 }}
                  onClick={handleClickOpenModal}
                >
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
                  {user.name}
                </Button>

                <Button sx={{ mr: 1, color: 'secondary.main' }} onClick={openExitModal}>
                  <LogoutIcon sx={{ mb: 0.3, mr: 0.5 }} />
                  {t('Sign Out')}
                </Button>
              </Box>

              <Box sx={{ display: { xs: 'flex', md: 'none', lb: 'none' }, alignItems: 'center' }}>
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
                  disableScrollLock={true}
                >
                  <MenuItem onClick={handleClose}>
                    <Button
                      sx={{ color: 'secondary', fontSize: 14 }}
                      onClick={handleClickOpenModal}
                    >
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

              {/* <ModalWindow onClose={handleCloseModal} open={open} title="Create Board">
                <form onSubmit={handleSubmit}>
                  <TextField
                    name={Constants.BOARD_TITLE}
                    fullWidth
                    label={t('Title')}
                    error={!!errStack.boardTitle}
                    helperText={setCreateTitleError(errStack.boardTitle)}
                    defaultValue=""
                    onChange={handleInputChange}
                    margin="normal"
                  /> */}

              {/* <TextField
                    name={Constants.BOARD_DESCRIPTION}
                    fullWidth
                    label={t('Description')}
                    error={!!errStack.boardDescription}
                    defaultValue=""
                    onChange={handleInputChange}
                    helperText={setCreateRequiredError(errStack.boardDescription)}
                    margin="normal"
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    size="large"
                    disabled={isDisabledSubmitBtn}
                    sx={{ mt: 2 }}
                  >
                    {t('Create Board')}
                  </Button>
                </form>
              </ModalWindow> */}
            </>
          ) : (
            <>
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
                  <SvgIcon viewBox="0 0 123 110" sx={{ mr: 1 }}>
                    <path d="M0 52.88L22.68 52.58C31.6035 57.7167 39.5079 64.4483 46 72.44C62.129 45.4464 82.2196 21.0275 105.6 0L122.88 0C92.9226 33.1829 67.344 70.0704 46.77 109.76C36 86.69 21 67.27 0 52.88Z" />
                  </SvgIcon>
                  P.Management
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
                    sx={{ color: 'secondary.main' }}
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
                  disableScrollLock={true}
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
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
