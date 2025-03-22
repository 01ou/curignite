import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { ActionCategory } from "../../types/actionTypes";
import useFilteredActions from "../../hooks/useFilteredActions";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

interface ActionBreakdownChartProps {
  actions: Record<string, { category: ActionCategory; time: number }>;
  selectedCategory: ActionCategory | "all";
}

const ActionBreakdownChart: React.FC<ActionBreakdownChartProps> = ({ actions, selectedCategory }) => {
  const { data } = useFilteredActions({ actions, selectedCategory });

  const options: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const time = tooltipItem.raw as number;
            return `${(time / 3600000).toFixed(1)} h`;
          },
        },
      },
      datalabels: {
        color: "black",
        font: { weight: "bold", size: 12 },
        formatter: (value: number) => `${(value / 3600000).toFixed(1)} h`,
        anchor: "end",
        align: "top",
      },
    },
    scales: {
      y: {
        ticks: {
          callback: (value) => `${(value as number / 3600000).toFixed(1)} h`,
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default ActionBreakdownChart;
