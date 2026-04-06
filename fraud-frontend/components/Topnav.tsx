"use client";

import { Search, User, Menu } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Topnav() {
  const pathname = usePathname();
  
  const getPageTitle = () => {
    switch(pathname) {
      case '/': return 'Command Dashboard';
      case '/predict': return 'AI Fraud Analysis';
      case '/alerts': return 'Live Monitoring Feed';
      case '/history': return 'Transaction History';
      case '/analytics': return 'Intelligence Analytics';
      default: return 'System';
    }
  };

  return (
    <header className="h-20 w-full flex items-center justify-between px-6 md:px-10 z-30 relative bg-[#030712]/50 backdrop-blur-md border-b border-slate-800/50">
      <div className="flex items-center gap-4">
        <button className="md:hidden p-2 text-slate-400 hover:text-white">
          <Menu className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 tracking-tight">
            {getPageTitle()}
          </h2>
          <p className="text-xs text-slate-500 font-medium hidden sm:block">Session active connected to neural net node NYC-1</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input 
            type="text" 
            placeholder="Search txn ID..." 
            className="w-48 bg-slate-900/50 border border-slate-800/60 rounded-full pl-9 pr-4 py-1.5 text-sm focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all placeholder:text-slate-600"
          />
        </div>
        
        <div className="flex items-center gap-3 pl-4 border-l border-slate-800">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-slate-200 leading-none mb-1">Admin User</p>
            <p className="text-[10px] text-cyan-500 font-bold uppercase tracking-widest leading-none">Lvl 4 Clearance</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center p-0.5 glow-border">
            <div className="w-full h-full rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
