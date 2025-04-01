import React, { useCallback, useEffect, useState } from 'react';
import { Chat } from '../features/types/chatTypes';
import { Card, CardContent, IconButton, LinearProgress, SxProps, Typography } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

interface MessageBubbleProps {
  chat: Chat;
  sx?: SxProps;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ chat, sx }) => {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0);

  useEffect(() => {
    if (chat.type === "voice") {
      const newAudio = new Audio(chat.voiceBase64);
      setAudio(newAudio);
    }
  }, [chat]);

  const updateProgress = useCallback(() => {
    if (audio && isFinite(audio.duration)) {
      setProgress((audio.currentTime / audio.duration) * 100);
      setRemainingTime(Math.max(0, Math.floor(audio.duration - audio.currentTime)));
    }
  }, [audio]);

  const handleEnd = useCallback(() => {
    setIsPlaying(false);
    setProgress(0);
    setRemainingTime(audio?.duration ? Math.floor(audio.duration) : 0);
  }, [audio]);

  useEffect(() => {
    if (!audio) return;
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', handleEnd);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', handleEnd);
    };
  }, [audio, updateProgress, handleEnd]);

  const handleTogglePlay = () => {
    if (!audio) return;
    isPlaying ? audio.pause() : audio.play();
    setIsPlaying(!isPlaying);
  };

  return (
    <Card
      sx={{
        maxWidth: "60%",
        p: 1,
        m: 1,
        backgroundColor: chat.senderId === "self" ? "#DCF8C6" : "#FFF",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        ...sx,
      }}
    >
      <CardContent sx={{ width: "100%", textAlign: "center" }}>
        {chat.message && <Typography>{chat.message}</Typography>}
        {chat.type === "voice" && (
          <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
            <IconButton onClick={handleTogglePlay} size="small">
              {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
            </IconButton>
            <LinearProgress variant="determinate" value={progress} sx={{ flexGrow: 1, mx: 1 }} />
            <Typography variant="caption">{Math.round(remainingTime)}s</Typography>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MessageBubble