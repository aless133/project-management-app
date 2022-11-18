import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import SvgIcon from '@mui/material/SvgIcon';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import Container from '@mui/system/Container';
import DnsIcon from '@mui/icons-material/Dns';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { useStoreSelector, useStoreDispatch } from 'hooks/store.hooks';
import { selectIsLogged, selectUser, clearUser } from 'store/userSlice';
import { Constants } from 'utils';
import { LangSwitcher } from 'components/LangSwitcher';
import { BoardModal } from 'components/BoardModal';

enum HeaderConstants {
  START_TRIGGER = '120',
  FINISH_TRIGGER = '100',
  MIN_HEIGHT = '50',
  MAX_HEIGHT = '64',
}

export const Header = () => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const trigger0 = useScrollTrigger({
    disableHysteresis: true,
    threshold: +HeaderConstants.FINISH_TRIGGER,
  });
  const trigger1 = useScrollTrigger({
    disableHysteresis: true,
    threshold: +HeaderConstants.START_TRIGGER,
  });
  const [headerMinHeight, setHMH] = useState(+HeaderConstants.MAX_HEIGHT);

  const isAuth = useStoreSelector(selectIsLogged);
  const user = useStoreSelector(selectUser);
  const dispatch = useStoreDispatch();
  const [openModal, setOpenModal] = useState<boolean>(false);

  useEffect(() => {
    if (trigger1) setHMH(+HeaderConstants.MIN_HEIGHT);
    else if (!trigger0) setHMH(+HeaderConstants.MAX_HEIGHT);
  }, [trigger0, trigger1]);

  const handleOpenBoardModal = () => {
    setOpenModal(true);
  };

  const handleCloseBoardModal = () => {
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

  return (
    <>
      {isAuth && (
        <>
          <BoardModal parent="header" openModal={openModal} closeModal={handleCloseBoardModal} />
        </>
      )}
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
                <Box sx={{ width: { md: 390, lg: 390 } }}>
                  <Button
                    component={NavLink}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      color: 'secondary.main',
                      width: 145,
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
                    onClick={handleOpenBoardModal}
                  >
                    <DashboardCustomizeIcon sx={{ mb: 0.5, mr: 1 }} />
                    <Box sx={{ display: { md: 'none', lg: 'block' } }}>{t('Create Board')}</Box>
                  </Button>
                </Box>

                <Box
                  sx={{
                    display: { xs: 'none', md: 'flex', lb: 'flex' },
                    alignItems: 'center',
                    width: { md: 390, lg: 390 },
                    fontSize: 14,
                  }}
                >
                  <LangSwitcher />
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
                    <AccountCircleIcon
                      sx={{
                        mb: 0.3,
                        mr: 0.5,
                        width: 20,
                      }}
                    />
                    <Box
                      sx={{
                        maxWidth: 60,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {user.name}
                    </Box>
                  </Button>

                  <Button sx={{ color: 'secondary.main' }} onClick={openExitModal}>
                    <LogoutIcon sx={{ mb: 0.3, mr: 0.5 }} />
                    {t('Sign Out')}
                  </Button>
                </Box>

                <Box sx={{ display: { xs: 'flex', md: 'none', lb: 'none' }, alignItems: 'center' }}>
                  <LangSwitcher />
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
                        onClick={handleOpenBoardModal}
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
                        <Box
                          sx={{
                            maxWidth: 60,
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {user.name}
                        </Box>
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
                  <LangSwitcher />
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
                  <LangSwitcher />
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
    </>
  );
};
