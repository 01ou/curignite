import React, { useState } from "react";
import { TextField, Button, Box, IconButton } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import StopIcon from "@mui/icons-material/Stop";
import SendIcon from "@mui/icons-material/Send";
import useAudioRecorder from "../features/hooks/useAudioRecorder";

interface MessageComposerProps {
  onSendText: (message: string) => void;
  onSendVoice: (voiceBlob: Blob, message?: string) => void;
}

const MessageComposer: React.FC<MessageComposerProps> = ({ onSendText, onSendVoice }) => {
  const [text, setText] = useState("");
  const { isRecording, audioBlob, startRecording, stopRecording, clearAudio } = useAudioRecorder();

  // テキスト送信
  const handleTextSend = () => {
    if (text.trim()) {
      onSendText(text);
      setText(""); // 送信後クリア
    }
  };

  // 音声送信
  const handleVoiceSend = () => {
    if (audioBlob) {
      onSendVoice(audioBlob);
      clearAudio(); // 送信後クリア
    }
  };

  return (
    <Box p={2} borderTop={1} borderColor="grey.300" display="flex" flexDirection="column" gap={2}>
      {/* テキスト入力 */}
      <TextField
        variant="outlined"
        placeholder="メッセージを入力..."
        fullWidth
        value={text}
        onChange={(e) => setText(e.target.value)}
        multiline
        rows={2}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleTextSend}
        disabled={!text.trim()}
        startIcon={<SendIcon />}
      >
        送信
      </Button>

      {/* 音声録音 */}
      <Box display="flex" alignItems="center" gap={2}>
        <IconButton color={isRecording ? "error" : "default"} onClick={isRecording ? stopRecording : startRecording}>
          {isRecording ? <StopIcon /> : <MicIcon />}
        </IconButton>

        {/* 音声再生 & 送信 */}
        {audioBlob && (
          <Box display="flex" alignItems="center" gap={2}>
            <audio controls src={URL.createObjectURL(audioBlob)} />
            <Button variant="contained" color="secondary" onClick={handleVoiceSend} startIcon={<SendIcon />}>
              送信
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default MessageComposer;
