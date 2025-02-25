import React, { useMemo } from 'react';
import { ProblemSetCategoryRead } from '../../../types/firebase/firestore/structure/users/problemSets/categories/categoryStructure';
import { CategoryProblemRead } from '../../../types/firebase/firestore/structure/users/problemSets/categories/problems/problemStructure';
import { Box, Typography } from '@mui/material';
import { ProblemStatus } from '../../../types/firebase/firestore/structure/users/problemSets/problemStatus';

interface CategoryDetailsContainerProps {
  category: ProblemSetCategoryRead;
  problems: CategoryProblemRead[];
  centerNumber: number;
}

const CategoryDetailsContainer: React.FC<CategoryDetailsContainerProps> = ({ category, problems, centerNumber }) => {
  const displayProblems = useMemo(() => {
    const min = centerNumber - 4;
    const max = centerNumber + 3;
    const filterProblems = problems.filter(problem => min <= problem.problemId && problem.problemId < max);
    filterProblems.sort();
    const result: {
      problemId: number;
      status: ProblemStatus;
      totalTimeSpent: number;
    }[] = [];
    let nextId = min;
    filterProblems.forEach(problem => {
      while (nextId < problem.problemId && nextId < max) {
        result.push({
          problemId: nextId,
          status: "inProgress",
          totalTimeSpent: 0
        });
        nextId += 1;
      }
      result.push(problem);
    });
    return result;
  }, [centerNumber, problems]);
  
  return (
    <div>
      <Typography>
        {category.categoryName}
      </Typography>
      <Box>
        {displayProblems.map(problem => (
          <Box sx={{ }}>
            {problem.problemId}
          </Box>
        ))}
      </Box>
    </div>
  );
};

export default CategoryDetailsContainer;