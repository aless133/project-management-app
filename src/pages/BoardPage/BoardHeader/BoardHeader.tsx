import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ReplyIcon from '@mui/icons-material/Reply';
import { Constants } from 'utils';
import { ButtonAddColumn } from './ButtonAddColumn';

interface BoardHeaderProps {
  title: string | undefined;
  isColumns: () => boolean;
  onClick: () => void;
}

export const BoardHeader = ({ title, isColumns, onClick }: BoardHeaderProps) => {
  const [t] = useTranslation();

  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          my: 1,
        }}
      >
        <Button
          component={Link}
          to={Constants.MAIN}
          variant="outlined"
          sx={{ position: 'absolute', left: 0 }}
        >
          <ReplyIcon sx={{ display: { xs: 'block', sm: 'block', md: 'none' } }} />
          <Box
            sx={{
              display: { xs: 'none', sm: 'none', md: 'block' },
            }}
          >
            {t('Back to main')}
          </Box>
        </Button>
        <Typography
          variant="h3"
          sx={{
            fontSize: { xs: 30, sm: 38 },
            maxWidth: { xs: 120, sm: 220, md: 400, lg: 700 },
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {title || 'title'}
        </Typography>
      </Box>
      {isColumns() ? null : <ButtonAddColumn onClick={onClick} />}
    </Container>
  );
};
