import { Button } from '@mui/material';
import React from 'react';

interface ActionSelectionButtonProps {
  text: string;
  color: string;
  onClick: () => void;
}

const ActionSelectionButton: React.FC<ActionSelectionButtonProps> = ({ text, color, onClick }) => {
  return (
    <Button variant="outlined" sx={{ color, width: "80%", boxShadow: 1 }} onClick={onClick} >
      {text}
    </Button>
  );
};

export default ActionSelectionButton;