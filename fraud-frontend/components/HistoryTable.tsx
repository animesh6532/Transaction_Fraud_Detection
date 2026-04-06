"use client";

import { useState, useEffect } from "react";
import { AlertTriangle, CheckCircle2, MoreHorizontal, Search, Settings2 } from "lucide-react";

export default function HistoryTable() {
  const [history, setHistory] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    try {
      const stored = localStorage.getItem('transaction_history_v2');
      if (stored) {
        setHistory(JSON.parse(stored));
      }
    } catch (e) {}
  }, []);

  const filteredHistory = history.filter(h => 
    h.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    h.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="glass-panel p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h2 className="text-lg font-bold text-white tracking-wide">Transaction Logs</h2>
          <p className="text-xs text-slate-400">Showing {filteredHistory.length} local records</p>
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search ID or category..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900/50 border border-slate-700/60 rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-cyan-500/50 transition-all text-white placeholder:text-slate-500"
            />
          </div>
          <button className="p-2 border border-slate-700/60 rounded-lg bg-slate-900/50 text-slate-400 hover:text-white transition-colors">
            <Settings2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800">
              <th className="pb-3 text-xs font-semibold text-slate-400 uppercase tracking-wider pl-4">Txn ID</th>
              <th className="pb-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Date & Time</th>
              <th className="pb-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Amount</th>
              <th className="pb-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Category</th>
              <th className="pb-3 text-xs font-semibold text-slate-400 uppercase tracking-wider text-center">AI Risk</th>
              <th className="pb-3 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right pr-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredHistory.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-12 text-slate-500">
                  <div className="flex flex-col items-center">
                    <DatabaseIcon />
                    <p className="mt-4">No records found matching criteria.</p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredHistory.map((row, i) => (
                <tr key={i} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors group">
                  <td className="py-4 pl-4 font-mono text-sm text-cyan-400">{row.id}</td>
                  <td className="py-4 text-sm text-slate-300">
                    <div className="flex flex-col">
                      <span>{row.date}</span>
                      <span className="text-xs text-slate-500">{row.timestamp}</span>
                    </div>
                  </td>
                  <td className="py-4 font-semibold text-white">${Number(row.amount).toFixed(2)}</td>
                  <td className="py-4 text-sm text-slate-300 capitalize">{row.category.replace('_', ' ')}</td>
                  <td className="py-4 text-center">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${
                      row.risk === "Critical" ? "bg-red-500/10 text-red-500 border-red-500/20" :
                      row.risk === "High" ? "bg-orange-500/10 text-orange-500 border-orange-500/20" :
                      row.risk === "Medium" ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20" :
                      "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                    }`}>
                       {row.risk === "Low" ? <CheckCircle2 className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                       {row.risk}
                    </span>
                  </td>
                  <td className="py-4 text-right pr-4">
                    <button className="text-slate-500 hover:text-white transition-colors opacity-0 group-hover:opacity-100 p-1">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const DatabaseIcon = () => (
  <svg className="w-12 h-12 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
  </svg>
);
