import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ChartOptions } from "chart.js";
import { actionCategoryColorMap } from "../../types/actionTypes";
import { setAlpha } from "../../../../functions/colorUtils/adjustColorUtils";


// Chart.js のコンポーネントを登録
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

type ActionTimeChartProps = {
  actionTimeByDate: Record<string, {
      trainingTimeMs: number;
      restTimeMs: number;
      creativeTimeMs: number;
      sleepTimeMs: number;
  }>
};

const ActionTimeTransitionChart: React.FC<ActionTimeChartProps> = ({ actionTimeByDate }) => {
  // 日付の配列（ソート済み）
  const labels = Object.keys(actionTimeByDate).sort();

  // 各カテゴリーのデータセット
  const datasets = [
    {
      label: "Training",
      data: labels.map((date) => actionTimeByDate[date]?.trainingTimeMs / 3600000 || 0),
      borderColor: actionCategoryColorMap["training"],
      backgroundColor: setAlpha(actionCategoryColorMap["training"], 0.2),
      tension: 0.2,
    },
    {
      label: "Rest",
      data: labels.map((date) => actionTimeByDate[date]?.restTimeMs / 3600000 || 0),
      borderColor: actionCategoryColorMap["rest"],
      backgroundColor: setAlpha(actionCategoryColorMap["rest"], 0.2),
      tension: 0.2,
    },
    {
      label: "Creative",
      data: labels.map((date) => actionTimeByDate[date]?.creativeTimeMs / 3600000 || 0),
      borderColor: actionCategoryColorMap["creative"],
      backgroundColor: setAlpha(actionCategoryColorMap["creative"], 0.2),
      tension: 0.2,
    },
    {
      label: "Sleep",
      data: labels.map((date) => actionTimeByDate[date]?.sleepTimeMs / 3600000 || 0),
      borderColor: actionCategoryColorMap["sleep"],
      backgroundColor: setAlpha(actionCategoryColorMap["sleep"], 0.2),
      tension: 0.2,
    },
  ];

  const data = { labels, datasets };

  const options: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      title: { display: true, text: "Daily Action Time Breakdown" },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: "Hours" },

      },
    },
  };

  return <Line data={data} options={options} />;
};

export default ActionTimeTransitionChart;
