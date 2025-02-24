import React, { useEffect, useMemo, useState } from 'react';
import BackgroundContainer from '../../../components/display/BackgroundContainer';
import background from '../../../assets/space.png';
import ProblemSetContainer from './ProblemSetContainer';
import useCrudProblemSets from '../../../features/hooks/firestoreApi/problemSets/useCrudProblemSets';
import { Grid } from '@mui/material';
import { ProblemSetRead } from '../../../types/firebase/firestore/structure/users/problemSets/problemSetStructure';
import Popup from '../../../components/utils/Popup';
import ProblemSetDetails from '../problemSetDetails/ProblemSetDetails';
import { getSubjectSetting } from './problemSetSubjectSetting';

interface ProblemSetsMainProps { }

const ProblemSetsMain: React.FC<ProblemSetsMainProps> = () => {
  const { asyncStates, readAllProblemSets } = useCrudProblemSets();
  const problemSets = useMemo(() => asyncStates.readAll?.data ?? [], [asyncStates]);
  const [displayProblemSet, setDisplayProblemSet] = useState<ProblemSetRead | null>(null);

  useEffect(() => {
    readAllProblemSets();
  }, [readAllProblemSets]);

  return (
    <BackgroundContainer backgroundImage={background} >
      <Grid container spacing={0.5} mt={2}>
        {problemSets.map(problemSet => (
          <Grid item xs={4} sm={3} md={2} lg={1} key={problemSet.docId} sx={{ display: "flex", justifyContent: "center" }}>
            <ProblemSetContainer
              label={problemSet.name}
              intimacy={30}
              overlayHexColor={getSubjectSetting(problemSet.subject).color}
              backgroundSrc={getSubjectSetting(problemSet.subject).image}
              onClick={() => setDisplayProblemSet(problemSet)}
            />
          </Grid>
        ))}
      </Grid>

      <Popup onClose={() => setDisplayProblemSet(null)} >
        {displayProblemSet && <ProblemSetDetails problemSet={displayProblemSet} />}
      </Popup>
    </BackgroundContainer>
  );
};

export default ProblemSetsMain;