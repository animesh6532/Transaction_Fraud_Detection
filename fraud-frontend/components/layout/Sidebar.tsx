"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, BrainCircuit, History, BellRing, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/predict", label: "Predictions", icon: BrainCircuit },
  { href: "/history", label: "Transaction History", icon: History },
  { href: "/alerts", label: "Live Alerts", icon: BellRing },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="print:hidden app-sidebar hidden md:flex flex-col">
      <div className="p-6 flex items-center gap-3 border-b border-slate-800/60">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.3)]">
          <ShieldCheck className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-white tracking-tight leading-none">Fraud Detect</h1>
          <p className="text-[10px] text-blue-400 font-mono tracking-widest mt-1 uppercase">Intelligence Platform</p>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto py-6">
        <div className="px-4 mb-3 text-xs font-semibold text-slate-500 tracking-wider uppercase">Analytics</div>
        <nav className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} className={cn("sidebar-link group", isActive && "active")}>
                <item.icon className={cn("w-5 h-5 transition-colors duration-200", isActive ? "text-blue-400" : "text-slate-500 group-hover:text-slate-300")} />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-6 border-t border-slate-800/60 transition-colors hover:bg-slate-900/50 cursor-pointer">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
            <span className="text-sm font-semibold text-slate-300">HA</span>
          </div>
          <div className="text-sm overflow-hidden">
            <p className="font-medium text-slate-200 leading-tight truncate">Head Analyst Primary</p>
            <p className="text-xs text-emerald-400 flex items-center gap-1.5 mt-0.5">
               <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
               System Online
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
