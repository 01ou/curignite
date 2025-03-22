import { Button, Stack, SxProps, Typography } from '@mui/material';
import React, { ReactNode } from 'react';
import MultilineTypography from '../../../components/utils/MultilineTypography';

interface SelectCategoryButtonProps {
  label: string;
  explanation: string;
  Image: ReactNode;
  bgcolor: string;
  sx?: SxProps;
  onClick?: () => void;
}

const SelectCategoryButton: React.FC<SelectCategoryButtonProps> = ({ label, explanation, Image, bgcolor, onClick, sx }) => {
  return (
    <Button
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 150,
        height: 200,
        bgcolor,
        color: "white",
        ...sx
      }}
      onClick={onClick}
    >
      <Stack direction="column" justifyContent="center" alignItems="center">
        <Typography variant='h5'>
          {label}
        </Typography>
        {Image}
        <MultilineTypography variant='caption' text={explanation} />
      </Stack>
    </Button>
  );
};

export default SelectCategoryButton;