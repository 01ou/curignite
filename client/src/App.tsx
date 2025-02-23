import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NotFound from './pages/error/NotFound';
import CreateUserTest from './components/test/CreateUserTest';
import AuthRoot from './pages/auth/AuthRoot';
import HomeRoot from './pages/home/HomeRoot';
import ProblemSetsRoot from './pages/problemSets/ProblemSetsRoot';
import useInitializationApp from './features/hooks/app/useInitializationApp';

const App: React.FC = () => {
  useInitializationApp();
  
  return (
    <Routes>
      <Route path='home' element={<HomeRoot />} />
      <Route path='auth' element={<AuthRoot />} />
      <Route path='problemSets' element={<ProblemSetsRoot />} />
      <Route path='auth/:step' element={<AuthRoot />} />
      <Route path='create' element={<CreateUserTest />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
