"use client";

import { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { BellRing, ShieldAlert, AlertTriangle, Search, FilterX, Activity, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

type AlertEntry = {
  id: string;
  timestamp: string;
  amount: number;
  category: string;
  isFraud: boolean;
  riskLevel: string;
  riskVariant: "safe" | "elevated" | "high" | "critical" ;
  riskScore: number;
};

export default function AlertsMonitoringConsole() {
  const [alerts, setAlerts] = useState<AlertEntry[]>([]);
  const [filter, setFilter] = useState<string>("all_risks");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const fetchAlerts = () => {
      try {
        const stored = localStorage.getItem('transaction_history');
        if (stored) {
          const history: AlertEntry[] = JSON.parse(stored);
          setAlerts(history);
        }
      } catch (e) {
        console.error("Error reading history", e);
      }
    };
    
    fetchAlerts();
    // Poll every 5 seconds to act as a live SOC feed
    const interval = setInterval(fetchAlerts, 5000);
    return () => clearInterval(interval);
  }, []);

  const clearFilter = () => setFilter("all_risks");

  const filteredAlerts = alerts.filter(record => {
    if (filter === "all_risks") return record.riskVariant !== "safe"; // Live Monitoring typically ignores 100% verified safe
    if (filter === "critical") return record.riskVariant === "critical" || record.isFraud;
    if (filter === "high") return record.riskVariant === "high";
    if (filter === "elevated") return record.riskVariant === "elevated";
    return true;
  });

  if (!mounted) return null;

  return (
    <div className="max-w-[1200px] mx-auto h-full flex flex-col space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-red-500/10 border border-red-500/20 rounded-lg shadow-[0_0_15px_rgba(239,68,68,0.15)] relative">
             <BellRing className="w-6 h-6 text-red-500 animate-pulse" />
             <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full animate-ping pointer-events-none" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-100 to-slate-400">Security Operations (SOC)</h1>
            <p className="text-sm text-slate-400 font-medium">Active Threat Interception & Alert Management</p>
          </div>
        </div>

        <div className="flex items-center gap-2 border border-slate-800 bg-slate-900/60 p-1.5 rounded-xl backdrop-blur-md">
           <button 
             onClick={() => setFilter("all_risks")}
             className={cn("px-4 py-2 text-sm font-semibold rounded-lg transition-all", filter === "all_risks" ? "bg-slate-800 text-white shadow-md border border-slate-700" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50")}
           >
             All Active Threats
           </button>
           <button 
             onClick={() => setFilter("critical")}
             className={cn("px-4 py-2 text-sm font-semibold rounded-lg transition-all", filter === "critical" ? "bg-red-500/10 text-red-400 border border-red-500/30" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50")}
           >
             Blocked
           </button>
           <button 
             onClick={() => setFilter("high")}
             className={cn("px-4 py-2 text-sm font-semibold rounded-lg transition-all", filter === "high" ? "bg-orange-500/10 text-orange-400 border border-orange-500/30" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50")}
           >
             High Risk
           </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar pb-6">
        <div className="grid gap-4">
           {filteredAlerts.length === 0 ? (
             <Card className="border-slate-800/50 bg-slate-900/40 backdrop-blur-sm mt-8">
               <CardContent className="flex flex-col items-center justify-center p-16 text-center">
                 <div className="w-20 h-20 rounded-full border border-slate-800 bg-slate-900 flex items-center justify-center mb-6">
                   <ShieldAlert className="w-10 h-10 text-emerald-500 opacity-80" />
                 </div>
                 <h2 className="text-xl font-bold text-slate-200 mb-2">No Active Threats Detected</h2>
                 <p className="text-sm text-slate-500 max-w-md">
                   The ML pipeline is actively scanning incoming transactions. Currently, there are no unhandled {filter !== 'all_risks' ? filter : ''} threat vectors.
                 </p>
                 {filter !== "all_risks" && (
                   <button onClick={clearFilter} className="mt-6 flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300">
                     <FilterX className="w-4 h-4" /> Clear filters
                   </button>
                 )}
               </CardContent>
             </Card>
           ) : (
             filteredAlerts.map(alert => (
               <Card 
                 key={alert.id} 
                 className={cn(
                   "group relative overflow-hidden transition-all duration-500 border-l-[3px]",
                   alert.riskVariant === "critical" || alert.isFraud ? "border-l-red-500 border-t-slate-800/60 border-r-slate-800/60 border-b-slate-800/60 bg-red-950/20 hover:bg-red-950/30" : 
                   alert.riskVariant === "high" ? "border-l-orange-500 border-t-slate-800/60 border-r-slate-800/60 border-b-slate-800/60 bg-orange-950/10 hover:bg-orange-950/20" :
                   "border-l-amber-500 border-t-slate-800/60 border-r-slate-800/60 border-b-slate-800/60 bg-slate-900/40 hover:bg-slate-900/60"
                 )}
               >
                 <div className="absolute inset-x-0 h-px top-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                 
                 <CardContent className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                   
                   {/* Alert Logic Origin */}
                   <div className="flex items-start gap-4">
                     <div className={cn(
                       "mt-1 p-2.5 rounded-full border",
                       alert.riskVariant === "critical" || alert.isFraud ? "bg-red-500/10 border-red-500/30" : 
                       alert.riskVariant === "high" ? "bg-orange-500/10 border-orange-500/30" :
                       "bg-amber-500/10 border-amber-500/30"
                     )}>
                        {(alert.riskVariant === "critical" || alert.isFraud) ? <AlertTriangle className="w-5 h-5 text-red-500" /> : <ShieldAlert className="w-5 h-5 text-orange-400" />}
                     </div>
                     <div>
                       <div className="flex items-center gap-3 mb-1">
                         <span className="font-mono text-[11px] uppercase tracking-wider text-slate-500 font-semibold border border-slate-700 bg-slate-800 px-1.5 rounded">
                           TXN-{alert.id}
                         </span>
                         <span className="text-xs text-slate-500">{formatDistanceToNow(new Date(alert.timestamp), { addSuffix: true })}</span>
                       </div>
                       <h3 className="text-lg font-bold text-slate-200">
                         Anomalous <span className="font-mono bg-slate-800 px-1 rounded mx-1 text-blue-300">{alert.category.toUpperCase().replace('_', ' ')}</span> Vector Detected
                       </h3>
                       <p className="text-sm text-slate-400 mt-1 max-w-xl">
                         Model flagged telemetry exceeding systemic baseline. Automated interception protocol executed. Confidence interval calculated at <strong className="text-slate-300">{alert.riskScore.toFixed(1)}%</strong>.
                       </p>
                     </div>
                   </div>

                   {/* Threat Statistics */}
                   <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-4 bg-slate-950/50 p-4 rounded-xl border border-slate-800/50 min-w-[200px]">
                      <div>
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest text-right mb-1">Volume</p>
                        <p className="text-xl font-mono text-slate-200">
                           ₹{alert.amount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                        </p>
                      </div>
                      <div className="flex flex-col items-end">
                        <Badge variant={alert.riskVariant || (alert.isFraud ? "critical" : "elevated")} className="uppercase tracking-widest text-[10px] px-2 py-0.5">
                           {alert.riskLevel || (alert.isFraud ? 'Critical' : 'Elevated')} Threat
                        </Badge>
                      </div>
                   </div>

                 </CardContent>
               </Card>
             ))
           )}
        </div>
      </div>

    </div>
  );
}
