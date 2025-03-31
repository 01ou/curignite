import { Button, Stack, SxProps, Typography } from '@mui/material';
import React, { ReactNode } from 'react';

interface ActionSelectButtonProps {
  title: string;
  contents: string;
  bgcolor: string;
  Image: ReactNode;
  buttonSx?: SxProps;
  onClick?: () => void;
}

const ActionSelectButton: React.FC<ActionSelectButtonProps> = ({
  title,
  contents,
  bgcolor,
  Image,
  buttonSx,
  onClick
}) => {
  return (
    <Button sx={{ bgcolor, color: "white", pl: 2, boxShadow: 2, ...buttonSx }} onClick={onClick} >
      <Stack direction="row" alignItems="center" justifyContent="center" spacing={1} >
        <Stack direction="column" alignItems="start" >
          <Typography variant='h4'>
            {title}
          </Typography>
          <Typography variant='h6'>
            {contents}
          </Typography>
        </Stack>
        {Image}
      </Stack>
    </Button>
  );
};

export default ActionSelectButton;