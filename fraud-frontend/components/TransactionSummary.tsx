"use client";

import { motion } from "framer-motion";
import { DollarSign, MapPin, Tag, Clock } from "lucide-react";

export default function TransactionSummary({ payload }: { payload: any }) {

  const details = [
    { label: "Amount", value: `$${Number(payload.amt).toFixed(2)}`, icon: DollarSign },
    { label: "Category", value: payload.category.replace('_', ' ').toUpperCase(), icon: Tag },
    { label: "Location", value: `${payload.state} (Pop: ${(Number(payload.city_pop) / 1000).toFixed(0)}k)`, icon: MapPin },
    { label: "Time", value: `${payload.trans_hour}:00 HR`, icon: Clock },
  ];

  return (
    <div className="bg-slate-900/40 rounded-2xl border border-slate-700/30 p-5 h-full">
      <h4 className="font-semibold text-slate-300 text-sm tracking-wide mb-4 uppercase">Snapshot</h4>
      
      <div className="grid grid-cols-2 gap-3">
        {details.map((detail, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 + 0.4 }}
            className="p-3 bg-slate-800/40 rounded-xl border border-slate-700/50 flex flex-col items-start gap-2"
          >
            <div className="w-8 h-8 rounded-lg bg-slate-700/50 flex items-center justify-center">
              <detail.icon className="w-4 h-4 text-cyan-400" />
            </div>
            <div>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">{detail.label}</p>
              <p className="text-sm font-bold text-slate-200 mt-0.5">{detail.value}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
