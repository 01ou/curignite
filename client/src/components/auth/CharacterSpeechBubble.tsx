import React, { ReactNode } from "react";
import { Avatar, Box, Paper, Stack, Typography } from "@mui/material";

interface CharacterSpeechBubbleProps {
  characterIconUrl: string;
  contents: string;
  children: ReactNode;
}

const CharacterSpeechBubble: React.FC<CharacterSpeechBubbleProps> = ({
  characterIconUrl,
  contents,
  children
}) => {
  return (
    <Stack direction="column" spacing={2} alignItems="center" sx={{ mx: 1 }}>
      <Stack direction="row" spacing={1}>
        <Avatar src={characterIconUrl} sx={{ width: 80, height: 80 }} />
        <Paper
          elevation={3}
          sx={{
            p: 2,
            borderRadius: "16px",
            backgroundColor: "#fff",
            maxWidth: 300,
            position: "relative",
          }}
        >
          <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>{contents}</Typography>
          <Box sx={{ position: "absolute", top: "50%", left: -10, transform: "translateY(-50%)" }}>
            <Box
              sx={{
                width: 0,
                height: 0,
                borderLeft: "10px solid transparent",
                borderRight: "10px solid white",
                borderTop: "10px solid transparent",
                borderBottom: "10px solid transparent",
              }}
            />
          </Box>
        </Paper>
      </Stack>
      <Box sx={{ backgroundColor: "#f5f5f5", p: 1, borderRadius: "8px", mt: 1, width: "85%" }}>
        {children}
      </Box>
    </Stack>
  );
};

export default CharacterSpeechBubble;
