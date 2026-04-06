import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "safe" | "elevated" | "high" | "critical" | "outline";
}

const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => {
    
    const baseStyles = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold tracking-wider uppercase transition-colors";
    
    const variants = {
      default: "bg-slate-800 text-slate-100 hover:bg-slate-700",
      safe: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]",
      elevated: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
      high: "bg-orange-500/10 text-orange-400 border border-orange-500/20",
      critical: "bg-red-500/10 text-red-400 border border-red-500/20 animate-glow-danger",
      outline: "text-slate-100 border border-slate-700",
    };

    return (
      <div
        ref={ref}
        className={cn(baseStyles, variants[variant], className)}
        {...props}
      />
    );
  }
);
Badge.displayName = "Badge";

export { Badge };
