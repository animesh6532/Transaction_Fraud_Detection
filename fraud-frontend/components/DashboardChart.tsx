"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { getChartData } from '@/lib/mockData';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export default function DashboardChart() {
  const data = getChartData().trendData;

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        fill: true,
        label: 'Safe Transactions',
        data: data.safe,
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 0,
        pointHitRadius: 10,
      },
      {
        fill: true,
        label: 'Fraud Alerts',
        data: data.fraud,
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 0,
        pointHitRadius: 10,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#94a3b8',
          usePointStyle: true,
          boxWidth: 8,
          font: { family: 'Inter', size: 12 }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        titleColor: '#fff',
        bodyColor: '#cbd5e1',
        borderColor: 'rgba(56, 189, 248, 0.2)',
        borderWidth: 1,
        padding: 12,
        boxPadding: 6,
      }
    },
    scales: {
      y: {
        grid: {
          color: 'rgba(148, 163, 184, 0.1)',
          drawBorder: false,
        },
        ticks: { color: '#64748b', font: { family: 'Inter', size: 11 } }
      },
      x: {
        grid: { display: false, drawBorder: false },
        ticks: { color: '#64748b', font: { family: 'Inter', size: 11 } }
      }
    },
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
  };

  return (
    <div className="glass-panel p-5 h-[400px] flex flex-col">
      <div className="mb-4">
        <h3 className="font-bold text-white text-lg">Transaction Volume & Risk Trend</h3>
        <p className="text-xs text-slate-400">Live monitoring of network activity</p>
      </div>
      <div className="flex-1 w-full relative">
        <Line options={options} data={chartData} />
      </div>
    </div>
  );
}
