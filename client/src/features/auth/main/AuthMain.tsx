import React from 'react';
import CharacterSpeechBubble from '../../../components/auth/CharacterSpeechBubble';
import { useTheme } from "@mui/material/styles";
import { Paper, Stack, useMediaQuery } from '@mui/material';
import backgroundImage from "../../../assets/background-water-bubble.jpg";
import character from "../../../assets/sample-character-idle.png";
import UserInput from './UserInput';
import { useAuthFlow } from '../../../hooks/auth/useAuthFlow';

interface AuthHomeProps {}

const AuthMain: React.FC<AuthHomeProps> = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { currentDialogue, handleElementClick, handleInputChange } = useAuthFlow();

  return (
    <Paper
      sx={{
        width: "100vw",
        height: "100vh",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Stack mt={5}>
        <CharacterSpeechBubble contents={currentDialogue.contents} characterIconUrl={character}>
          <UserInput elements={currentDialogue.elements} isMobile={isMobile} handleElementClick={handleElementClick} handleInputChange={handleInputChange}  />
        </CharacterSpeechBubble>
      </Stack>
    </Paper>
  );
};

export default AuthMain;
