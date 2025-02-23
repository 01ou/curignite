import { Box, Button, Stack } from '@mui/material';
import React, { useState } from 'react';
import CreateProblemSet from '../form/CreateProblemSet';

interface ProblemSetsBottomNavigationProps {
  selectedIndex?: number;
  onChange?: (event: React.SyntheticEvent, newValue: number) => void;
}

const ProblemSetsBottomNavigation: React.FC<ProblemSetsBottomNavigationProps> = ({ selectedIndex, onChange }) => {
  const [openCreatePopup, setOpenCreatePopup] = useState(false);

  console.log(selectedIndex);
  
  return (
    <Box sx={{ width: '100%', position: 'fixed', bottom: 0, left: 0 }}>
      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{
          width: "100%",
          height: "60px",
          bgcolor: "#FFC8E2",
          borderTop: 1,
          borderColor: "#301C1C"
        }}
      >
      <Button
        sx={{
          bgcolor: "skyblue",
          width: 120,
          height: 40,
          borderRadius: "20px", // 半円の端を作るために高さの半分の値にする
          color: "white", 
          textTransform: "none",
          transition: "transform 0.2s ease-in-out",
          '&:hover': {
            transform: "scale(1.1)",
          },
        }}
        onClick={() => setOpenCreatePopup(true)}
      >
          新しい問題集
        </Button>
      </Stack>
      <CreateProblemSet
        open={openCreatePopup}
        onClose={() => setOpenCreatePopup(false)}
      />
    </Box>
  );
};

export default ProblemSetsBottomNavigation;