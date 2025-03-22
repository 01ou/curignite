import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { actionCategoryColorMap } from "../../types/actionTypes";
import { setAlpha } from "../../../../functions/colorUtils/adjustColorUtils";
import { convertMsToUnit } from "../../../../functions/dateTimeUtils/timeConversion";

// Chart.js のコンポーネントを登録
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

type ActionTimeChartProps = {
  actionTimeByDate: Record<
    string,
    {
      trainingTimeMs: number;
      restTimeMs: number;
      creativeTimeMs: number;
      sleepTimeMs: number;
    }
  >;
};

const categories = ["training", "rest", "creative", "sleep"] as const;

// 各カテゴリーのデータセットを生成する関数
const generateDataset = (category: (typeof categories)[number], labels: string[], actionTimeByDate: ActionTimeChartProps["actionTimeByDate"]) => ({
  label: category.charAt(0).toUpperCase() + category.slice(1), // "training" -> "Training"
  data: labels.map((date) => actionTimeByDate[date]?.[`${category}TimeMs`] || 0),
  borderColor: actionCategoryColorMap[category],
  backgroundColor: setAlpha(actionCategoryColorMap[category], 0.2),
  tension: 0.2,
});

const ActionTimeTransitionChart: React.FC<ActionTimeChartProps> = ({ actionTimeByDate }) => {
  // 日付の配列（ソート済み）
  const labels = Object.keys(actionTimeByDate).sort();

  // 各カテゴリーのデータセット
  const datasets = categories.map((category) => generateDataset(category, labels, actionTimeByDate));

  // グラフデータ
  const data = { labels, datasets };

  // グラフオプション
  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false, // 縦横比固定解除
    plugins: {
      legend: { position: "top" as const },
      title: { display: true, text: "Daily Action Time Breakdown" },
      datalabels: {
        formatter: (value: number) => {
          return `${convertMsToUnit(value, "hours", 1)} h`;
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: "Hours" },
        ticks: {
          callback: (value) => `${convertMsToUnit(Number(value), "hours", 1)} h`
        },
      },
    },
  };

  return (
    <div style={{ height: "300px" }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default ActionTimeTransitionChart;
