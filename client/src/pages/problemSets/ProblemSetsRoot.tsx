import React from 'react';
import ProblemSetsMain from './main/ProblemSetsMain';

interface ProblemSetsRootProps { }

const ProblemSetsRoot: React.FC<ProblemSetsRootProps> = ({}) => {
  return (
    <div>
      <ProblemSetsMain />
    </div>
  );
};

export default ProblemSetsRoot;