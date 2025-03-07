import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NotFound from './pages/error/NotFound';
import AuthRoot from './pages/auth/AuthRoot';
import HomeRoot from './pages/home/HomeRoot';
import ProblemSetsRoot from './pages/problemSets/ProblemSetsRoot';
import useInitializationApp from './features/hooks/app/useInitializationApp';
import LearningRoot from './pages/learning/LearningRoot';

import "@fontsource/roboto-mono"; // 通常のフォント
import "@fontsource/press-start-2p"; // 8bit風
import "@fontsource/vt323"; // レトロPC風
import '@fontsource/dotgothic16';
import LongPressComponent from './pages/idea1/top/TopMain';
import HomeMain from './pages/idea1/home/HomeMain';
import LearningMain from './pages/idea1/learning/LearningMain';

const App: React.FC = () => {
  useInitializationApp();
  
  return (
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route path="/idea1/top" element={<LongPressComponent />} />
      <Route path="/idea1/home" element={<HomeMain />} />
      <Route path="/idea1/learning" element={<LearningMain />} />
      <Route path='auth' element={<AuthRoot />} />
      <Route path='auth/:step' element={<AuthRoot />} />
      <Route path='home' element={<HomeRoot />} />
      <Route path='learning' element={<LearningRoot />} /> 
      <Route path='problemSets' element={<ProblemSetsRoot />} />
    </Routes>
  );
};

export default App;
