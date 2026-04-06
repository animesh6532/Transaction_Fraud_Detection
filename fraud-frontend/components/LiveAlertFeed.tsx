"use client";

import { motion } from "framer-motion";
import { AlertTriangle, ShieldAlert, Zap, Clock, Database } from "lucide-react";
import { useEffect, useState } from "react";
import { getAlerts } from "@/lib/historyStore";

export default function LiveAlertFeed() {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Poll local storage to see if new alerts show up from predictions
    const updateAlerts = () => {
      const realAlerts = getAlerts();
      setAlerts(realAlerts);
    };

    updateAlerts();
    const interval = setInterval(updateAlerts, 2000);
    return () => clearInterval(interval);
  }, []);

  if (!isClient) return <div className="glass-panel p-5 h-[400px]"></div>;

  return (
    <div className="glass-panel p-5 relative overflow-hidden flex flex-col h-[400px]">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-orange-500 to-transparent"></div>
      
      <div className="flex items-center justify-between mb-4 mt-1">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-red-500" />
          <h3 className="font-bold text-white text-lg">Real-Time Threat Feed</h3>
        </div>
        <div className="flex items-center gap-1.5">
           {alerts.length > 0 ? (
            <>
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
              </span>
              <span className="text-[10px] text-red-400 uppercase tracking-widest font-bold">Monitoring</span>
            </>
           ) : (
            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Idle</span>
           )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto hide-scrollbar space-y-3 pr-2">
        {alerts.length === 0 ? (
           <div className="h-full flex flex-col items-center justify-center text-center text-slate-500 space-y-3 opacity-60 relative z-10">
             <div className="w-16 h-16 rounded-full border border-slate-700/50 flex items-center justify-center">
               <ShieldAlert className="w-8 h-8 text-slate-600" />
             </div>
             <div>
               <p className="font-semibold text-sm">No Fraud Alerts</p>
               <p className="text-xs max-w-[200px] mx-auto mt-1">Run predictions on transactions to generate real threat data here.</p>
             </div>
           </div>
        ) : (
          alerts.map((alert, i) => (
            <motion.div
              layout
              key={alert.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className={`p-3 rounded-xl border ${
                alert.risk === "Critical" ? "bg-red-500/10 border-red-500/30" :
                "bg-orange-500/10 border-orange-500/30"
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <AlertTriangle className={`w-4 h-4 ${alert.risk === "Critical" ? "text-red-400" : "text-orange-400"}`} />
                  <span className="text-sm font-mono text-slate-300">{alert.id}</span>
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                  alert.risk === "Critical" ? "bg-red-500/20 text-red-400" :
                  "bg-orange-500/20 text-orange-400"
                }`}>
                  {alert.risk}
                </span>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-lg font-bold text-white">${alert.amount.toLocaleString()}</p>
                  <p className="text-xs text-slate-400 mt-0.5 truncate w-32 capitalize">{alert.category.replace('_', ' ')}</p>
                </div>
                <div className="flex items-center gap-1 text-slate-500 text-xs">
                  <Clock className="w-3 h-3" />
                  {alert.timestamp}
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
