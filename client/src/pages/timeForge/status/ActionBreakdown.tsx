import React, { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { ActionCategory } from "../types/actionTypes";
import ActionBreakdownChart from "./charts/ActionBreakdownChart";
import ActionBreakdownPieChart from "./charts/ActionBreakdownPieChart";

const categories: (ActionCategory | "all")[] = ["all", "training", "rest", "creative", "sleep"];
const categoryLabels: Record<ActionCategory | "all", string> = {
  all: "すべて",
  training: "鍛錬",
  rest: "休憩",
  creative: "創造",
  sleep: "睡眠",
};

interface ActionBreakdownProps {
  actions: Record<string, {
    category: ActionCategory;
    time: number;
}>;
}

const ActionBreakdown: React.FC<ActionBreakdownProps> = ({ actions }) => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<ActionCategory | "all">("all");

  const handleChange = (_: React.SyntheticEvent, newValue: ActionCategory | "all") => {
    setSelectedCategory(newValue);
  };

  return (
    <Box sx={{ width: "100%", textAlign: "center" }}>
      {/* MUIのタブでカテゴリー切り替え */}
      <Tabs
        value={selectedCategory}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ mb: 2, borderBottom: 1, borderColor: "divider" }}
      >
        {categories.map((category) => (
          <Tab key={category} value={category} label={t(categoryLabels[category])} sx={{ width: "20%" }} />
        ))}
      </Tabs>

      <ActionBreakdownChart actions={actions} selectedCategory={selectedCategory} />
      <ActionBreakdownPieChart actions={actions} selectedCategory={selectedCategory} />
    </Box>
  );
};

export default ActionBreakdown;