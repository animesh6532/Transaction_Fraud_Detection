"use client";

import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import { getAnalytics, getEmptyChartData } from '@/lib/historyStore';
import { Database } from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ChartTooltip,
  Legend,
  ArcElement
);

export default function AnalyticsDashboard() {
  const [data, setData] = useState<any>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const analytics = getAnalytics();
    if (analytics.total > 0) {
      setData(analytics);
    }
  }, []);

  if (!isClient) return <div className="grid grid-cols-1 lg:grid-cols-3 gap-6"><div className="lg:col-span-2 glass-panel h-[400px]"></div></div>;

  if (!data) {
    return (
      <div className="glass-panel p-12 flex flex-col items-center justify-center text-center h-[400px]">
         <div className="w-20 h-20 bg-slate-800/50 rounded-full flex items-center justify-center mb-6 border border-slate-700/50">
           <Database className="w-10 h-10 text-slate-500" />
         </div>
         <h3 className="text-xl font-bold text-white mb-2">Insufficient Ground Truth Data</h3>
         <p className="text-slate-400 max-w-sm">
           The analytics engine requires transaction predictions to generate accurate data models. Please run predictions to populate this intelligence dashboard.
         </p>
      </div>
    );
  }

  // Derive Bar Chart from the actual distribution data just as a visual representation
  // Since we don't track by day in localStorage easily right now, we will map categories or risk levels securely.
  
  const barData = {
    labels: ['Safe', 'Fraud'],
    datasets: [
      {
        label: 'Transaction Volume',
        data: [data.safeCount, data.fraudCount],
        backgroundColor: [
          'rgba(16, 185, 129, 0.8)',
          'rgba(239, 68, 68, 0.8)'
        ],
        borderRadius: 4,
      }
    ]
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        titleColor: '#fff',
        bodyColor: '#cbd5e1',
        borderColor: 'rgba(56, 189, 248, 0.2)',
        borderWidth: 1,
      }
    },
    scales: {
      y: { grid: { color: 'rgba(148, 163, 184, 0.1)' }, ticks: { color: '#64748b', precision: 0 } },
      x: { grid: { display: false }, ticks: { color: '#64748b' } }
    }
  };

  const doughnutData = {
    labels: ['Low Risk', 'Medium Risk', 'High Risk', 'Critical'],
    datasets: [{
      data: [data.riskDistribution.Low, data.riskDistribution.Medium, data.riskDistribution.High, data.riskDistribution.Critical],
      backgroundColor: [
        'rgba(16, 185, 129, 0.8)',
        'rgba(245, 158, 11, 0.8)',
        'rgba(249, 115, 22, 0.8)',
        'rgba(239, 68, 68, 0.8)'
      ],
      borderColor: 'rgba(15, 23, 42, 1)',
      borderWidth: 2,
    }]
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom' as const, labels: { color: '#cbd5e1', padding: 20 } },
    },
    cutout: '70%',
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 glass-panel p-6 h-[400px]">
        <h3 className="font-bold text-white text-lg mb-4">Class Distribution (Real Predictions)</h3>
        <div className="h-[300px]">
           <Bar data={barData} options={barOptions} />
        </div>
      </div>
      
      <div className="glass-panel p-6 h-[400px]">
        <h3 className="font-bold text-white text-lg mb-4">Overall Risk Spread</h3>
         <div className="h-[300px]">
           <Doughnut data={doughnutData} options={doughnutOptions} />
        </div>
      </div>
    </div>
  );
}
