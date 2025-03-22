import React from "react";
import { Pie } from "react-chartjs-2"; // Pieコンポーネントに変更
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { ActionCategory } from "../../types/actionTypes";
import useFilteredActions from "../../hooks/useFilteredActions";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

interface ActionBreakdownPieChartProps {
  actions: Record<string, { category: ActionCategory; time: number }>;
  selectedCategory: ActionCategory | "all";
}

const ActionBreakdownPieChart: React.FC<ActionBreakdownPieChartProps> = ({ actions, selectedCategory }) => {
  const { data } = useFilteredActions({
    actions,
    selectedCategory,
    sortByCategory: true,
    includeRemainingTime: true,
    includeSleepTime: true,
  });

  const options: ChartOptions<"pie"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const time = tooltipItem.raw as number;
            return `${(time / 3600000).toFixed(1)} h`; // 時間を時間単位で表示
          },
        },
      },
      datalabels: {
        color: "black",
        font: { weight: "bold", size: 12 },
        formatter: (value: number) => `${(value / 3600000).toFixed(1)} h`, // ラベルのデータを時間単位で表示
      },
    },
  };

  return <Pie data={data} options={options} />;
};

export default ActionBreakdownPieChart;
