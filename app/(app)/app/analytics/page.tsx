"use client";

import { 
  BarChart3, TrendingUp, Users, Activity, 
  Calendar, ArrowUpRight, ArrowDownRight,
  Filter, Download, BrainCircuit, Heart,
  PieChart, LineChart, Target
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("Last 30 Days");

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Clinical Analytics</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Deep insights into clinic performance, patient growth and AI efficiency.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-1 shadow-sm">
            {["Last 7 Days", "Last 30 Days", "Year to Date"].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={cn(
                  "px-4 py-2 rounded-lg text-xs font-bold transition-all",
                  timeRange === range ? "bg-slate-100 dark:bg-slate-800 text-teal-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                )}
              >
                {range}
              </button>
            ))}
          </div>
          <button className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 hover:scale-[1.02] transition-all shadow-lg active:scale-95">
            <Download className="w-4 h-4" />
            Full Report
          </button>
        </div>
      </div>

      {/* Top Level Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Patients", value: "2,845", trend: "+12.5%", icon: Users, color: "teal" },
          { label: "Revenue Growth", value: "$42.8k", trend: "+18.2%", icon: TrendingUp, color: "indigo" },
          { label: "AI Accuracy", value: "98.4%", trend: "+0.5%", icon: BrainCircuit, color: "violet" },
          { label: "Satisfaction", value: "4.9/5", trend: "+2.1%", icon: Heart, color: "rose" }
        ].map((stat, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 group hover:border-teal-500/50 transition-all">
             <div className="flex justify-between items-start">
               <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", 
                 stat.color === "teal" ? "bg-teal-50 dark:bg-teal-500/10 text-teal-600" :
                 stat.color === "indigo" ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600" :
                 stat.color === "violet" ? "bg-violet-50 dark:bg-violet-500/10 text-violet-600" :
                 "bg-rose-50 dark:bg-rose-500/10 text-rose-600"
               )}>
                 <stat.icon className="w-5 h-5" />
               </div>
               <span className="text-xs font-black text-emerald-600 flex items-center gap-1">
                 <ArrowUpRight className="w-3 h-3" />
                 {stat.trend}
               </span>
             </div>
             <div>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
               <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">{stat.value}</h3>
             </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Patient Volume Line Chart */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-black text-lg text-slate-900 dark:text-white">Patient Volume</h3>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Monthly Growth Trend</p>
            </div>
            <LineChart className="w-5 h-5 text-teal-500" />
          </div>
          <div className="h-64 flex items-end justify-between gap-2 px-2">
            {[45, 62, 58, 85, 72, 94, 110, 88, 120, 105, 135, 150].map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-3 group">
                <div 
                  className="w-full bg-gradient-to-t from-teal-500/20 to-teal-500 rounded-t-lg transition-all group-hover:to-teal-400 group-hover:scale-x-110" 
                  style={{ height: `${(val / 150) * 100}%` }}
                >
                  <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-black px-2 py-1 rounded transition-opacity">
                    {val}
                  </div>
                </div>
                <span className="text-[8px] font-black text-slate-400 uppercase tracking-tighter">
                  {["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"][i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* AI Performance Bar Chart */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-black text-lg text-slate-900 dark:text-white">AI Efficiency</h3>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Accuracy vs. Time Saved</p>
            </div>
            <BrainCircuit className="w-5 h-5 text-indigo-500" />
          </div>
          <div className="space-y-6">
            {[
              { label: "Prescription Accuracy", value: 98, color: "bg-indigo-500" },
              { label: "Diagnostic Confidence", value: 94, color: "bg-teal-500" },
              { label: "Patient Triage Flow", value: 88, color: "bg-violet-500" },
              { label: "Automated Follow-ups", value: 76, color: "bg-cyan-500" }
            ].map((bar, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                  <span className="text-slate-500">{bar.label}</span>
                  <span className="text-slate-900 dark:text-white">{bar.value}%</span>
                </div>
                <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className={cn("h-full rounded-full transition-all duration-1000", bar.color)} style={{ width: `${bar.value}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-emerald-500" />
              <span className="text-xs font-bold text-slate-500">Exceeding quarterly targets</span>
            </div>
            <span className="text-[10px] font-black text-teal-600 bg-teal-50 dark:bg-teal-500/10 px-2 py-1 rounded-lg uppercase tracking-widest">Top Perfomance</span>
          </div>
        </div>
      </div>

      {/* Bottom Row: Distribution & Efficiency */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Service Distribution */}
        <div className="lg:col-span-1 bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <h3 className="font-black text-lg text-slate-900 dark:text-white">Service Popularity</h3>
          <div className="relative h-64 flex items-center justify-center">
             <div className="w-48 h-48 rounded-full border-[12px] border-slate-100 dark:border-slate-800 relative">
               <div className="absolute inset-0 rounded-full border-[12px] border-teal-500 border-t-transparent border-r-transparent -rotate-45" />
               <div className="absolute inset-0 rounded-full border-[12px] border-indigo-500 border-b-transparent border-l-transparent rotate-12" />
               <div className="absolute inset-0 flex flex-col items-center justify-center">
                 <span className="text-2xl font-black text-slate-900 dark:text-white">85%</span>
                 <span className="text-[10px] font-bold text-slate-400 uppercase">Consultation</span>
               </div>
             </div>
          </div>
          <div className="space-y-3">
             <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-teal-500" />
                  <span className="font-bold text-slate-600 dark:text-slate-400">Cardiology</span>
                </div>
                <span className="font-black text-slate-900 dark:text-white">45%</span>
             </div>
             <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-indigo-500" />
                  <span className="font-bold text-slate-600 dark:text-slate-400">Pediatrics</span>
                </div>
                <span className="font-black text-slate-900 dark:text-white">30%</span>
             </div>
             <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-violet-500" />
                  <span className="font-bold text-slate-600 dark:text-slate-400">Surgery</span>
                </div>
                <span className="font-black text-slate-900 dark:text-white">15%</span>
             </div>
          </div>
        </div>

        {/* Operational Efficiency Table */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
           <div className="p-8 border-b border-slate-50 dark:border-slate-800 flex items-center justify-between">
              <h3 className="font-black text-lg text-slate-900 dark:text-white">Operational Efficiency</h3>
              <button className="text-xs font-bold text-teal-600 hover:underline">Full Audit</button>
           </div>
           <table className="w-full text-left">
              <thead className="bg-slate-50/50 dark:bg-slate-800/50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <tr>
                  <th className="px-8 py-4">Metric</th>
                  <th className="px-8 py-4 text-center">Score</th>
                  <th className="px-8 py-4 text-right">Trend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm font-bold">
                {[
                  { m: "Bed Occupancy Rate", s: "84%", t: "+4.2%", up: true },
                  { m: "Avg. Wait Time", s: "12 min", t: "-2 min", up: false },
                  { m: "Consultation Duration", s: "24 min", t: "+1 min", up: true },
                  { m: "Emergency Response", s: "4.2 sec", t: "-0.5 sec", up: false }
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-8 py-6 text-slate-700 dark:text-slate-300">{row.m}</td>
                    <td className="px-8 py-6 text-center text-slate-900 dark:text-white font-black">{row.s}</td>
                    <td className="px-8 py-6 text-right">
                       <span className={cn(
                         "inline-flex items-center gap-1 text-[10px] px-2 py-1 rounded-lg",
                         row.up ? "text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10" : "text-rose-600 bg-rose-50 dark:bg-rose-500/10"
                       )}>
                         {row.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                         {row.t}
                       </span>
                    </td>
                  </tr>
                ))}
              </tbody>
           </table>
        </div>
      </div>
    </div>
  );
}
