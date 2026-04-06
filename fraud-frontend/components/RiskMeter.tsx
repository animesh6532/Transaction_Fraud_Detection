"use client";

import { motion } from "framer-motion";

export default function RiskMeter({ score, risk }: { score: number, risk: string }) {
  const getRiskColor = () => {
    if (risk === "Critical") return "text-red-500";
    if (risk === "High") return "text-orange-500";
    if (risk === "Medium") return "text-yellow-500";
    return "text-emerald-500";
  };

  const getRiskBg = () => {
    if (risk === "Critical") return "bg-gradient-to-r from-orange-600 to-red-600";
    if (risk === "High") return "bg-gradient-to-r from-yellow-500 to-orange-500";
    if (risk === "Medium") return "bg-gradient-to-r from-emerald-500 to-yellow-500";
    return "bg-gradient-to-r from-teal-500 to-emerald-500";
  };

  const getShadow = () => {
    if (risk === "Critical" || risk === "High") return "0 0 20px rgba(239, 68, 68, 0.4)";
    if (risk === "Medium") return "0 0 20px rgba(245, 158, 11, 0.4)";
    return "0 0 20px rgba(16, 185, 129, 0.4)";
  };

  return (
    <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-700 relative overflow-hidden flex flex-col items-center justify-center h-full">
      <div className="absolute top-0 right-0 p-4">
        <span className={`text-[10px] uppercase font-bold tracking-widest px-2 py-1 rounded border border-slate-700 bg-slate-800 ${getRiskColor()}`}>
          {risk}
        </span>
      </div>
      
      <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-2 text-center mt-2">
        Risk Assessment Score
      </p>
      
      <div className="flex items-end justify-center gap-1 mb-6 relative">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-6xl font-mono font-bold glow-text ${getRiskColor()}`}
        >
          {score.toFixed(1)}
        </motion.span>
        <span className="text-slate-500 text-xl mb-1">%</span>
      </div>
      
      {/* Animated Gauge Bar */}
      <div className="w-full h-4 bg-slate-800 rounded-full overflow-hidden border border-slate-700 p-0.5">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1.5, ease: "easeOut", type: "spring" }}
          className={`h-full rounded-full ${getRiskBg()} relative`}
          style={{ boxShadow: getShadow() }}
        >
          <div className="absolute inset-0 bg-white/20 w-full h-full animate-[shimmer_2s_infinite]" style={{ transform: 'skewX(-20deg)' }}></div>
        </motion.div>
      </div>

      <div className="w-full flex justify-between text-[10px] text-slate-500 font-mono mt-2 uppercase">
        <span>0.0 (Safe)</span>
        <span>100.0 (Flag)</span>
      </div>
    </div>
  );
}
