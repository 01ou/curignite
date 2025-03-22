import React, { useEffect } from 'react';
import useActionStorage from '../hooks/useActionStorage';
import { Route, Routes, useNavigate } from 'react-router-dom';
import StartAction from './StartAction';
import HomeBottomNavigation from '../navigation/bottomNavigation/HomeBottomNavigation';
import StatusRoot from '../status/StatusRoot';

const HomeRoot: React.FC = () => {
  const navigate = useNavigate();
  const { getCurrentAction } = useActionStorage();

  useEffect(() => {
    if (getCurrentAction()) {
      navigate("/time-forge/action");
    }
  }, [])

  return (
    <>
      <Routes>
        <Route path='/*' element={<StartAction />} />
        <Route path='/status' element={<StatusRoot />} />
      </Routes>
      <HomeBottomNavigation />
    </>
  )
};

export default HomeRoot;
