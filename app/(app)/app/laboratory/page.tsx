"use client";

import { useState } from "react";
import { 
  FlaskConical, 
  Search, 
  Filter, 
  Upload, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Printer, 
  MoreVertical,
  Activity,
  Microscope,
  FileSearch,
  AlertCircle,
  Download,
  ShieldCheck
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const labRequests = [
  { 
    id: "LAB-8821", 
    patient: "Md Tajuddin", 
    type: "Blood Test", 
    doctor: "Dr. Sarah Miller", 
    status: "Pending", 
    priority: "Urgent",
    date: "2026-05-11 09:30"
  },
  { 
    id: "LAB-8820", 
    patient: "Sarah Miller", 
    type: "MRI Brain", 
    doctor: "Dr. James Chen", 
    status: "Processing", 
    priority: "Normal",
    date: "2026-05-11 08:15"
  },
  { 
    id: "LAB-8819", 
    patient: "Asif Khan", 
    type: "Urine Analysis", 
    doctor: "Dr. Elena Rodriguez", 
    status: "Completed", 
    priority: "Normal",
    date: "2026-05-10 14:20"
  },
  { 
    id: "LAB-8818", 
    patient: "John Davis", 
    type: "Chest X-Ray", 
    doctor: "Dr. Sarah Miller", 
    status: "Completed", 
    priority: "Urgent",
    date: "2026-05-10 11:00"
  }
];

export default function LaboratoryPage() {
  const [filter, setFilter] = useState("All");

  const filteredRequests = labRequests.filter(req => filter === "All" || req.status === filter);

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
           <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-1">Diagnostic / Laboratory</p>
           <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Lab Management System</h1>
           <p className="text-slate-500 dark:text-slate-400 mt-1">Process diagnostic requests, validate results, and manage imaging.</p>
        </div>
        
        <div className="flex items-center gap-3">
           <button className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-300 hover:bg-slate-50 transition-all shadow-sm">
              <History className="w-4 h-4" /> History
           </button>
           <button className="flex items-center gap-2 px-6 py-2.5 bg-teal-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-teal-500/20 hover:scale-105 transition-all">
              <Plus className="w-4 h-4" /> New Request
           </button>
        </div>
      </div>

      {/* Lab Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="w-12 h-12 bg-teal-50 dark:bg-teal-500/10 rounded-2xl flex items-center justify-center text-teal-600">
               <FlaskConical className="w-6 h-6" />
            </div>
            <div>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Requests</p>
               <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">24</h3>
            </div>
         </div>
         <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="w-12 h-12 bg-rose-50 dark:bg-rose-500/10 rounded-2xl flex items-center justify-center text-rose-600">
               <AlertCircle className="w-6 h-6" />
            </div>
            <div>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Urgent Tests</p>
               <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">05</h3>
            </div>
         </div>
         <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-600">
               <Activity className="w-6 h-6" />
            </div>
            <div>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">In Process</p>
               <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">12</h3>
            </div>
         </div>
         <div className="bg-teal-600 p-6 rounded-[2rem] shadow-xl text-white space-y-4">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
               <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
               <p className="text-[10px] font-black text-white/60 uppercase tracking-widest">Validated Today</p>
               <h3 className="text-2xl font-black mt-1">18</h3>
            </div>
         </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
         {/* Main Requests List (8 cols) */}
         <div className="lg:col-span-8 space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
               <div className="p-8 border-b border-slate-50 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <h3 className="text-xl font-black text-slate-900 dark:text-white">Analysis Queue</h3>
                  <div className="flex bg-slate-50 dark:bg-slate-800 rounded-xl p-1 border border-slate-100 dark:border-slate-700">
                    {["All", "Pending", "Completed"].map((f) => (
                      <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={cn(
                          "px-5 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all",
                          filter === f ? "bg-white dark:bg-slate-900 text-teal-600 shadow-sm" : "text-slate-500"
                        )}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
               </div>

               <div className="overflow-x-auto">
                  <table className="w-full text-left whitespace-nowrap">
                     <thead className="bg-slate-50/50 dark:bg-slate-800/50 text-[9px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50 dark:border-slate-800">
                        <tr>
                           <th className="px-8 py-4">Lab ID / Patient</th>
                           <th className="px-8 py-4">Test Type</th>
                           <th className="px-8 py-4">Priority</th>
                           <th className="px-8 py-4">Status</th>
                           <th className="px-8 py-4 text-right">Actions</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                        {filteredRequests.map((req) => (
                          <tr key={req.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors group">
                             <td className="px-8 py-6">
                                <div>
                                   <p className="text-sm font-black text-slate-900 dark:text-white">{req.patient}</p>
                                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{req.id} • {req.date}</p>
                                </div>
                             </td>
                             <td className="px-8 py-6">
                                <div className="flex items-center gap-2">
                                   <div className="w-8 h-8 rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-teal-600">
                                      <Microscope className="w-4 h-4" />
                                   </div>
                                   <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{req.type}</span>
                                </div>
                             </td>
                             <td className="px-8 py-6">
                                <span className={cn(
                                   "px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border",
                                   req.priority === "Urgent" ? "text-rose-600 border-rose-100 bg-rose-50" : "text-slate-500 border-slate-100 bg-slate-50"
                                )}>{req.priority}</span>
                             </td>
                             <td className="px-8 py-6">
                                <span className={cn(
                                   "flex items-center gap-2 text-[10px] font-black uppercase tracking-widest",
                                   req.status === "Completed" ? "text-emerald-600" : 
                                   req.status === "Processing" ? "text-indigo-600" : "text-amber-600"
                                )}>
                                   {req.status === "Completed" ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                                   {req.status}
                                </span>
                             </td>
                             <td className="px-8 py-6 text-right">
                                {req.status === "Completed" ? (
                                   <div className="flex items-center justify-end gap-2">
                                      <button className="p-2 text-slate-400 hover:text-teal-600 transition-colors" title="Download Results">
                                         <Download className="w-4 h-4" />
                                      </button>
                                      <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors" title="Print Results">
                                         <Printer className="w-4 h-4" />
                                      </button>
                                   </div>
                                ) : (
                                   <button className="px-4 py-1.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all">
                                      {req.status === "Pending" ? "Start Test" : "Enter Results"}
                                   </button>
                                )}
                             </td>
                          </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>
         </div>

         {/* Sidebar: Result Validation & Imaging (4 cols) */}
         <div className="lg:col-span-4 space-y-8">
            {/* Pending Validation */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
               <div className="flex items-center justify-between">
                  <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                     <ShieldCheck className="w-4 h-4 text-teal-600" /> Biologist Validation
                  </h3>
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
               </div>
               <div className="space-y-4">
                  <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-3">
                     <div className="flex justify-between items-start">
                        <div>
                           <p className="text-xs font-black text-slate-900 dark:text-white">Complete Blood Count</p>
                           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Patient: Md Tajuddin</p>
                        </div>
                        <button className="p-1.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-100">
                           <FileSearch className="w-4 h-4 text-slate-400" />
                        </button>
                     </div>
                     <p className="text-[10px] text-amber-600 font-bold bg-amber-50 dark:bg-amber-500/10 px-2 py-1 rounded w-fit border border-amber-200/30">Anormal Hemoglobin detected</p>
                     <div className="flex gap-2 pt-2">
                        <button className="flex-1 py-2 bg-teal-600 text-white rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg shadow-teal-500/20">Approve</button>
                        <button className="flex-1 py-2 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-xl text-[9px] font-black uppercase tracking-widest">Review</button>
                     </div>
                  </div>
               </div>
            </div>

            {/* Imaging Module (Upload zones) */}
            <div className="bg-slate-900 dark:bg-slate-950 p-8 rounded-[2.5rem] text-white space-y-6 shadow-xl">
               <div className="flex items-center justify-between">
                  <h3 className="text-sm font-black uppercase tracking-widest text-white/50">Medical Imaging</h3>
                  <Activity className="w-5 h-5 text-teal-400" />
               </div>
               <div className="space-y-3">
                  {[
                    { type: "Scanner / CT", icon: <Activity className="w-4 h-4" /> },
                    { type: "MRI / IRM", icon: <Microscope className="w-4 h-4" /> },
                    { type: "X-Ray / Radio", icon: <FlaskConical className="w-4 h-4" /> }
                  ].map(item => (
                    <div key={item.type} className="group p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all cursor-pointer">
                       <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                             <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-teal-400">
                                {item.icon}
                             </div>
                             <span className="text-xs font-bold">{item.type}</span>
                          </div>
                          <Upload className="w-4 h-4 text-white/30 group-hover:text-teal-400 transition-colors" />
                       </div>
                    </div>
                  ))}
               </div>
               <div className="pt-4">
                  <div className="border-2 border-dashed border-white/10 rounded-2xl p-6 text-center group cursor-pointer hover:border-teal-500/50 transition-all">
                     <FileText className="w-8 h-8 text-white/20 mx-auto mb-2" />
                     <p className="text-[10px] font-black uppercase text-white/40 tracking-widest">Drop DICOM or PDF files</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}

function History({ className }: { className?: string }) {
   return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/></svg>
}

function Plus({ className }: { className?: string }) {
   return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
}
