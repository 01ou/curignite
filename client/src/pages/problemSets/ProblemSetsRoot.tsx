import React from 'react';
import ProblemSetsMain from '../../features/problemSets/main/ProblemSetsMain';

interface ProblemSetsRootProps { }

const ProblemSetsRoot: React.FC<ProblemSetsRootProps> = ({}) => {
  return (
    <div>
      <ProblemSetsMain />
    </div>
  );
};

export default ProblemSetsRoot;