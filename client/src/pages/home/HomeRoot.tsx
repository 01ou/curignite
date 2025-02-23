import React from 'react';
import HomeMain from './main/HomeMain';

interface HomeRootProps { }

const HomeRoot: React.FC<HomeRootProps> = ({}) => {
  return (
    <div>
      <HomeMain />
    </div>
  );
};

export default HomeRoot;