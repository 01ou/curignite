import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NotFound from './pages/error/NotFound';
import AuthRoot from './pages/auth/AuthRoot';
import HomeRoot from './pages/home/HomeRoot';
import ProblemSetsRoot from './pages/problemSets/ProblemSetsRoot';
import useInitializationApp from './features/hooks/app/useInitializationApp';
import LearningRoot from './pages/learning/LearningRoot';

const App: React.FC = () => {
  useInitializationApp();
  
  return (
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route path='auth' element={<AuthRoot />} />
      <Route path='auth/:step' element={<AuthRoot />} />
      <Route path='home' element={<HomeRoot />} />
      <Route path='learning' element={<LearningRoot />} /> 
      <Route path='problemSets' element={<ProblemSetsRoot />} />
    </Routes>
  );
};

export default App;
