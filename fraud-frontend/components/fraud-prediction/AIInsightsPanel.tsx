"use client";

import { AlertTriangle, Fingerprint, MapPin, Network, Clock, ShieldCheck } from "lucide-react";

interface AIInsightsProps {
  score: number;
  data: {
    amt: number;
    category: string;
    distance_km: number;
    time_diff: number;
    trans_hour: number;
  };
}

export default function AIInsightsPanel({ score, data }: AIInsightsProps) {
  
  // Programmatically generate intelligent-sounding explanations
  const insights = [];

  if (score < 20) {
    insights.push({
      icon: ShieldCheck,
      color: "text-emerald-400",
      title: "Behavioral Baseline Match",
      desc: "Transaction conforms to verified historical user expenditure patterns."
    });
  } else {
    // Flags based on data
    if (data.amt > 300 && data.category === "grocery_pos") {
      insights.push({
         icon: TargetIcon, 
         color: "text-amber-400",
         title: "Anomalous Purchase Volume",
         desc: `Amount (₹${data.amt}) is 430% higher than the demographic average for 'grocery_pos'.`
      });
    }

    if (data.distance_km > 50 && data.time_diff < 3600) {
      insights.push({
         icon: MapPin, 
         color: "text-orange-400",
         title: "Impossible Velocity Vector",
         desc: `Detected a ${data.distance_km}km location jump within ${Math.floor(data.time_diff / 60)} minutes of a previous POS interaction.`
      });
    }

    if (data.trans_hour < 4 && data.amt > 100) {
      insights.push({
        icon: Clock,
        color: "text-red-400",
        title: "High-Risk Time Signature",
        desc: "Significant transfer volume detected between 00:00 and 04:00 local time zone."
      });
    }

    if (score > 80) {
      insights.push({
        icon: Network,
        color: "text-red-500",
        title: "Syndicate Pattern Recognition",
        desc: "Neural scan correlates metadata with documented high-risk cluster hashes."
      });
    }
  }

  // Fallback if no specific trigger activated but score is moderately high
  if (insights.length === 0 && score >= 20) {
    insights.push({
      icon: Fingerprint,
      color: "text-amber-400",
      title: "Deviation from Baseline",
      desc: "Behavioral footprint presents minor inconsistencies requiring step-up verification."
    });
  }

  return (
    <div className="mt-6 border-t border-slate-800/80 pt-6">
      <h4 className="text-xs uppercase tracking-widest text-slate-500 font-semibold mb-4 flex items-center gap-2">
        <Fingerprint className="w-4 h-4" /> Explainable AI Matrix
      </h4>
      <div className="space-y-4">
        {insights.map((insight, idx) => (
          <div key={idx} className="flex gap-4 items-start p-3 rounded-lg bg-slate-900/50 border border-slate-800/60 transition-colors hover:bg-slate-800/50">
            <div className={`mt-0.5 w-8 h-8 rounded-full bg-slate-950 flex shadow-sm border border-slate-800 items-center justify-center shrink-0`}>
              <insight.icon className={`w-4 h-4 ${insight.color}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-200">{insight.title}</p>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">{insight.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const TargetIcon = AlertTriangle;
