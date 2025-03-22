import React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import TimelineIcon from "@mui/icons-material/Timeline";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Paper from "@mui/material/Paper";
import { useLocation, useNavigate } from "react-router-dom";

const tabs = ["/time-forge", "/time-forge/status", "/time-forge/profile"]

const HomeBottomNavigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={tabs.indexOf(location.pathname)}
        onChange={(_, newValue) => {
          navigate(tabs[newValue]);
        }}
      >
        <BottomNavigationAction label="ホーム" icon={<HomeIcon />} />
        <BottomNavigationAction label="統計" icon={<TimelineIcon />} />
        <BottomNavigationAction label="プロフィール" icon={<AccountCircleIcon />} />
      </BottomNavigation>
    </Paper>
  );
};

export default HomeBottomNavigation;
