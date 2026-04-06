"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import LiveAlertFeed from "@/components/analytics/LiveAlertFeed";
import { OverviewTrendChart, RiskDistributionChart } from "@/components/analytics/DashboardCharts";
import { Shield, Activity, Target, AlertTriangle } from "lucide-react";
import { format } from "date-fns";

export default function DashboardOverview() {
  const [history, setHistory] = useState<any[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('transaction_history');
    if (stored) {
      setHistory(JSON.parse(stored));
    }
  }, []);

  // Compute stats
  const totalScans = history.length;
  
  const fraudAmountPrevented = history
    .filter(record => record.isFraud || record.riskVariant === "critical" || record.riskVariant === "high")
    .reduce((sum, record) => sum + (Number(record.amount) || 0), 0);

  const criticalIntercepts = history.filter(record => record.riskVariant === "critical" || record.isFraud).length;
  
  const recentHistory = history.slice(0, 10);
  const recentFraudCount = recentHistory.filter(record => record.isFraud).length;
  
  let threatLevel = "VERIFIED SAFE";
  let threatColor = "text-emerald-400";
  let threatBg = "border-emerald-500/20 bg-emerald-900/10 shadow-[inset_0_0_20px_rgba(16,185,129,0.05)]";

  if (recentFraudCount >= 3) {
    threatLevel = "CRITICAL OUTBREAK";
    threatColor = "text-red-400";
    threatBg = "border-red-500/20 bg-red-900/10 shadow-[inset_0_0_20px_rgba(239,68,68,0.05)]";
  } else if (recentFraudCount > 0) {
    threatLevel = "ELEVATED RISK";
    threatColor = "text-orange-400";
    threatBg = "border-orange-500/20 bg-orange-900/10 shadow-[inset_0_0_20px_rgba(249,115,22,0.05)]";
  } else if (totalScans === 0) {
    threatLevel = "SYSTEM IDLE";
    threatColor = "text-slate-400";
    threatBg = "border-slate-800 bg-slate-900/50";
  }

  // Compute Risk Distribution
  const distCounts = { safe: 0, elevated: 0, high: 0, critical: 0 };
  history.forEach(r => {
    if (r.riskVariant === "safe" || !r.isFraud) distCounts.safe++;
    if (r.riskVariant === "elevated") distCounts.elevated++;
    if (r.riskVariant === "high") distCounts.high++;
    if (r.riskVariant === "critical" || r.isFraud) distCounts.critical++;
  });

  const distData = [
    { name: "Verified Safe", value: distCounts.safe, color: "#10b981" },
    { name: "Elevated", value: distCounts.elevated, color: "#f59e0b" },
    { name: "High", value: distCounts.high, color: "#f97316" },
    { name: "Critical", value: distCounts.critical, color: "#ef4444" },
  ];

  // Compute Trends (Group by Hour)
  // Simplified logic to group recent transactions by their hour or just chronological windows
  const trendMap = new Map();
  [...history].reverse().forEach(record => {
    if (!record.timestamp) return;
    const hourLabel = format(new Date(record.timestamp), "HH:mm");
    if (!trendMap.has(hourLabel)) {
      trendMap.set(hourLabel, { safe: 0, risk: 0 });
    }
    const val = trendMap.get(hourLabel);
    if (record.isFraud || record.riskVariant === "critical" || record.riskVariant === "high") {
       val.risk += 1;
    } else {
       val.safe += 1;
    }
  });

  // Limit to last 7 distinct time buckets
  const trendData = Array.from(trendMap.entries()).slice(-7).map(([time, counts]) => ({
     time, 
     safe: counts.safe, 
     risk: counts.risk 
  }));

  if (!mounted) return null;

  return (
    <div className="flex flex-col h-full space-y-6">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-100 to-slate-400">Security Command Center</h1>
          <p className="text-sm text-slate-400 mt-1">Real-time macro analysis of system telemetry.</p>
        </div>
        <div className="flex items-center gap-2">
           <span className="flex h-2.5 w-2.5 relative">
             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
             <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
           </span>
           <span className="text-sm font-medium text-emerald-400 uppercase tracking-widest">Global Defense Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium text-slate-400 uppercase tracking-wider">Total Scans Evaluated</p>
              <Activity className="h-4 w-4 text-slate-500" />
            </div>
            <div className="flex items-end justify-between mt-2">
               <div>
                  <div className="text-3xl font-bold text-slate-100">{totalScans}</div>
               </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium text-slate-400 uppercase tracking-wider">Fraud Prevented</p>
              <Shield className="h-4 w-4 text-emerald-500" />
            </div>
            <div className="flex items-end justify-between mt-2">
               <div>
                  <div className="text-3xl font-bold text-slate-100">₹{fraudAmountPrevented.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                  <p className="text-xs text-emerald-400 mt-1">Saved from blocked transactions</p>
               </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className={`p-6 ${threatBg} transition-colors border`}>
            <div className="flex items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium text-slate-400 uppercase tracking-wider">Active Threat Level</p>
              <Target className={`h-4 w-4 ${threatColor}`} />
            </div>
            <div className="flex items-end justify-between mt-2">
               <div>
                  <div className={`text-xl font-bold ${threatColor}`}>{threatLevel}</div>
               </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 border-red-500/20 bg-red-900/10 shadow-[inset_0_0_20px_rgba(239,68,68,0.05)] border">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium text-slate-400 uppercase tracking-wider">Critical Intercepts</p>
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </div>
            <div className="flex items-end justify-between mt-2">
               <div>
                  <div className="text-3xl font-bold text-red-400">{criticalIntercepts}</div>
                  <p className="text-xs text-red-400 mt-1">Flagged as fraudulent</p>
               </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-[500px]">
        {/* Main Charts Area */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <Card className="flex-1 min-h-[380px]">
             <CardHeader className="pb-2">
                  <CardTitle>Risk Distribution Vector</CardTitle>
                  <CardDescription>Categorical breakdown of analyzed transactions.</CardDescription>
             </CardHeader>
             <CardContent>
                 <RiskDistributionChart data={distData} />
             </CardContent>
          </Card>
          <Card className="flex-1 min-h-[380px]">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
               <div>
                  <CardTitle>Transaction Velocity vs Risk Spikes</CardTitle>
                  <CardDescription>Chronological overview of processing load and detected anomalies.</CardDescription>
               </div>
            </CardHeader>
            <CardContent>
               <OverviewTrendChart data={trendData} />
            </CardContent>
          </Card>
        </div>

        {/* Live Alert Sidebar */}
        <div className="lg:col-span-4 h-[600px] lg:h-auto">
           <LiveAlertFeed />
        </div>
      </div>

    </div>
  );
}
