"use client";

import { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { Download, Search, Filter, History, Trash2, ArrowUpDown } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent } from "@/components/ui/Card";
import toast from "react-hot-toast";

type TransactionRecord = {
  id: string;
  timestamp: string;
  amount: number;
  category: string;
  isFraud: boolean;
  riskLevel: string;
  riskVariant: any;
  riskScore: number;
};

export default function HistoryPage() {
  const [history, setHistory] = useState<TransactionRecord[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    try {
      const stored = localStorage.getItem('transaction_history');
      if (stored) {
        setHistory(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Error loading history", e);
    }
  }, []);

  const clearHistory = () => {
    localStorage.removeItem('transaction_history');
    setHistory([]);
    toast.success("Monitoring logs cleared.");
  };

  const filteredHistory = history.filter(record => 
    record.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    record.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const exportCSV = () => {
    if (history.length === 0) {
      toast.error("No history available to export.");
      return;
    }
    
    const headers = ["Transaction ID,Timestamp,Amount (INR),Category,Fraud Prediction,Risk Level,Risk Score"];
    const rows = history.map(row => {
      // Basic formatting for CSV
      return `${row.id},"${new Date(row.timestamp).toISOString()}",${row.amount},${row.category},${row.isFraud ? 'Fraud' : 'Safe'},${row.riskLevel},${row.riskScore}`;
    });
    
    const csvContent = headers.concat(rows).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `fraud_detect_transaction_history_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("CSV Exported successfully!");
  };

  return (
    <div className="max-w-[1400px] mx-auto h-full flex flex-col">
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-500/10 border border-blue-500/20 rounded-lg shadow-[0_0_15px_rgba(59,130,246,0.15)]">
             <History className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-100 to-slate-400">Forensic Logs</h1>
            <p className="text-sm text-slate-400 font-medium">Historical register of processed telemetry and interceptions.</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
           <button onClick={clearHistory} className="flex items-center gap-2 px-4 py-2 border border-slate-700 hover:border-red-500/50 bg-slate-800/50 hover:bg-red-500/10 text-slate-300 hover:text-red-400 text-sm font-medium rounded-lg transition-colors">
              <Trash2 className="w-4 h-4" /> Purge Logs
           </button>
           <button onClick={exportCSV} disabled={history.length === 0} className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-sm font-medium rounded-lg shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all disabled:opacity-50 disabled:cursor-not-allowed">
              <Download className="w-4 h-4" /> Export CSV
           </button>
        </div>
      </div>

      <Card className="flex-1 flex flex-col min-h-0 relative overflow-hidden backdrop-blur-2xl">
         {/* Subtle styling elements */}
         <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-500/5 blur-[120px] rounded-full pointer-events-none" />

         <CardContent className="p-0 flex flex-col h-full relative z-10">
            {/* Toolbar */}
            <div className="p-4 border-b border-slate-800/60 flex flex-col sm:flex-row sm:items-center gap-4 bg-slate-900/40">
               <div className="relative flex-1 max-w-sm">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                 <input 
                   type="text" 
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                   placeholder="Search by ID or Sector..." 
                   className="w-full bg-slate-950/50 border border-slate-700/50 focus:border-blue-500/50 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all font-mono"
                 />
               </div>
               <button className="flex items-center gap-2 px-3 py-2 border border-slate-700/50 bg-slate-800/30 hover:bg-slate-800/60 text-slate-300 text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors ml-auto sm:ml-0">
                 <Filter className="w-3.5 h-3.5" /> Filter Matrix
               </button>
            </div>

            {/* Table wrapper */}
            <div className="flex-1 overflow-auto custom-scrollbar">
               {filteredHistory.length === 0 ? (
                 <div className="h-full flex flex-col items-center justify-center text-slate-500 py-12">
                   <div className="w-16 h-16 rounded-2xl bg-slate-800/30 flex items-center justify-center mb-4 border border-slate-700/50">
                      <History className="w-8 h-8 text-slate-600" />
                   </div>
                   <p className="font-medium text-slate-400">No telemetry fragments located.</p>
                 </div>
               ) : (
                 <table className="data-table">
                   <thead>
                     <tr>
                       <th className="w-24">TXN Hash</th>
                       <th>Processed Time</th>
                       <th>Sector</th>
                       <th className="text-right">Transfer Vol</th>
                       <th className="text-center">Threat Vector</th>
                       <th className="text-right">Risk Factor</th>
                     </tr>
                   </thead>
                   <tbody>
                     {filteredHistory.map((record) => (
                       <tr key={record.id} className="group">
                         <td className="text-blue-400 font-bold tracking-widest">{record.id}</td>
                         <td>
                           <div>
                              <p className="text-slate-200">{formatDistanceToNow(new Date(record.timestamp), { addSuffix: true })}</p>
                              <p className="text-[10px] text-slate-500 mt-0.5">{new Date(record.timestamp).toLocaleString()}</p>
                           </div>
                         </td>
                         <td>
                            <span className="inline-flex items-center px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-xs border border-slate-700 uppercase">
                              {record.category.replace('_', ' ')}
                            </span>
                         </td>
                         <td className="text-right">
                           <span className="text-slate-100 font-semibold">₹{record.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                         </td>
                         <td className="text-center">
                           <Badge variant={record.riskVariant || (record.isFraud ? "critical" : "safe")}>
                             {record.riskLevel || (record.isFraud ? "CRITICAL" : "SAFE")}
                           </Badge>
                         </td>
                         <td className="text-right pr-6">
                            <div className="flex items-center justify-end gap-2">
                               <span className="text-slate-400 font-medium">{record.riskScore?.toFixed(1) || (record.isFraud ? 95.0 : 12.0)}%</span>
                               <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                 <div 
                                    className={`h-full ${record.isFraud ? 'bg-red-500' : 'bg-emerald-500'}`} 
                                    style={{ width: `${record.riskScore || (record.isFraud ? 95 : 12)}%` }} 
                                 />
                               </div>
                            </div>
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               )}
            </div>
         </CardContent>
      </Card>
    </div>
  );
}
