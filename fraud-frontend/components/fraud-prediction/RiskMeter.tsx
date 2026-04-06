"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function getRiskCategory(score: number) {
  if (score <= 20) return { label: "Verified Safe", variant: "safe", color: "text-emerald-400", hex: "#10b981", shadow: "drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]" };
  if (score <= 65) return { label: "Elevated Risk", variant: "elevated", color: "text-amber-400", hex: "#f59e0b", shadow: "drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]" };
  if (score <= 89) return { label: "High Risk", variant: "high", color: "text-orange-400", hex: "#f97316", shadow: "drop-shadow-[0_0_15px_rgba(249,115,22,0.5)]" };
  return { label: "Critical Risk", variant: "critical", color: "text-red-500", hex: "#ef4444", shadow: "drop-shadow-[0_0_15px_rgba(239,68,68,0.6)]" };
}

export default function RiskMeter({ score }: { score: number }) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const risk = getRiskCategory(score);

  useEffect(() => {
    // Animate stroke up to score
    const timeout = setTimeout(() => {
      setAnimatedScore(score);
    }, 100);
    return () => clearTimeout(timeout);
  }, [score]);

  const radius = 65;
  const circumference = 2 * Math.PI * radius;
  // Dashboard gauge (half-circle). SVG viewbox allows arc.
  // Actually full circle looks more cyber-fintech. Let's do a glowing full circle with a gap at the bottom.
  
  const arcLength = circumference * 0.75; // 270 degree arc
  const strokeDashoffset = arcLength - (animatedScore / 100) * arcLength + (circumference - arcLength);

  return (
    <div className="relative flex flex-col items-center justify-center">
      <svg width="200" height="200" viewBox="0 0 160 160" className="-rotate-[135deg]">
        <circle
          cx="80"
          cy="80"
          r={radius}
          className="risk-meter-bg"
          strokeDasharray={`${arcLength} ${circumference - arcLength}`}
          strokeDashoffset="0"
        />
        <circle
          cx="80"
          cy="80"
          r={radius}
          className="risk-meter-fill"
          stroke={risk.hex}
          strokeDasharray={`${arcLength} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          style={{ transitionDuration: '1.5s', transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}
        />
      </svg>
      {/* Absolute center text */}
      <div className={cn("absolute inset-0 flex flex-col items-center justify-center pt-2", risk.shadow)}>
        <span className="text-4xl font-mono relative tracking-tighter">
          {animatedScore.toFixed(0)}<span className="text-xl ml-0.5 text-slate-500">%</span>
        </span>
        <span className={cn("text-xs font-bold uppercase tracking-wider mt-1", risk.color)}>
          {risk.label}
        </span>
      </div>
    </div>
  );
}
