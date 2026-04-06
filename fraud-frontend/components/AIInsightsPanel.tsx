"use client";

import { motion } from "framer-motion";
import { BrainCircuit, AlertOctagon, CheckCircle2 } from "lucide-react";

export default function AIInsightsPanel({ 
  score, 
  risk, 
  payload 
}: { 
  score: number, 
  risk: string, 
  payload: any 
}) {
  
  // Simulated Explainable AI Logic
  const getInsights = () => {
    let insights = [];
    const amt = Number(payload.amt);
    const hour = Number(payload.trans_hour);
    const timeDiff = Number(payload.time_diff);
    
    if (risk === "Critical" || risk === "High") {
      insights.push({
        type: "danger",
        title: "Model Confidence",
        text: `The gradient boosting model is ${(score).toFixed(1)}% confident this matches known fraud topologies.`
      });
      
      if (amt > 1000) {
         insights.push({
          type: "warning",
          title: "Amount Anomaly",
          text: `Transaction amount ($${amt.toLocaleString()}) deviates heavily from standard median values for this category.`
        });
      }
      
      if (hour < 5 || hour > 23) {
         insights.push({
          type: "warning",
          title: "Time Context",
          text: `Transaction attempted at ${hour}:00, falling perfectly into the historic graveyard shift fraud hour cluster.`
        });
      }

      if (timeDiff < 60) {
        insights.push({
          type: "warning",
          title: "Velocity",
          text: `Time delta since last transaction (${timeDiff}s) indicates automated script or machine gunning behavior.`
        });
      }
      
      if (insights.length === 1) {
         insights.push({
          type: "warning",
          title: "Pattern Match",
          text: `Feature interaction between demographics and location map closely to recent active fraud rings.`
        });
      }
    } else {
      insights.push({
        type: "safe",
        title: "Normal Baseline",
        text: `Transaction conforms to standard non-fraudulent behavioral baselines with ${(100 - score).toFixed(1)}% certainty.`
      });
      
      if (amt < 100) {
        insights.push({
          type: "safe",
          title: "Low Value",
          text: `Transaction amount is well within acceptable variance for standard retail.`
        });
      }
      
      insights.push({
        type: "safe",
        title: "Pattern Match",
        text: "Location and timing data vectors do not cluster with any active threat signatures."
      });
    }

    return insights;
  };

  const insights = getInsights();

  return (
    <div className="bg-slate-900/60 rounded-2xl border border-slate-700/50 h-full flex flex-col">
      <div className="p-4 border-b border-slate-700/50 flex items-center gap-2 bg-slate-800/30 rounded-t-2xl">
        <BrainCircuit className="w-5 h-5 text-purple-400" />
        <h4 className="font-semibold text-slate-200 text-sm tracking-wide">AI Reasoning Engine</h4>
      </div>
      
      <div className="p-5 flex-1 space-y-4">
        {insights.map((insight, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.15 + 0.3 }}
            className={`p-3 rounded-xl border ${
              insight.type === "danger" ? "bg-red-500/10 border-red-500/20" :
              insight.type === "warning" ? "bg-orange-500/10 border-orange-500/20" :
              "bg-emerald-500/10 border-emerald-500/20"
            }`}
          >
            <div className="flex gap-3">
              <div className="mt-0.5">
                {insight.type === "danger" || insight.type === "warning" ? (
                  <AlertOctagon className={`w-4 h-4 ${insight.type === "danger" ? "text-red-400" : "text-orange-400"}`} />
                ) : (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                )}
              </div>
              <div>
                <p className={`text-xs font-bold uppercase tracking-wider mb-1 ${
                  insight.type === "danger" ? "text-red-400" :
                  insight.type === "warning" ? "text-orange-400" :
                  "text-emerald-400"
                }`}>
                  {insight.title}
                </p>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {insight.text}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
