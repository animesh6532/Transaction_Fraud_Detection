"use client";

import { useEffect, useState } from "react";
import { ShieldAlert, AlertTriangle, CheckCircle, Activity, Database } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

type Alert = {
  id: string;
  amount: number;
  location: string;
  risk: "safe" | "elevated" | "high" | "critical";
  timestamp: string;
};

export default function LiveAlertFeed() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [mounted, setMounted] = useState(false);

  // Poll local storage for new, real predictions
  useEffect(() => {
    setMounted(true);
    
    const fetchRealAlerts = () => {
      try {
        const stored = localStorage.getItem('transaction_history');
        if (stored) {
          const history = JSON.parse(stored);
          const mappedAlerts = history.map((record: any) => ({
             id: record.id,
             amount: record.amount,
             location: `${record.category.replace('_', ' ').toUpperCase()}`, // Using category as location proxy if actual location isn't stored
             risk: record.riskVariant,
             timestamp: record.timestamp
          }));
          setAlerts(mappedAlerts.slice(0, 15)); // Show only up to 15 recent real scans
        }
      } catch (e) {
        console.error("Error reading history for live feed", e);
      }
    };

    fetchRealAlerts();
    
    // Poll every 5 seconds to catch new form submissions from other tabs/routes
    const interval = setInterval(fetchRealAlerts, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex flex-col h-full overflow-hidden border border-slate-800/60 bg-slate-900/40 rounded-2xl backdrop-blur-xl">
      <div className="p-4 border-b border-slate-800/60 flex items-center justify-between bg-slate-900/60">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-blue-400 animate-pulse" />
          <h3 className="font-semibold text-slate-100">Live Scans</h3>
        </div>
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
      </div>
      
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {alerts.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-4">
             <Database className="w-8 h-8 text-slate-600 mb-2" />
             <p className="text-sm text-slate-400">No transactions analyzed yet.</p>
             <p className="text-xs text-slate-500 mt-1">Submit predictions to populate feed.</p>
          </div>
        ) : (
          alerts.map((alert) => (
            <div 
              key={alert.id}
              className={cn(
                "p-3 rounded-xl border border-slate-800/40 text-sm transition-all animate-in fade-in slide-in-from-right-4 duration-500",
                alert.risk === "critical" ? "bg-red-500/10 hover:bg-red-500/20 border-red-500/30" : 
                alert.risk === "high" ? "bg-orange-500/5 hover:bg-orange-500/10 border-orange-500/20" :
                alert.risk === "elevated" ? "bg-amber-500/5 hover:bg-amber-500/10 border-amber-500/20" :
                "bg-slate-800/30 hover:bg-slate-800/50"
              )}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  {alert.risk === "critical" || alert.risk === "high" ? (
                    <AlertTriangle className={cn("w-4 h-4", alert.risk === "critical" ? "text-red-400" : "text-orange-400")} />
                  ) : alert.risk === "elevated" ? (
                    <ShieldAlert className="w-4 h-4 text-amber-400" />
                  ) : (
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                  )}
                  <span className="text-slate-300 font-mono text-xs max-w-[100px] truncate">TXN-{alert.id}</span>
                </div>
                <Badge variant={alert.risk} className="text-[10px] px-1.5 py-0">{alert.risk}</Badge>
              </div>
              
              <div className="flex justify-between items-end gap-2">
                <div className="flex-1">
                  <p className={cn("font-medium", alert.risk === "critical" || alert.risk === "high" ? "text-slate-100" : "text-slate-300")}>
                    ₹{alert.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5 truncate max-w-[120px]">{alert.location}</p>
                </div>
                <span className="text-[10px] text-slate-500 whitespace-nowrap">
                  {formatDistanceToNow(new Date(alert.timestamp), { addSuffix: true })}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
