"use client";

import { useEffect, useState } from "react";
import { Menu, Search, Code, ShieldAlert } from "lucide-react";

export default function Topnav() {
  const [criticalCount, setCriticalCount] = useState(0);

  useEffect(() => {
    const fetchCriticals = () => {
      try {
        const stored = localStorage.getItem('transaction_history');
        if (stored) {
          const history = JSON.parse(stored);
          const count = history.filter((record: any) => 
            record.investigationStatus !== "Resolved" && record.investigationStatus !== "Safe Verified" && (record.riskVariant === "critical" || record.riskVariant === "high")
          ).length;
          setCriticalCount(count);
        }
      } catch {}
    };
    fetchCriticals();
    const interval = setInterval(fetchCriticals, 3000);
    return () => clearInterval(interval);
  }, []);
  return (
    <header className="print:hidden sticky top-0 z-30 flex h-16 shrink-0 items-center gap-x-4 border-b border-slate-800/60 bg-slate-950/80 px-4 shadow-sm backdrop-blur-md sm:gap-x-6 sm:px-6 lg:px-8">
      <button type="button" className="-m-2.5 p-2.5 text-slate-400 hover:text-slate-300 md:hidden">
        <span className="sr-only">Open sidebar</span>
        <Menu className="h-6 w-6" aria-hidden="true" />
      </button>

      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <div className="relative flex flex-1 items-center">
           <div className="flex h-10 w-full max-w-md items-center gap-2 rounded-lg border border-slate-700/50 bg-slate-800/30 px-3 text-slate-400 text-sm focus-within:border-blue-500/50 focus-within:ring-1 focus-within:ring-blue-500/50 transition-all">
             <Search className="w-4 h-4 text-slate-500" />
             <input type="text" placeholder="Search transactions, entities, or rules..." className="flex-1 bg-transparent border-none outline-none text-slate-200 placeholder-slate-500 text-sm" />
             <span className="hidden sm:inline-block border border-slate-700 bg-slate-800 rounded px-1.5 py-0.5 text-xs font-mono text-slate-500">⌘K</span>
           </div>
        </div>
        <div className="flex items-center gap-x-4 lg:gap-x-6">
           {criticalCount > 0 && (
             <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-red-500/10 border border-red-500/30 rounded-lg shadow-[0_0_10px_rgba(239,68,68,0.2)]">
               <ShieldAlert className="w-4 h-4 text-red-400 animate-pulse" />
               <span className="text-xs font-bold text-red-400">{criticalCount} Active Threats</span>
             </div>
           )}
           <a href="https://github.com" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-slate-200 transition-colors">
              <Code className="w-5 h-5" />
           </a>
        </div>
      </div>
    </header>
  );
}
