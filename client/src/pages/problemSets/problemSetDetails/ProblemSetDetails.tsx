import React, { useEffect, useMemo, useState } from 'react';
import { ProblemSetRead } from '../../../types/firebase/firestore/structure/users/problemSets/problemSetStructure';
import { Box, IconButton, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ProblemSetDetailsHeader from './ProblemSetDetailsHeader';
import useCurdProblemSetSubCollection from '../../../features/hooks/firestoreApi/problemSets/useCurdProblemSetSubCollection';
import useProblemSetParameter from './useProblemSetParameter';
import ProblemSetParameterSlider from './ProblemSetParameterSlider';
import { Edit } from '@mui/icons-material';
import Popup from '../../../components/utils/Popup';
import EditProblemSetForm from './EditProblemSetForm';

interface ProblemSetDetailsProps {
  problemSet: ProblemSetRead;
}

const ProblemSetDetails: React.FC<ProblemSetDetailsProps> = ({ problemSet }) => {
  const { asyncStates, getAllSubCollections } = useCurdProblemSetSubCollection();
  const { getDetails } = useProblemSetParameter();
  const [openEdit, setOpenEdit] = useState(false);

  useEffect(() => {
    if (problemSet.docId) {
      getAllSubCollections(problemSet.docId);
    }
    getAllSubCollections(problemSet.docId);
  }, [getAllSubCollections]);

  const subCollections = useMemo(() => asyncStates.getAllSubCollections?.data ?? null, [asyncStates]);

  const details = useMemo(() => subCollections ? getDetails(subCollections): null, [subCollections]);

  return (
    <Box sx={{
      width: "100%",
      height: "100%",
      bgcolor: "pink",
      padding: 1
    }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" >
        <ProblemSetDetailsHeader
          problemSetName={problemSet.setName}
          subject={problemSet.subject}
          detailedSubject={problemSet.detailedSubject}
        />
        <IconButton onClick={() => setOpenEdit(true)} sx={{ mr: 3 }} >
          <Edit />
        </IconButton>
      </Stack>
      <Stack direction="column" spacing={1} mt={2} >
        <ProblemSetParameterSlider label='親密度' value={details?.intimacy ?? 0} sx={{ pb: 1 }} fillColor={"#FF83B2"} />
        <ProblemSetParameterSlider label='時間' value={details?.usageTime ?? 0} />
        <ProblemSetParameterSlider label='頻度' value={details?.usageFrequency ?? 0} />
      </Stack>
      <Popup open={openEdit} onClose={() => setOpenEdit(false)} sx={{ bgcolor: "pink", height: "80%" }}>
        <EditProblemSetForm problemSet={problemSet} categories={subCollections?.categories ?? []} />
      </Popup>
    </Box>
  );
};

export default ProblemSetDetails;