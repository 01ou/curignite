import React, { useEffect, useMemo } from 'react';
import BackgroundContainer from '../../../components/display/BackgroundContainer';
import background from '../../../assets/space.png';
import ProblemSetContainer from './ProblemSetContainer';
import useCrudProblemSets from '../../../features/hooks/firestoreApi/problemSets/useCrudProblemSets';
import { Grid } from '@mui/material';
import { Subject } from '../../../types/app/subjects';

import languageArtsImage from "../../../assets/subjects/japanese.png";
import mathematicsImage from "../../../assets/subjects/math.png";
import scienceImage from "../../../assets/subjects/science.png";
import socialStudiesImage from "../../../assets/subjects/social-studies.png";
import foreignLanguageImage from "../../../assets/subjects/english.png";
import practicalImage from "../../../assets/subjects/practical.png";

interface SubjectSetting {
  color: string;
  image: string;
}

interface ProblemSetsMainProps { }

const ProblemSetsMain: React.FC<ProblemSetsMainProps> = () => {

  const problemSetSubjectSetting: Record<Subject, SubjectSetting> = {
    languageArts: { color: "#8B1602", image: languageArtsImage },
    mathematics: { color: "#0047AB", image: mathematicsImage },
    science: { color: "#008000", image: scienceImage },
    socialStudies: { color: "#FFA500", image: socialStudiesImage },
    foreignLanguage: { color: "#800080", image: foreignLanguageImage },
    practical: { color: "#A52A2A", image: practicalImage },
    other: { color: "#555", image: "" },
    notSelected: { color: "#555", image: "" }
  } as const;

  const getSubjectSetting = (subject: Subject) => {
    if (subject in problemSetSubjectSetting) {
      return problemSetSubjectSetting[subject];
    }
    return { color: "#555", image: "" };
  }

  const { asyncStates, readAllProblemSets } = useCrudProblemSets();

  useEffect(() => {
    readAllProblemSets();
  }, [readAllProblemSets])

  const problemSets = useMemo(() => asyncStates.read?.data ?? [], [asyncStates]);

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
            />
          </Grid>
        ))}
      </Grid>
    </BackgroundContainer>
  );
};

export default ProblemSetsMain;