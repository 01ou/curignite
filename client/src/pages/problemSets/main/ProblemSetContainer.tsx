import React from 'react';
import OverlayIconButton from '../../../components/inputs/OverlayIconButton';
import { Stack, Typography } from '@mui/material';
import IntimacyStar from './IntimacyStar';

interface ProblemSetContainerProps {
  label: string;
  intimacy: number;
  backgroundSrc: string;
  overlayHexColor: string;
}

const ProblemSetContainer: React.FC<ProblemSetContainerProps> = ({ label, intimacy, backgroundSrc, overlayHexColor}) => {
  return (
    <OverlayIconButton size={90} src={backgroundSrc} overlayHexColor={overlayHexColor} overlayAlpha={0.8} imageScale={1.8} >
      <Stack direction="column" justifyContent="center" alignItems="center" spacing={0} >
        <Typography variant='subtitle1' color='white' pt={2} sx={{ whiteSpace: "nowrap" }} >{label}</Typography>
        <Stack direction="row" justifyContent="center" alignItems="center" spacing={-0.5} >
          <Typography variant="caption" color='white' sx={{ scale: 0.8 }} >
            親密度
          </Typography>
          <IntimacyStar intimacy={intimacy}  fillColor='#F24ADF' size={40}/>
        </Stack>
      </Stack>
    </OverlayIconButton>
  );
};

export default ProblemSetContainer;