"use client";

import Link from "next/link";
import { ShieldCheck, ArrowRight, Zap, Target, Lock, Database } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#030712] overflow-hidden flex flex-col relative text-slate-200">
      
      {/* 3D Background Gradients & Orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[60%] rounded-full bg-indigo-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-[20%] right-[20%] w-[20%] h-[20%] rounded-full bg-teal-500/10 blur-[80px] pointer-events-none" />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10 pointer-events-none" />

      {/* Navigation */}
      <header className="relative z-10 container mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.5)]">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">Fraud Detect</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
           <a href="#features" className="hover:text-white transition-colors">Platform Intelligence</a>
           <a href="#workflow" className="hover:text-white transition-colors">Neural Workflow</a>
           <a href="#" className="hover:text-white transition-colors">Security</a>
        </div>
        <div>
          <Link href="/dashboard" className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white text-sm font-medium rounded-lg transition-all shadow-lg hover:shadow-xl">
            Enter Console
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 pt-20 pb-32">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-widest uppercase mb-8 shadow-[0_0_20px_rgba(59,130,246,0.15)] backdrop-blur-md">
           <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
           System Version 2.0 Live
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 max-w-4xl leading-tight">
          Enterprise-Grade 
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-400">
            Transaction Fraud Intelligence
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed">
          Leverage deep neural networks to intercept high-risk financial anomalies in real-time. Secure your ecosystem with our deterministic AI processing pipeline.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center max-w-md">
          <Link 
            href="/dashboard"
            className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl transition-all shadow-[0_0_30px_rgba(59,130,246,0.4)] hover:shadow-[0_0_40px_rgba(59,130,246,0.6)] group"
          >
            Launch Dashboard <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link 
            href="/predict"
            className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-slate-800/80 hover:bg-slate-800 text-white border border-slate-700 border-t-slate-600 font-bold rounded-xl transition-all backdrop-blur-md"
          >
            Analyze Transaction
          </Link>
        </div>
        
        {/* Floating Dashboard Preview (Stylized) */}
        <div className="mt-20 relative w-full max-w-5xl">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#030712] z-20 pointer-events-none" />
            <div className="relative rounded-xl border border-slate-700/50 bg-slate-900/50 p-2 shadow-2xl backdrop-blur-xl overflow-hidden transform perspective-[1000px] rotateX-[10deg] scale-105 border-b-0 rounded-b-none">
              <div className="flex gap-2 mb-4 px-2 pt-2">
                 <div className="w-3 h-3 rounded-full bg-red-500/80" />
                 <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                 <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <div className="h-[400px] w-full bg-slate-950/80 rounded-lg flex items-center justify-center">
                 <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop')] bg-cover opacity-10 mix-blend-overlay" />
                 {/* Decorative elements representing AI dashboard inside preview */}
                 <div className="w-3/4 h-64 border border-blue-500/20 bg-blue-900/10 rounded-2xl flex flex-col items-center justify-center relative">
                    <div className="absolute flex h-full w-full justify-center items-center pointer-events-none">
                       <div className="w-32 h-32 border border-slate-700 rounded-full animate-[ping_3s_infinite] opacity-50"></div>
                       <div className="w-48 h-48 border border-indigo-500/30 rounded-full animate-[ping_4s_infinite] opacity-20 absolute"></div>
                    </div>
                    <Database className="w-10 h-10 text-blue-500 mb-4" />
                    <p className="text-blue-200 font-mono text-sm">System Connected. Monitoring Traffic.</p>
                 </div>
              </div>
            </div>
        </div>
      </main>

      {/* Feature Section */}
      <section id="features" className="relative z-10 py-24 bg-slate-950/50 border-y border-slate-800/80">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Core Intelligence Modules</h2>
            <p className="text-slate-400">Built for precision routing and zero-latency threat interception.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Box 1 */}
            <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 hover:border-blue-500/50 transition-colors group">
               <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform border border-blue-500/20">
                  <Zap className="w-6 h-6 text-blue-400" />
               </div>
               <h3 className="text-xl font-bold text-slate-200 mb-3">Live Alert Feed</h3>
               <p className="text-slate-400 leading-relaxed text-sm">Monitor high-risk transactions globally as they flow through the neural network pipeline in real-time.</p>
            </div>
            {/* Box 2 */}
            <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 transition-colors group">
               <div className="w-12 h-12 rounded-lg bg-indigo-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform border border-indigo-500/20">
                  <Target className="w-6 h-6 text-indigo-400" />
               </div>
               <h3 className="text-xl font-bold text-slate-200 mb-3">Explainable AI Matrix</h3>
               <p className="text-slate-400 leading-relaxed text-sm">Never guess why a transaction was flagged. XAI engine constructs human-readable forensic insights instantly.</p>
            </div>
            {/* Box 3 */}
            <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 transition-colors group">
               <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform border border-emerald-500/20">
                  <Lock className="w-6 h-6 text-emerald-400" />
               </div>
               <h3 className="text-xl font-bold text-slate-200 mb-3">Exportable Analytics</h3>
               <p className="text-slate-400 leading-relaxed text-sm">Generates verifiable PDF Forensic Reports and detailed CSV ledgers of intercepted vectors for compliance.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 text-center text-slate-500 text-sm relative z-10">
        <p>&copy; {new Date().getFullYear()} Fraud Detect Intelligence Platform. Enterprise Edition.</p>
      </footer>
    </div>
  );
}
