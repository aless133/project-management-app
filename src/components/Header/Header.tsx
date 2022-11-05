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
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { House } from '@mui/icons-material';
import { Trans, useTranslation } from 'react-i18next';

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
            sx={{ mr: { xs: 0, md: 2 } }}
          >
            <House />
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

          <Button color="inherit" sx={{ width: 80 }}>
            <Trans i18nKey={'welcome.signin'}></Trans>
          </Button>
          <Button color="inherit" sx={{ width: 100 }}>
            <Trans i18nKey={'welcome.signup'}></Trans>
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
