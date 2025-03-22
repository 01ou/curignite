import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartOptions } from 'chart.js';
import { convertMsToUnit, decomposeMilliseconds } from '../../../functions/dateTimeUtils/timeFormatUtils';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

interface TodayResultChartProps {
  trainingTimeMs: number;
  restTimeMs: number;
  creativeTimeMs: number;
}

const TodayResultChart: React.FC<TodayResultChartProps> = ({ trainingTimeMs, restTimeMs, creativeTimeMs }) => {
  const data = {
    labels: ['Training', 'Rest', 'Creative'],
    datasets: [
      {
        label: 'Time (h)',
        data: [
          trainingTimeMs,
          restTimeMs,
          creativeTimeMs,
        ],
        backgroundColor: [
          '#E23B3B',
          '#4BE02A',
          '#C1E02A',
        ],
        borderColor: [
          '#E23B3B',
          '#4BE02A',
          '#C1E02A',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const { hours, minutes } = decomposeMilliseconds(typeof tooltipItem.raw === "number" ? tooltipItem.raw : 0)
            return `${hours}時間${minutes}分`
          }
        },
      },
      datalabels: {
        color: 'black',
        font: {
          weight: 'bold',
          size: 14,
        },
        formatter: (value: number) => {
          return `${convertMsToUnit(value, "hours", 1)} h`;
        },
        anchor: 'end',
        align: 'top',
      },
    },
    scales: {
      y: {
        ticks: {
          // Y軸の値を時間単位（h）で表示
          callback(tickValue, _, __) {
            return convertMsToUnit(tickValue as number, "hours");
          },
        },
      },
    },
  };

  return (
    <Bar data={data} options={options} />
  );
};

export default TodayResultChart;
