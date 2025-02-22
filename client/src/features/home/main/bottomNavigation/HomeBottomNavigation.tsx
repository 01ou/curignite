import React from 'react';
import { BottomNavigation, BottomNavigationAction, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

interface HomeBottomNavigationProps {
  // 任意で、選択されているアイコンやコールバック関数を渡せるようにすることもできます
  selectedIndex?: number;
  onChange?: (event: React.SyntheticEvent, newValue: number) => void;
}

const HomeBottomNavigation: React.FC<HomeBottomNavigationProps> = ({ selectedIndex = 0, onChange }) => {
  return (
    <Box sx={{ width: '100%', position: 'fixed', bottom: 0 }}>
      <BottomNavigation
        value={selectedIndex}
        onChange={onChange}
        showLabels
        sx={{ width: '100%', bgcolor: "#FFC8E2", borderTop: 1, borderColor: "#301C1C" }}
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon sx={{ color: "#5FC4F3" }} />} />
        <BottomNavigationAction label="Search" icon={<SearchIcon sx={{ color: "#5FC4F3" }} />} />
        <BottomNavigationAction label="Account" icon={<AccountCircleIcon sx={{ color: "#5FC4F3" }} />} />
      </BottomNavigation>
    </Box>
  );
};

export default HomeBottomNavigation;
