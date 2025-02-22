import { Button, Stack, TextField } from "@mui/material";
import React, { useMemo } from "react";
import { DialogueElement } from "../../../types/dialogue/DialogueTypes";

interface UserInputProps {
  elements: DialogueElement[];
  isMobile: boolean;
  handleElementClick?: (element: DialogueElement) => void;
  handleInputChange?: (elementId: string, value: string) => void;
}

const UserInput: React.FC<UserInputProps> = ({ elements, isMobile, handleElementClick, handleInputChange }) => {

  const inputState = useMemo(() => {
    return elements.reduce<Record<string, boolean>>((acc, element) => {
      acc[element.id] = element.type === "inputText" && Boolean(element.value);
      return acc;
    }, {});
  }, [elements]);  

  return (
    <Stack direction={isMobile ? "column" : "row"} justifyContent="center" alignItems="center" minHeight={120} >
      {elements.map((element, index) => {
        if (element.type === "button") {
          return (
            <Button
              key={index}
              disabled={element.requiredInputs && element.requiredInputs.some(id => !inputState[id])}
              onClick={() => handleElementClick?.(element)}
              fullWidth
              sx={{ marginY: 1, bgcolor: element.color, color: "white" }} // 余白を調整
            >
              {element.text}
            </Button>
          );
        }

        if (element.type === "inputText") {
          return (
            <TextField
              key={index}
              label={element.label}
              value={element.value}
              onChange={(e) => handleInputChange?.(element.id, e.target.value)}
              sx={{ display: "block", marginY: 1 }} // 余白を調整
            />
          );
        }

        return null;
      })}
    </Stack>
  );
};

export default UserInput;
