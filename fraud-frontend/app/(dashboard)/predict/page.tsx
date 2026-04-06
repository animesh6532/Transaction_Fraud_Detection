"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, ArrowRight, Shield, Crosshair, Network, Cpu, Download } from "lucide-react";
import toast from "react-hot-toast";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import RiskMeter, { getRiskCategory } from "@/components/fraud-prediction/RiskMeter";
import AIInsightsPanel from "@/components/fraud-prediction/AIInsightsPanel";

type PredictionResponse = {
  fraud: boolean;
  prediction: number;
  score: number;
};

export default function PredictPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResponse | null>(null);
  const [lastPayload, setLastPayload] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    amt: "150.00",
    city_pop: "500000",
    trans_hour: "14",
    trans_day_of_week: "3",
    time_diff: "240.5",
    distance_km: "15.2",
    category: "grocery_pos",
    gender: "M",
    state: "NY",
  });

  const categories = [
    "grocery_pos", "kids_pets", "shopping_net", "entertainment", 
    "food_dining", "personal_care", "shopping_pos", "gas_transport",
    "home", "grocery_net", "misc_net", "health_fitness", "misc_pos", "travel"
  ];
  
  const states = ["NY", "CA", "TX", "FL", "IL", "PA", "OH", "GA", "NC", "MI"];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const saveToHistory = (data: any, res: PredictionResponse, riskObj: any) => {
    const historyUrl = 'transaction_history';
    let history: any[] = [];
    try {
      const stored = localStorage.getItem(historyUrl);
      if (stored) history = JSON.parse(stored);
    } catch (e) {
      console.error("Could not parse history", e);
    }

    const newRecord = {
      id: Date.now().toString().substring(5, 13),
      timestamp: new Date().toISOString(),
      amount: Number(data.amt),
      category: data.category,
      isFraud: res.fraud,
      riskLevel: riskObj.label,
      riskVariant: riskObj.variant,
      riskScore: res.score,
    };

    history.unshift(newRecord);
    localStorage.setItem(historyUrl, JSON.stringify(history.slice(0, 50)));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setError(null);

    const payload = {
      amt: Number(formData.amt),
      city_pop: Number(formData.city_pop),
      trans_hour: Number(formData.trans_hour),
      trans_day_of_week: Number(formData.trans_day_of_week),
      time_diff: Number(formData.time_diff),
      distance_km: Number(formData.distance_km),
      category: formData.category,
      gender: formData.gender,
      state: formData.state,
    };

    setLastPayload(payload);

    try {
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error(`Server status: ${response.status}`);

      const data: PredictionResponse = await response.json();
      
      // Transform score into realistic percentage if it comes 0-1
      const normalizedScore = data.score <= 1.0 ? data.score * 100 : data.score;
      data.score = parseFloat(normalizedScore.toFixed(1));

      // Optional artificial delay to show cool animation
      await new Promise(resolve => setTimeout(resolve, 1800));

      setResult(data);
      const riskInfo = getRiskCategory(data.score);
      saveToHistory(payload, data, riskInfo);

      if (riskInfo.variant === "critical" || riskInfo.variant === "high") {
         toast.error(`Intercepted: ${riskInfo.label}`, { icon: '🚨' });
      } else {
         toast.success("Transaction Cleared.", { icon: '✅' });
      }

    } catch (error: any) {
      console.error("Prediction API Error:", error);
      setError(error.message || "Failed to reach backend service.");
      toast.error("Telemetry failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto h-full flex flex-col">
      <div className="mb-6 flex items-center gap-3">
        <div className="p-2.5 bg-blue-500/10 border border-blue-500/20 rounded-lg shadow-[0_0_15px_rgba(59,130,246,0.15)]">
           <TargetIcon className="w-6 h-6 text-blue-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-100 to-slate-400">Risk Assessment Console</h1>
          <p className="text-sm text-slate-400 font-medium">Configure transaction vectors and run ML evaluation protocol.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-0">
        
        {/* INPUT FORM PANEL */}
        <Card className="lg:col-span-7 flex flex-col pt-2 shadow-2xl relative overflow-hidden print:hidden">
          {/* Subtle gradient corner glow */}
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 blur-[100px] rounded-full point-events-none" />
          
          <CardHeader className="pb-4 relative z-10">
            <CardTitle className="flex items-center gap-2"><Network className="w-5 h-5 text-indigo-400" /> Vector Configuration</CardTitle>
            <CardDescription>Input precise transaction signals for deep inspection.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto relative z-10 custom-scrollbar pr-2 mb-4">
            <form id="predict-form" onSubmit={handleSubmit} className="space-y-8">
              
              {/* Context Block 1 */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold tracking-wide text-slate-200 border-b border-slate-800 pb-2 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-emerald-400" /> Financial & Context Setup
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="fintech-label">Amount (₹ INR)</label>
                    <input required type="number" step="0.01" name="amt" value={formData.amt} onChange={handleChange} className="fintech-input text-lg" />
                  </div>
                  <div>
                    <label className="fintech-label">Entity Category</label>
                    <select required name="category" value={formData.category} onChange={handleChange} className="fintech-input h-12">
                      {categories.map(c => <option key={c} value={c}>{c.replace('_', ' ').toUpperCase()}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="fintech-label">Hour of Day (0-23)</label>
                    <input required type="number" min="0" max="23" name="trans_hour" value={formData.trans_hour} onChange={handleChange} className="fintech-input" />
                  </div>
                  <div>
                    <label className="fintech-label">Day of Week</label>
                    <select required name="trans_day_of_week" value={formData.trans_day_of_week} onChange={handleChange} className="fintech-input h-[46px]">
                      <option value="0">Sunday</option><option value="1">Monday</option><option value="2">Tuesday</option>
                      <option value="3">Wednesday</option><option value="4">Thursday</option><option value="5">Friday</option>
                      <option value="6">Saturday</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Context Block 2 */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold tracking-wide text-slate-200 border-b border-slate-800 pb-2 flex items-center gap-2">
                   <TargetIcon className="w-4 h-4 text-purple-400" /> Behavioral & Location Metadeta
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="fintech-label">Secs Since Last Tx</label>
                    <input required type="number" step="0.1" name="time_diff" value={formData.time_diff} onChange={handleChange} className="fintech-input" />
                  </div>
                  <div>
                    <label className="fintech-label">Distance Delta (km)</label>
                    <input required type="number" step="0.1" name="distance_km" value={formData.distance_km} onChange={handleChange} className="fintech-input" />
                  </div>
                  <div>
                    <label className="fintech-label">City Population</label>
                    <input required type="number" name="city_pop" value={formData.city_pop} onChange={handleChange} className="fintech-input" />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="fintech-label">State</label>
                      <select name="state" value={formData.state} onChange={handleChange} className="fintech-input px-2 h-[46px]">
                        {states.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="fintech-label">Gender</label>
                      <select name="gender" value={formData.gender} onChange={handleChange} className="fintech-input px-2 h-[46px]">
                        <option value="M">M</option><option value="F">F</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

            </form>
          </CardContent>
          <div className="p-6 border-t border-slate-800/60 bg-slate-900/40 relative z-20">
             <button 
                form="predict-form"
                disabled={loading}
                type="submit" 
                className="w-full group relative flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold tracking-wide rounded-xl transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 bg-white/20 group-hover:translate-x-full transition-transform duration-700 ease-in-out skew-x-12 -translate-x-[200%]" />
                {loading ? (
                  <div className="flex items-center gap-2 relative z-10 w-full justify-center">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Neural Network Engaged...</span>
                    {/* Animated scanning bar overlay over button */}
                    <div className="absolute inset-x-0 h-[2px] bg-cyan-300 shadow-[0_0_8px_#67e8f9] animate-scan-line pointer-events-none" />
                  </div>
                ) : (
                  <div className="flex items-center gap-2 relative z-10">
                    <Cpu className="w-5 h-5" />
                    <span>Execute Global Risk Scan</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                )}
              </button>
          </div>
        </Card>

        {/* RESULTS PANEL */}
        <div className="lg:col-span-5 h-[700px] lg:h-auto print:col-span-12 print:h-auto print:block">
          <Card className="h-full border border-slate-800/60 bg-slate-900/60 flex flex-col relative overflow-hidden backdrop-blur-2xl print:bg-white print:text-black print:border-none print:shadow-none">
            {/* The scanning line across the panel if loading */}
            {loading && <div className="absolute inset-x-0 h-[2px] bg-indigo-500 shadow-[0_0_10px_#818cf8] animate-scan-line pointer-events-none z-50" />}

            <div className="p-1 border-b border-slate-800/60 bg-slate-950 flex justify-center text-[10px] tracking-widest text-slate-600 uppercase font-mono print:bg-transparent print:border-b-2 print:border-slate-200 print:text-slate-500">
              Fraud Detect - Official Intelligence Output Report
            </div>

            <div className="flex-1 flex flex-col items-center justify-center p-8 relative z-10">
              <AnimatePresence mode="wait">
                
                {/* IDLE STATE */}
                {!loading && !result && !error && (
                  <motion.div 
                    key="idle"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col items-center text-center max-w-sm"
                  >
                    <div className="w-24 h-24 rounded-full border border-slate-700 bg-slate-800/30 flex items-center justify-center mb-6 shadow-inner relative overflow-hidden group">
                       <Crosshair className="w-10 h-10 text-slate-500 transition-colors group-hover:text-blue-400" />
                       <div className="absolute inset-0 bg-blue-500/10 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-300 mb-2">Awaiting Parameters</h3>
                    <p className="text-sm text-slate-500">Inject transaction vectors into the neural core to initiate automated forensic analysis.</p>
                  </motion.div>
                )}

                {/* COMPUTING STATE */}
                {loading && (
                  <motion.div 
                    key="loading"
                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1 }}
                    className="flex flex-col items-center w-full"
                  >
                    <div className="relative w-36 h-36 mx-auto mb-8">
                      <div className="absolute inset-0 rounded-full border border-indigo-500/30 animate-[spin_4s_linear_infinite]" />
                      <div className="absolute inset-2 rounded-full border-t border-l border-blue-400 animate-[spin_1.5s_linear_infinite]" />
                      <div className="absolute inset-4 rounded-full border-r border-b border-purple-400 animate-[spin_2.5s_linear_infinite] direction-reverse" />
                      <div className="absolute inset-8 rounded-full border border-teal-500/40 animate-[ping_2s_ease-out_infinite]" />
                      <Cpu className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 text-indigo-400 animate-pulse drop-shadow-[0_0_10px_rgba(129,140,248,0.8)]" />
                    </div>
                    
                    <h3 className="text-lg font-mono tracking-widest text-indigo-300 font-bold mb-2">COMPUTING</h3>
                    <div className="w-full max-w-[200px] h-1 bg-slate-800 rounded-full overflow-hidden">
                       <div className="h-full bg-indigo-500 animate-[pulse_1s_ease-in-out_infinite] w-2/3 mx-auto" />
                    </div>
                    <div className="mt-4 flex flex-col gap-1 items-center font-mono text-[10px] text-slate-500 opacity-60">
                      <span>&gt; resolving topological maps...</span>
                      <span>&gt; comparing baseline entropy...</span>
                      <span>&gt; synthesizing fraud vectors...</span>
                    </div>
                  </motion.div>
                )}

                {/* RESULT STATE */}
                {result && !loading && !error && (
                  <motion.div 
                    key="result"
                    initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    className="w-full flex flex-col items-center"
                  >
                    
                    <RiskMeter score={result.score} />

                    <div className="mt-4 text-center">
                       {result.fraud ? (
                         <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-bold uppercase tracking-widest border border-red-500/30 mb-2">
                           <Shield className="w-3.5 h-3.5" /> Action Required: Block
                         </span>
                       ) : (
                         <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest border border-emerald-500/30 mb-2">
                           <Shield className="w-3.5 h-3.5" /> Verified Pass
                         </span>
                       )}
                       <p className="text-sm text-slate-400 max-w-[280px]">
                         {result.fraud ? "System recommends immediate termination of transaction sequence." : "All parameters fall within acceptable behavioral limits."}
                       </p>
                    </div>

                    <div className="w-full mt-2">
                       <AIInsightsPanel score={result.score} data={lastPayload} />
                    </div>

                    <button 
                       onClick={() => window.print()}
                       className="mt-8 flex items-center justify-center gap-2 px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium rounded-lg border border-slate-700 shadow-md transition-all print:hidden w-full max-w-[280px]"
                    >
                       <Download className="w-4 h-4" /> Export Report (PDF)
                    </button>

                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
}

const TargetIcon = Crosshair;
