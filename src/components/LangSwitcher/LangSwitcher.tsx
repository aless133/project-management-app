import React, { useEffect } from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import { useStoreSelector, useStoreDispatch } from 'hooks/store.hooks';
import { selectLang, setLang } from 'store/uiSlice';
import { Languages } from 'utils/constants';
import { useTranslation } from 'react-i18next';

export const LangSwitcher = () => {
  const { i18n } = useTranslation();
  const dispatch = useStoreDispatch();
  const lang = useStoreSelector(selectLang);
  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [i18n, lang]);

  const langIsChecked = () => {
    return lang == Languages.LANG0;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setLang(event.target.checked ? Languages.LANG0 : Languages.LANG1));
  };

  return (
    <FormGroup>
      <FormControlLabel
        sx={{ mr: 1, color: 'secondary.main' }}
        control={
          <Switch
            checked={langIsChecked()}
            onChange={handleChange}
            color="default"
            aria-label="login switch"
          />
        }
        label={
          <Typography
            variant="h6"
            color="inherit"
            sx={{
              fontSize: 14,
              textTransform: 'uppercase',
            }}
          >
            {lang}
          </Typography>
        }
      />
    </FormGroup>
  );
};
