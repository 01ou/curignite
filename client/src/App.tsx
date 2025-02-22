import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NotFound from './pages/error/NotFound';
import CreateUserTest from './components/test/CreateUserTest';
import AuthRoot from './pages/authentication/AuthRoot';
import HomeRoot from './pages/home/HomeRoot';

const App: React.FC = () => {

  return (
    <Routes>
      <Route path='home' element={<HomeRoot />} />
      <Route path='auth' element={<AuthRoot />} />
      <Route path='auth/:step' element={<AuthRoot />} />
      <Route path='create' element={<CreateUserTest />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
