import { AccountCircle, Chat, EmojiEvents } from '@mui/icons-material';
import { Box, BottomNavigationAction, BottomNavigation } from '@mui/material';
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface HomeBottomNavigationProps { }

const HomeBottomNavigation: React.FC<HomeBottomNavigationProps> = ({}) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box sx={{ width: "100%", position: "fixed", bottom: 0 }}>
      <BottomNavigation
        value={location.pathname}
        onChange={(_, newValue) => navigate(newValue)}
      >
        <BottomNavigationAction label="プロフィール" value="/voice-buddy/profile" icon={<AccountCircle />} />
        <BottomNavigationAction label="チャット" value="/voice-buddy/chat" icon={<Chat />} />
        <BottomNavigationAction label="実績" value="/voice-buddy/achievements" icon={<EmojiEvents />} />
      </BottomNavigation>
    </Box>
  );
};

export default HomeBottomNavigation;