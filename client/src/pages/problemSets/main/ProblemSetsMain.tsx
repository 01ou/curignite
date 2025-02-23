import React from 'react';
import BackgroundContainer from '../../../components/display/BackgroundContainer';
import background from '../../../assets/space.png';
import japaneseIcon from "../../../assets/subjects/japanese.png";
import ProblemSetContainer from './ProblemSetContainer';

interface ProblemSetsMainProps { }

const ProblemSetsMain: React.FC<ProblemSetsMainProps> = ({}) => {

  return (
    <BackgroundContainer backgroundImage={background} >
      <ProblemSetContainer
        label='論読現代文'
        intimacy={30}
        overlayHexColor='#8B1602'
        backgroundSrc={japaneseIcon}
      />
    </BackgroundContainer>
  );
};

export default ProblemSetsMain;