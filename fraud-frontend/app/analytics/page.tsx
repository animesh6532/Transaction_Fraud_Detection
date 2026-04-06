"use client";

import AnalyticsDashboard from "@/components/AnalyticsDashboard";
import { Download } from "lucide-react";
import { useEffect, useState } from "react";
import { getAnalytics } from "@/lib/historyStore";

export default function AnalyticsPage() {
  const [stats, setStats] = useState({
    total: 0,
    fraud: 0,
    blockedAmt: 0,
  });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const data = getAnalytics();
    setStats({
      total: data.total,
      fraud: data.fraudCount,
      blockedAmt: data.totalAmountBlocked,
    });
  }, []);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Intelligence Analytics</h1>
          <p className="text-slate-400">Aggregate metrics and risk distributions from local storage.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-300 font-semibold rounded-lg transition-colors cursor-pointer text-sm">
          <Download className="w-4 h-4" /> Export Report
        </button>
      </div>

      <AnalyticsDashboard />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
         <div className="glass-panel p-6">
            <p className="text-sm text-slate-400 font-medium mb-1">Total Predictions Made</p>
            <h3 className="text-3xl font-bold text-white mb-2 tracking-tight">{isClient ? stats.total : 0}</h3>
            <p className="text-xs text-slate-500 font-semibold">Stored locally</p>
         </div>
         <div className="glass-panel p-6">
            <p className="text-sm text-slate-400 font-medium mb-1">High Risk Detections</p>
            <h3 className="text-3xl font-bold text-white mb-2 tracking-tight">{isClient ? stats.fraud : 0}</h3>
             <p className="text-xs text-red-400 font-semibold">{isClient && stats.total > 0 ? ((stats.fraud / stats.total) * 100).toFixed(1) : 0}% of volume</p>
         </div>
         <div className="glass-panel p-6">
            <p className="text-sm text-slate-400 font-medium mb-1">Total Prevented Loss</p>
            <h3 className="text-3xl font-bold text-emerald-500 mb-2 tracking-tight">${isClient ? stats.blockedAmt.toLocaleString() : 0}</h3>
             <p className="text-xs text-slate-500 font-semibold">Tracked from High/Critical results</p>
         </div>
      </div>
    </div>
  );
}
