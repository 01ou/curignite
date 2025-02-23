import React from 'react';
import ProblemSetsMain from './main/ProblemSetsMain';
import ProblemSetsBottomNavigation from './navigation/ProblemSetsBottomNavigation';

interface ProblemSetsRootProps { }

const ProblemSetsRoot: React.FC<ProblemSetsRootProps> = ({}) => {
  return (
    <div>
      <ProblemSetsMain />
      <ProblemSetsBottomNavigation />
    </div>
  );
};

export default ProblemSetsRoot;