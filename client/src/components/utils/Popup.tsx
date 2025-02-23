import { Box, IconButton, Modal, SxProps } from "@mui/material";
import { FC, ReactNode } from "react";
import CloseIcon from "@mui/icons-material/Close";

interface PopupProps {
  open?: boolean;
  children: ReactNode;
  height?: string | number;
  sx?: SxProps; // Box用のスタイル
  modalSx?: SxProps; // Modal用のスタイル
  centerContent?: boolean;
  fixedCloseButton?: boolean;
  onClose?: () => void;
}

const Popup: FC<PopupProps> = ({
  open = true,
  children,
  height = "fit-content",
  sx,
  modalSx,
  centerContent = false,
  fixedCloseButton = false,
  onClose,
}) => {
  const boxStyles: SxProps = {
    position: "relative",
    width: "95%",
    maxWidth: "lg",
    height,
    maxHeight: "95vh",
    overflow: "auto",
    display: "flex",
    justifyContent: centerContent ? "center" : "flex-start",
    alignItems: centerContent ? "center" : "flex-start",
    ...sx,
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="popup-title"
      aria-describedby="popup-description"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        ...modalSx,
      }}
    >
      <Box sx={boxStyles}>
        <div id="popup-description">{children}</div>
        {onClose && (
          <IconButton
            onClick={onClose}
            size="large"
            color="warning"
            sx={{
              position: fixedCloseButton ? "fixed" : "absolute",
              top: 8,
              right: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        )}
      </Box>
    </Modal>
  );
};

export default Popup;
