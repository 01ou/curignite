import React, { ReactNode } from "react";
import { Avatar, Box, Paper, Stack, Typography } from "@mui/material";
import { Variant } from "@mui/material/styles/createTypography";

interface CharacterSpeechBubbleProps {
  characterIconUrl: string;
  contents: string;
  variant?: Variant;
  bubbleColor?: string;
  avatarSize?: number;
  bubbleWidth?: number;
  children?: ReactNode;
}

const CharacterSpeechBubble: React.FC<CharacterSpeechBubbleProps> = ({
  characterIconUrl,
  contents,
  bubbleColor = "#fff",
  avatarSize = 80,
  bubbleWidth = 300,
  variant = "body2",
  children
}) => {
  return (
    <Stack direction="column" spacing={2} alignItems="center" sx={{ mx: 1 }}>
      <Stack direction="row" spacing={1}>
        <Avatar src={characterIconUrl} sx={{ width: avatarSize, height: avatarSize }} />
        <Paper
          elevation={3}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: 2,
            borderRadius: "32px / 20px",
            backgroundColor: bubbleColor,
            width: bubbleWidth,
            maxWidth: bubbleWidth,
            position: "relative",
          }}
        >
          <Typography variant={variant} sx={{ whiteSpace: "pre-line" }}>{contents}</Typography>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: -12,
              transform: "translateY(-50%)",
            }}
          >
            <Box
              sx={{
                width: 0,
                height: 0,
                borderLeft: "12px solid transparent",
                borderRight: `12px solid ${bubbleColor}`,
                borderTop: "12px solid transparent",
                borderBottom: "12px solid transparent",
              }}
            />
          </Box>
        </Paper>
      </Stack>
      {children && (
        <Box
          sx={{
            backgroundColor: "#f5f5f5",
            p: 1,
            borderRadius: "8px",
            mt: 1,
            width: "85%",
          }}
        >
          {children}
        </Box>
      )}
    </Stack>
  );
};

export default CharacterSpeechBubble;
