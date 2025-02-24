import React from 'react';
import { ProblemSetRead } from '../../../types/firebase/firestore/structure/users/problemSets/problemSetStructure';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ProblemSetDetailsHeader from './ProblemSetDetailsHeader';

interface ProblemSetDetailsProps {
  problemSet: ProblemSetRead;
}

const ProblemSetDetails: React.FC<ProblemSetDetailsProps> = ({ problemSet }) => {
  const { t } = useTranslation();

  return (
    <Box sx={{
      width: "100%",
      height: "100%",
      bgcolor: "pink",
      padding: 1
    }}>
      <ProblemSetDetailsHeader
        problemSetName={problemSet.name}
        subject={problemSet.subject}
        detailedSubject={problemSet.detailedSubject}
      />
    </Box>
  );
};

export default ProblemSetDetails;