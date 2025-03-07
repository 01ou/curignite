import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline, Typography } from "@mui/material";
import React from "react";
import BackgroundContainer from "../../components/display/BackgroundContainer";
import background from "../../assets/backgrounds/factory.jpg";

const theme = createTheme({
  typography: {
    fontFamily: `"DotGothic16", monospace`,
  },
});

const LearningRoot: React.FC = () => {
  return (
    <BackgroundContainer backgroundImage={background}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Typography variant="h4">ドット絵フォント適用 あいう ABC 123</Typography>
      </ThemeProvider>
    </BackgroundContainer>
  );
};

export default LearningRoot;
