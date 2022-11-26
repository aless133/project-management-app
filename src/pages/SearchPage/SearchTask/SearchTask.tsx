import { Box, Button, IconButton } from '@mui/material';
import React, { FC } from 'react';
import { ISearchTaskData } from 'types/taskTypes';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import { TrashBasket } from 'pages/BoardPage/TrashBasket';
import { useTranslation } from 'react-i18next';

interface ISearchTaskProps {
  data: ISearchTaskData;
}

export const SearchTask: FC<ISearchTaskProps> = ({ data }) => {
  const [t] = useTranslation();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '300px',
        width: '100%',
        flexShrink: 0,
        p: { xs: 1, sm: 2, md: 2, lg: 2 },
        borderRadius: 2,
        border: '.1rem solid #e8e3e3',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          rowGap: 2,
        }}
      >
        <Box sx={{ display: 'flex', flexWrap: 'wrap', fontSize: 22 }}>{data.title}</Box>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            fontSize: 20,
            color: 'gray',
            fontWeight: 200,
          }}
        >
          {data.description}
        </Box>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', columnGap: 1 }}>
          <IconButton
            onClick={() => console.log('rewrite')}
            sx={{
              color: 'gray',
              ':hover': {
                color: 'primary.main',
                backgroundColor: '#c2eafc',
              },
              transition: '0.3s',
            }}
          >
            <ModeEditOutlineOutlinedIcon />
          </IconButton>
          <TrashBasket
            onAction={() => {
              console.log('delete');
            }}
          />
        </Box>

        <Button size="small" sx={{ fontSize: { xs: 12, sm: 14 } }}>
          {t('View in project')}
        </Button>
      </Box>
    </Box>
  );
};
