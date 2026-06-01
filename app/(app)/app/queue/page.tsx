"use client";

import { useState, useEffect } from "react";
import { 
  Users, Monitor, Clock, Play, 
  ArrowRight, CheckCircle2, UserPlus, 
  AlertCircle, Tv, Speaker, MoreVertical,
  Volume2, Settings2, Sparkles, Filter
} from "lucide-react";
import { cn } from "@/lib/utils";

const initialQueue = [
  { id: "A-102", patient: "Sarah Miller", doctor: "Dr. Chen", dept: "Pediatrics", waitTime: "12 min", status: "Waiting", priority: "Normal" },
  { id: "B-205", patient: "Md Tajuddin", doctor: "Dr. Sarah", dept: "Cardiology", waitTime: "25 min", status: "In Consultation", priority: "Urgent" },
  { id: "A-103", patient: "James Wilson", doctor: "Dr. Elena", dept: "Dentistry", waitTime: "5 min", status: "Called", priority: "Normal" },
  { id: "E-911", patient: "Unknown (Critical)", doctor: "Emergency Team", dept: "ER", waitTime: "0 min", status: "Emergent", priority: "Critical" },
];

export default function SmartQueuePage() {
  const [queue, setQueue] = useState(initialQueue);
  const [calling, setCalling] = useState<string | null>(null);

  const callNext = (id: string) => {
    setCalling(id);
    setTimeout(() => setCalling(null), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
           <div className="flex items-center gap-2 mb-1">
              <div className="px-2 py-0.5 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[9px] font-black uppercase tracking-widest rounded-full border border-indigo-500/20">
                 Real-time Management
              </div>
           </div>
           <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Smart Queue System</h1>
           <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium">Automated patient flow and clinic floor monitoring.</p>
        </div>
        
        <div className="flex items-center gap-3">
           <button className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-300 hover:bg-slate-50 transition-all shadow-sm">
              <Tv className="w-4 h-4" /> Display Screen
           </button>
           <button className="flex items-center gap-2 px-6 py-2.5 bg-teal-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-teal-500/20 hover:scale-105 transition-all">
              <UserPlus className="w-4 h-4" /> New Ticket
           </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
         {/* LEFT: Live Status (8 cols) */}
         <div className="lg:col-span-8 space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
               <div className="p-8 border-b border-slate-50 dark:border-slate-800 flex items-center justify-between">
                  <h3 className="text-xl font-black text-slate-900 dark:text-white">Active Floor Queue</h3>
                  <div className="flex gap-2">
                     <button className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg"><Filter className="w-4 h-4 text-slate-400" /></button>
                     <button className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg"><Settings2 className="w-4 h-4 text-slate-400" /></button>
                  </div>
               </div>

               <div className="overflow-x-auto">
                  <table className="w-full text-left whitespace-nowrap">
                     <thead className="bg-slate-50/50 dark:bg-slate-800/50 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                        <tr>
                           <th className="px-8 py-4">Ticket ID</th>
                           <th className="px-8 py-4">Patient</th>
                           <th className="px-8 py-4">Specialist</th>
                           <th className="px-8 py-4">Wait Time</th>
                           <th className="px-8 py-4">Status</th>
                           <th className="px-8 py-4 text-right">Action</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                        {queue.map((item) => (
                          <tr key={item.id} className={cn(
                            "group hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors",
                            calling === item.id && "bg-teal-50 dark:bg-teal-500/10 animate-pulse"
                          )}>
                             <td className="px-8 py-5">
                                <span className={cn(
                                  "px-3 py-1 rounded-xl text-xs font-black",
                                  item.priority === "Critical" ? "bg-rose-500 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white"
                                )}>{item.id}</span>
                             </td>
                             <td className="px-8 py-5">
                                <p className="text-sm font-black text-slate-900 dark:text-white">{item.patient}</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.dept}</p>
                             </td>
                             <td className="px-8 py-5">
                                <div className="flex items-center gap-2">
                                   <div className="w-6 h-6 rounded-lg bg-teal-500/10 flex items-center justify-center">
                                      <Users className="w-3.5 h-3.5 text-teal-600" />
                                   </div>
                                   <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{item.doctor}</span>
                                </div>
                             </td>
                             <td className="px-8 py-5">
                                <div className="flex items-center gap-2">
                                   <Clock className="w-3.5 h-3.5 text-slate-400" />
                                   <span className="text-xs font-bold text-slate-600">{item.waitTime}</span>
                                </div>
                             </td>
                             <td className="px-8 py-5">
                                <span className={cn(
                                  "px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest",
                                  item.status === "In Consultation" ? "bg-emerald-50 text-emerald-600" :
                                  item.status === "Called" ? "bg-amber-50 text-amber-600" :
                                  item.status === "Emergent" ? "bg-rose-50 text-rose-600" :
                                  "bg-slate-100 text-slate-500"
                                )}>{item.status}</span>
                             </td>
                             <td className="px-8 py-5 text-right">
                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                   <button 
                                     onClick={() => callNext(item.id)}
                                     className="p-2 bg-teal-500 text-white rounded-xl hover:bg-teal-600 transition-all shadow-lg shadow-teal-500/20"
                                   >
                                      <Speaker className="w-4 h-4" />
                                   </button>
                                   <button className="p-2 bg-slate-50 dark:bg-slate-800 text-slate-400 rounded-xl">
                                      <MoreVertical className="w-4 h-4" />
                                   </button>
                                </div>
                             </td>
                          </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>

            {/* Announcement Board (Digital Signage Mockup) */}
            <div className="bg-slate-900 dark:bg-slate-950 p-12 rounded-[3rem] text-white relative overflow-hidden shadow-2xl">
               <div className="absolute top-0 right-0 p-12 opacity-10">
                  <Monitor className="w-64 h-64" />
               </div>
               <div className="relative z-10 space-y-12">
                  <div className="flex items-center justify-between">
                     <h4 className="text-sm font-black uppercase tracking-[0.4em] text-white/40">Patient Calling Display</h4>
                     <div className="flex items-center gap-4">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Live Feed</span>
                     </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-12">
                     <div className="space-y-4">
                        <p className="text-[10px] font-black uppercase tracking-widest text-teal-400">Now Serving</p>
                        <h2 className="text-8xl font-black tracking-tighter">B-205</h2>
                        <p className="text-xl font-bold text-white/60">Room 12 • Cardiology</p>
                     </div>
                     <div className="space-y-6">
                        <p className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Upcoming Tickets</p>
                        <div className="space-y-4">
                           {["A-103", "A-104", "B-206"].map((t, i) => (
                             <div key={i} className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl">
                                <span className="text-2xl font-black">{t}</span>
                                <span className="text-[10px] font-bold opacity-40 uppercase">Waiting</span>
                             </div>
                           ))}
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* RIGHT: Queue Analytics (4 cols) */}
         <div className="lg:col-span-4 space-y-8">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm space-y-8">
               <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Queue Intelligence</h3>
               
               <div className="space-y-6">
                  <div className="flex justify-between items-end">
                     <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Avg Wait Time</p>
                        <h4 className="text-2xl font-black text-slate-900 dark:text-white">18.5 <span className="text-xs text-slate-400">min</span></h4>
                     </div>
                     <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">-2min today</span>
                  </div>

                  <div className="space-y-2">
                     <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                        <span>Clinic Load</span>
                        <span className="text-teal-600">Optimal</span>
                     </div>
                     <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-teal-500 w-[65%]" />
                     </div>
                  </div>
               </div>

               <div className="pt-8 border-t border-slate-100 dark:border-slate-800 space-y-4">
                  <div className="flex items-start gap-4">
                     <div className="w-8 h-8 bg-amber-50 rounded-xl flex items-center justify-center shrink-0">
                        <AlertCircle className="w-4 h-4 text-amber-600" />
                     </div>
                     <p className="text-xs text-slate-500 font-medium">Cardiology dept is experiencing higher volume than usual.</p>
                  </div>
               </div>
            </div>

            {/* AI Assistant for Queue */}
            <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 p-8 rounded-[2.5rem] text-white shadow-xl space-y-6">
               <Sparkles className="w-8 h-8 text-indigo-300" />
               <h4 className="text-lg font-black leading-tight">Hopify AI Optimization</h4>
               <p className="text-xs text-indigo-100/70 font-medium leading-relaxed">
                  The system is automatically re-routing low-risk patients to available General Practitioners to reduce specialist bottleneck.
               </p>
               <div className="p-4 bg-white/10 rounded-2xl border border-white/10 flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest">Efficiency Gain</span>
                  <span className="text-sm font-black">+24%</span>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
