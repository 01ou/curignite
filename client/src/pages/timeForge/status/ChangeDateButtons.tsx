import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Box, IconButton, Typography, Tabs, Tab } from "@mui/material";
import { format, isToday } from "date-fns";
import React, { useCallback } from "react";
import { shiftDateTime } from "../../../functions/dateTimeUtils/timeFormatUtils";
import { DAYS_IN_MILLISECOND } from "../../../constants/dateTimeConstants";

interface ChangeDateButtonsProps {
  displayDateMs: number;
  type: "date" | "recent";
  shiftSize?: number;
  onChangeDateMs: (ms: number) => void;
  onChangeType: (type: "date" | "recent") => void;
}

const ChangeDateButtons: React.FC<ChangeDateButtonsProps> = ({
  displayDateMs,
  type,
  shiftSize = 7,
  onChangeDateMs,
  onChangeType,
}) => {
  // 日付を移動する関数
  const handleShiftDate = (direction: "right" | "left") => {
    const shift = (direction === "left" ? -1 : 1) * (type === "date" ? 1 : shiftSize);
    const nextDateMs = shiftDateTime(displayDateMs, shift, "days");
    onChangeDateMs(nextDateMs);
  };

  // 日付の開始日を計算
  const startDateMs = type === "date" ? displayDateMs : displayDateMs - shiftSize * DAYS_IN_MILLISECOND;

  // タブ変更時のハンドラー
  const handleChangeTab = useCallback(
    (_: React.SyntheticEvent, newType: "date" | "recent") => {
      onChangeType(newType);
    },
    [onChangeType]
  );

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" bgcolor="background.paper">
      {/* タブ追加 */}
      <Tabs
        value={type}
        onChange={handleChangeTab}
        textColor="primary"
        indicatorColor="primary"
        sx={{ mb: 1 }}
      >
        <Tab label="日付" value="date" />
        <Tab label="最近" value="recent" />
      </Tabs>

      {/* 日付ナビゲーションボタン */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        bgcolor="background.paper"
        sx={{
          width: "fit-content",
          margin: "auto",
          "& .MuiIconButton-root": {
            "&:hover": {
              backgroundColor: "transparent",
              color: "secondary.main",
            },
          },
        }}
      >
        {/* 左シフト */}
        <IconButton onClick={() => handleShiftDate("left")} color="primary" size="large">
          <ChevronLeft />
        </IconButton>

        {/* 日付表示 */}
        <Typography sx={{ fontSize: "1.2rem", fontWeight: 500 }}>
          {`
            ${format(startDateMs, "yyyy年")}
            ${type === "recent" ? `${format(startDateMs, "MM月dd日")} ~ ` : ""}
            ${format(displayDateMs, "MM月dd日")}
          `}
        </Typography>

        {/* 右シフト */}
        <IconButton
          onClick={() => handleShiftDate("right")}
          color="primary"
          size="large"
          disabled={isToday(displayDateMs)}
        >
          <ChevronRight />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ChangeDateButtons;
