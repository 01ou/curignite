import { Avatar } from '@mui/material';
import React from 'react';
import SlimeImage from '../../../assets/slime.png';

interface LearningMainProps { }

const LearningMain: React.FC<LearningMainProps> = ({}) => {
  return (
    <div>
      <Avatar src={SlimeImage} sx={{ width: 200, height: 200 }} />
    </div>
  );
};

export default LearningMain;