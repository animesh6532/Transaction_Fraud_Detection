"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  Legend,
} from "recharts";

interface TrendData {
  time: string;
  safe: number;
  risk: number;
}

interface DistData {
  name: string;
  value: number;
  color: string;
}

export function OverviewTrendChart({ data }: { data: TrendData[] }) {
  if (!data || data.length === 0) {
    return <div className="h-[300px] flex items-center justify-center text-slate-500 font-medium">Insufficient data for trend analysis.</div>;
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="colorSafe" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4} />
            <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis 
          dataKey="time" 
          stroke="#475569" 
          fontSize={12} 
          tickLine={false} 
          axisLine={false} 
        />
        <YAxis 
          stroke="#475569" 
          fontSize={12} 
          tickLine={false} 
          axisLine={false} 
          tickFormatter={(value) => `${value}`} 
        />
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
        <Tooltip 
           contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', borderColor: 'rgba(148, 163, 184, 0.2)', borderRadius: '8px' }}
           itemStyle={{ color: '#e2e8f0' }}
        />
        <Area type="monotone" dataKey="safe" stroke="#10b981" fillOpacity={1} fill="url(#colorSafe)" strokeWidth={2} />
        <Area type="monotone" dataKey="risk" stroke="#ef4444" fillOpacity={1} fill="url(#colorRisk)" strokeWidth={2} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function RiskDistributionChart({ data }: { data: DistData[] }) {
  if (!data || data.length === 0 || data.every(d => d.value === 0)) {
    return <div className="h-[300px] flex items-center justify-center text-slate-500 font-medium">Insufficient data for distribution analysis.</div>;
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} layout="vertical" margin={{ top: 10, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#1e293b" />
        <XAxis type="number" stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} width={80} />
        <Tooltip 
           cursor={{ fill: 'rgba(56, 189, 248, 0.05)' }}
           contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', borderColor: 'rgba(148, 163, 184, 0.2)', borderRadius: '8px' }}
        />
        <Bar dataKey="value" radius={[0, 4, 4, 0]}>
          {
            data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))
          }
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
