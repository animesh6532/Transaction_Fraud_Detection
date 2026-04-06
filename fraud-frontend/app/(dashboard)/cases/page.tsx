"use client";

import { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { FolderGit2, ShieldCheck, Filter, Search, ArrowRight, Activity, HandMetal, FileWarning } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

type CaseEntry = {
  id: string;
  timestamp: string;
  amount: number;
  category: string;
  isFraud: boolean;
  riskLevel: string;
  riskVariant: "safe" | "elevated" | "high" | "critical";
  riskScore: number;
  investigationStatus: string;
};

export default function InvestigationCasesPage() {
  const [cases, setCases] = useState<CaseEntry[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>("All Active");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const fetchCases = () => {
      try {
        const stored = localStorage.getItem('transaction_history');
        if (stored) {
          const history = JSON.parse(stored);
          const activeCases = history.filter((record: CaseEntry) => 
            record.investigationStatus === "New" || 
            record.investigationStatus === "Under Review" || 
            record.investigationStatus === "Escalated"
          );
          setCases(activeCases);
        }
      } catch (e) {
        console.error("Error reading cases:", e);
      }
    };
    fetchCases();
    
    // Auto-refresh cases to match SOC feed nature
    const interval = setInterval(fetchCases, 5000);
    return () => clearInterval(interval);
  }, []);

  const updateCaseStatus = (id: string, newStatus: string) => {
    try {
      const stored = localStorage.getItem('transaction_history');
      if (stored) {
        let history = JSON.parse(stored);
        history = history.map((record: CaseEntry) => {
          if (record.id === id) {
             return { ...record, investigationStatus: newStatus, analystAction: `Marked ${newStatus}` };
          }
          return record;
        });
        localStorage.setItem('transaction_history', JSON.stringify(history));
        
        // Optimistic UI update
        const updatedCases = cases.map(c => c.id === id ? { ...c, investigationStatus: newStatus } : c);
        setCases(updatedCases.filter(c => 
          c.investigationStatus === "New" || c.investigationStatus === "Under Review" || c.investigationStatus === "Escalated"
        ));
      }
    } catch {}
  };

  const filteredCases = cases.filter(c => {
     if (filterStatus === "All Active") return true;
     return c.investigationStatus === filterStatus;
  });

  if (!mounted) return null;

  return (
    <div className="max-w-[1400px] mx-auto h-full flex flex-col space-y-6">
      
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-500/10 border border-blue-500/20 rounded-lg shadow-[0_0_15px_rgba(59,130,246,0.15)]">
             <FolderGit2 className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-100 to-slate-400">Investigation Queue</h1>
            <p className="text-sm text-slate-400 font-medium">Pending Analyst Action Required: {cases.length}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 border border-slate-800 bg-slate-900/60 p-1.5 rounded-xl backdrop-blur-md">
           {["All Active", "New", "Under Review", "Escalated"].map((status) => (
             <button 
               key={status}
               onClick={() => setFilterStatus(status)}
               className={cn("px-4 py-2 text-sm font-semibold rounded-lg transition-all", filterStatus === status ? "bg-slate-800 text-white shadow-md border border-slate-700" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50")}
             >
               {status}
             </button>
           ))}
        </div>
      </div>

      {/* Main Queue View */}
      <div className="flex-1 overflow-y-auto custom-scrollbar pb-6 relative">
        {filteredCases.length === 0 ? (
          <Card className="border-slate-800/50 bg-slate-900/40 backdrop-blur-sm mt-8 border-dashed">
            <CardContent className="flex flex-col items-center justify-center p-20 text-center">
              <div className="w-24 h-24 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(16,185,129,0.1)]">
                <ShieldCheck className="w-12 h-12 text-emerald-400" />
              </div>
              <h2 className="text-xl font-bold text-slate-200 mb-3">Zero Pending Investigations</h2>
              <p className="text-sm text-slate-400 max-w-md leading-relaxed">
                The operations queue is entirely clear. All high-risk threats have been resolved or verified safe.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            {filteredCases.map((record) => (
              <Card key={record.id} className="bg-slate-900/60 border-slate-800 hover:border-slate-700/80 hover:bg-slate-900 transition-all overflow-hidden flex flex-col group relative">
                
                {/* Top Strip Identifier */}
                <div className={cn(
                  "h-1.5 w-full",
                  record.investigationStatus === "Escalated" ? "bg-red-500" :
                  record.investigationStatus === "Under Review" ? "bg-amber-500" :
                  "bg-blue-500"
                )} />

                <div className="p-5">
                  <div className="flex justify-between items-start mb-4 gap-4">
                    <div className="flex items-center gap-3">
                       <span className="font-mono text-xs text-slate-400 bg-slate-950 px-2 py-1 border border-slate-800 rounded">
                         TXN-{record.id}
                       </span>
                       <Badge variant={record.riskVariant || "elevated"} className="uppercase tracking-widest text-[10px]">
                         {record.riskScore.toFixed(1)}% {record.riskLevel}
                       </Badge>
                       <Badge variant="outline" className={cn(
                          "uppercase tracking-widest text-[10px]",
                          record.investigationStatus === "Escalated" ? "border-red-500/50 text-red-400 bg-red-500/10" :
                          record.investigationStatus === "Under Review" ? "border-amber-500/50 text-amber-400 bg-amber-500/10" :
                          "border-blue-500/50 text-blue-400 bg-blue-500/10"
                       )}>
                         Status: {record.investigationStatus}
                       </Badge>
                    </div>
                    <span className="text-xs text-slate-500 font-medium whitespace-nowrap">
                       {formatDistanceToNow(new Date(record.timestamp), { addSuffix: true })}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 p-4 rounded-lg bg-slate-950/50 border border-slate-800/50">
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Entity Match</p>
                      <p className="text-sm font-semibold text-slate-300 truncate">{record.category.toUpperCase().replace('_', ' ')}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Exposure</p>
                      <p className="text-sm font-semibold text-slate-300">₹{record.amount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Logic Status</p>
                      <p className="text-sm font-semibold text-slate-300">{record.isFraud ? 'Strict Deny' : 'Elevated'}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Required Action</p>
                      <p className="text-sm font-semibold text-amber-400">Manual Review</p>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="flex items-center justify-between border-t border-slate-800/50 pt-4 mt-auto">
                    <p className="text-xs text-slate-500">Actions update master ledger instantly.</p>
                    <div className="flex gap-2">
                       {record.investigationStatus === "New" && (
                         <button 
                           onClick={() => updateCaseStatus(record.id, "Under Review")}
                           className="px-3 py-1.5 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded text-xs font-semibold transition-colors flex items-center gap-2"
                         >
                           <HandMetal className="w-3 h-3" /> Claim Review
                         </button>
                       )}
                       
                       {record.investigationStatus !== "Escalated" && (
                         <button 
                           onClick={() => updateCaseStatus(record.id, "Escalated")}
                           className="px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 rounded text-xs font-semibold transition-colors flex items-center gap-2"
                         >
                           <FileWarning className="w-3 h-3" /> Escalate
                         </button>
                       )}

                       <button 
                          onClick={() => updateCaseStatus(record.id, "Resolved")}
                          className="px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded text-xs font-semibold transition-colors flex items-center gap-2"
                       >
                          <ShieldCheck className="w-3 h-3" /> Mark Resolved
                       </button>
                    </div>
                  </div>
                </div>

              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
