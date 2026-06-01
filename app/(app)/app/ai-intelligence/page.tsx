"use client";

import { useState } from "react";
import { 
  BrainCircuit, Sparkles, Mic, FileText, Search, 
  MessageSquare, Wand2, Zap, Shield, Cpu, 
  LineChart, Activity, Microscope, Stethoscope,
  Copy, Play, Save, Settings2, Languages, Headphones,
  ArrowUpRight
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function AIIntelligenceHub() {
  const [activeTool, setActiveTool] = useState("Diagnosis");

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
           <div className="flex items-center gap-2 mb-1">
              <div className="px-2 py-0.5 bg-teal-500/10 text-teal-600 dark:text-teal-400 text-[9px] font-black uppercase tracking-widest rounded-full flex items-center gap-1.5 border border-teal-500/20">
                 <Cpu className="w-3 h-3" /> Core AI Engine v4.2
              </div>
           </div>
           <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Clinical AI Intelligence</h1>
           <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium italic">Augmenting clinical precision with neural medical insights.</p>
        </div>
        
        <div className="flex items-center gap-3">
           <button className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-300 hover:bg-slate-50 transition-all shadow-sm">
              <Settings2 className="w-4 h-4" /> AI Models
           </button>
           <button className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:scale-105 transition-all active:scale-95">
              <Sparkles className="w-4 h-4" /> New Analysis
           </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-12 gap-8">
         {/* LEFT: Tool Selection (3 cols) */}
         <div className="lg:col-span-3 space-y-3">
            {[
              { id: "Diagnosis", name: "Diagnosis Helper", icon: Stethoscope, desc: "Symptom analysis" },
              { id: "Scribe", name: "Voice Scribe", icon: Mic, desc: "Audio to EMR" },
              { id: "OCR", name: "Document OCR", icon: FileText, desc: "Scan lab results" },
              { id: "Summary", name: "Smart Summary", icon: Wand2, desc: "Auto-charting" },
              { id: "Predictive", name: "Predictive Health", icon: LineChart, desc: "Risk assessment" },
            ].map(tool => (
              <button
                key={tool.id}
                onClick={() => setActiveTool(tool.id)}
                className={cn(
                  "w-full p-4 rounded-2xl border transition-all flex items-start gap-4 text-left group",
                  activeTool === tool.id 
                    ? "bg-teal-600 border-teal-500 text-white shadow-xl shadow-teal-500/20" 
                    : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-teal-500/50"
                )}
              >
                 <div className={cn(
                   "w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm",
                   activeTool === tool.id ? "bg-white/20" : "bg-slate-50 dark:bg-slate-800"
                 )}>
                    <tool.icon className="w-5 h-5" />
                 </div>
                 <div>
                    <p className="text-sm font-black">{tool.name}</p>
                    <p className={cn("text-[10px] font-bold uppercase tracking-widest mt-0.5 opacity-60")}>{tool.desc}</p>
                 </div>
              </button>
            ))}
         </div>

         {/* CENTER: Tool Workspace (6 cols) */}
         <div className="lg:col-span-6 space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden min-h-[600px] flex flex-col">
               <div className="p-8 border-b border-slate-50 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                     <Zap className="w-5 h-5 text-teal-500" />
                     <h3 className="text-xl font-black text-slate-900 dark:text-white">{activeTool} Workspace</h3>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[9px] font-black uppercase tracking-widest">
                     <Shield className="w-3 h-3" /> HIPAA Compliant
                  </div>
               </div>

               <div className="flex-1 p-8">
                  {activeTool === "Diagnosis" && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                       <div className="space-y-4">
                          <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Describe Symptoms</label>
                          <textarea 
                             placeholder="E.g. Patient reports sharp chest pain, radiating to left arm..." 
                             className="w-full h-32 p-6 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-[2rem] text-sm font-medium outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 transition-all"
                          />
                       </div>
                       <button className="w-full py-4 bg-teal-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-teal-700 transition-all flex items-center justify-center gap-2">
                          <BrainCircuit className="w-4 h-4" /> Run Differential Diagnosis
                       </button>

                       <div className="pt-8 border-t border-slate-100 dark:border-slate-800 space-y-6">
                          <h4 className="text-xs font-black uppercase text-slate-400 tracking-widest">AI Suggestions</h4>
                          <div className="grid gap-4">
                             {[
                               { name: "Myocardial Infarction", prob: "72%", risk: "High", action: "Immediate ECG" },
                               { name: "Stable Angina", prob: "18%", risk: "Moderate", action: "Stress Test" }
                             ].map((s, i) => (
                               <div key={i} className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center justify-between group">
                                  <div>
                                     <p className="text-sm font-black text-slate-900 dark:text-white">{s.name}</p>
                                     <div className="flex items-center gap-3 mt-1">
                                        <span className="text-[10px] font-black text-teal-600 uppercase">Probability: {s.prob}</span>
                                        <span className="w-1 h-1 rounded-full bg-slate-300" />
                                        <span className={cn("text-[10px] font-black uppercase", s.risk === "High" ? "text-rose-500" : "text-amber-500")}>Risk: {s.risk}</span>
                                     </div>
                                  </div>
                                  <button className="px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-teal-500 hover:text-white hover:border-teal-500 transition-all">
                                     Order {s.action}
                                  </button>
                               </div>
                             ))}
                          </div>
                       </div>
                    </div>
                  )}

                  {activeTool === "Scribe" && (
                    <div className="flex flex-col items-center justify-center h-full space-y-8 animate-in fade-in">
                       <div className="w-24 h-24 rounded-full bg-teal-500/10 flex items-center justify-center relative">
                          <Mic className="w-10 h-10 text-teal-600" />
                          <div className="absolute inset-0 rounded-full border-2 border-teal-500/30 animate-ping" />
                       </div>
                       <div className="text-center space-y-2">
                          <h4 className="text-xl font-black">AI Scribe is Listening...</h4>
                          <p className="text-sm text-slate-500 font-medium">Speak naturally with the patient. Hopify will transcribe and chart.</p>
                       </div>
                       <div className="w-full p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 italic text-slate-400 text-sm text-center">
                          &quot;Patient has been experiencing nocturnal cough for 2 weeks...&quot;
                       </div>
                    </div>
                  )}
               </div>

               <div className="p-6 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                     <Headphones className="w-4 h-4 text-slate-400" />
                     <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Real-time processing active</span>
                  </div>
                  <button className="flex items-center gap-2 text-[10px] font-black text-teal-600 uppercase tracking-widest hover:underline">
                     Export to EMR <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
               </div>
            </div>
         </div>

         {/* RIGHT: Intelligence Logs & Insights (3 cols) */}
         <div className="lg:col-span-3 space-y-8">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
               <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Recent Insights</h3>
               <div className="space-y-4">
                  {[
                    { title: "Anomaly Detected", msg: "PAT-002 Lab results show unusual ALT levels", type: "Alert", icon: Activity, color: "text-rose-600 bg-rose-50" },
                    { title: "Pattern Analysis", msg: "12% increase in flu-like symptoms this week", type: "Trend", icon: LineChart, color: "text-indigo-600 bg-indigo-50" },
                    { title: "Smart Scheduling", msg: "AI recommends rescheduling 3 follow-ups", type: "System", icon: Wand2, color: "text-teal-600 bg-teal-50" },
                  ].map((insight, i) => (
                    <div key={i} className="space-y-2 group cursor-pointer">
                       <div className="flex items-center gap-2">
                          <div className={cn("w-6 h-6 rounded-lg flex items-center justify-center", insight.color)}>
                             <insight.icon className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-[10px] font-black uppercase tracking-widest opacity-60">{insight.type}</span>
                       </div>
                       <p className="text-[11px] font-bold text-slate-900 dark:text-white group-hover:text-teal-600 transition-colors">{insight.title}</p>
                       <p className="text-[10px] text-slate-500 leading-relaxed">{insight.msg}</p>
                    </div>
                  ))}
               </div>
            </div>

            <div className="bg-gradient-to-br from-slate-900 to-teal-900 p-8 rounded-[2.5rem] text-white shadow-xl space-y-6">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                     <Microscope className="w-5 h-5 text-teal-400" />
                  </div>
                  <div>
                     <p className="text-[10px] font-black uppercase tracking-widest opacity-50">Global Health Intelligence</p>
                     <h4 className="text-sm font-black">Hopify Network</h4>
                  </div>
               </div>
               <p className="text-xs text-white/70 font-medium leading-relaxed">Your AI is part of a secure, federated learning network. Benefits from global medical knowledge while keeping your data 100% private.</p>
               <button className="w-full py-3 bg-teal-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-teal-600 transition-all">Learn More</button>
            </div>
         </div>
      </div>
    </div>
  );
}
