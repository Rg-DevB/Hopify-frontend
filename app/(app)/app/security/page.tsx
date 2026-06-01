"use client";

import { useState } from "react";
import { 
  ShieldCheck, 
  Lock, 
  History, 
  Users, 
  Database, 
  AlertTriangle, 
  FileText, 
  Search,
  Eye,
  Key,
  CloudLightning,
  ShieldAlert,
  ChevronRight,
  Fingerprint
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const auditLogs = [
  { id: 1, user: "Dr. Tajuddin", action: "Patient Record Accessed", target: "Sarah Miller (ID: 8902)", time: "2m ago", ip: "192.168.1.45", level: "info" },
  { id: 2, user: "System", action: "Auto-Backup Completed", target: "Main DB (S3-East)", time: "15m ago", ip: "Internal", level: "success" },
  { id: 3, user: "Admin", action: "Permission Changed", target: "Nurse Role -> Laboratory", time: "1h ago", ip: "10.0.0.8", level: "warning" },
  { id: 4, user: "Dr. Robert", action: "Exported Data", target: "Pharmacy Inventory (PDF)", time: "2h ago", ip: "192.168.1.12", level: "critical" },
];

export default function SecurityPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="max-w-[1600px] mx-auto space-y-10 pb-20">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-4 sm:px-0">
        <div className="space-y-1">
          <p className="text-[10px] font-black uppercase text-rose-600 tracking-[0.2em] mb-1 flex items-center gap-2">
             <ShieldCheck className="w-3 h-3" /> Fortress Security Core
          </p>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Security & Compliance</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">Monitor system integrity, access logs, and data protection status.</p>
        </div>

        <div className="flex items-center gap-3">
           <button className="px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all shadow-xl active:scale-95 flex items-center gap-2">
              <Key className="w-4 h-4" /> Revoke All Sessions
           </button>
        </div>
      </div>

      {/* SECURITY STATS OVERVIEW */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {[
           { label: "Data Encryption", value: "AES-256 Active", sub: "100% Protection", icon: Lock, color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10" },
           { label: "System Integrity", value: "Verified", sub: "Scan 12m ago", icon: ShieldCheck, color: "text-teal-600 bg-teal-50 dark:bg-teal-500/10" },
           { label: "Pending Alerts", value: "01", sub: "Critical Check", icon: ShieldAlert, color: "text-rose-600 bg-rose-50 dark:bg-rose-500/10" },
           { label: "Uptime", value: "99.99%", sub: "High Availability", icon: CloudLightning, color: "text-indigo-600 bg-indigo-50 dark:bg-indigo-500/10" },
         ].map((stat, i) => (
           <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-5">
              <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center", stat.color)}>
                 <stat.icon className="w-6 h-6" />
              </div>
              <div>
                 <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{stat.label}</p>
                 <p className="text-xl font-black text-slate-900 dark:text-white">{stat.value}</p>
                 <p className="text-[9px] font-bold text-slate-400 uppercase mt-0.5">{stat.sub}</p>
              </div>
           </div>
         ))}
      </div>

      {/* MAIN CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* LEFT: AUDIT TRAIL (Zone 11 style) */}
        <div className="lg:col-span-8 space-y-6">
           <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[3rem] overflow-hidden shadow-sm flex flex-col h-full">
              <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center">
                       <History className="w-5 h-5" />
                    </div>
                    <div>
                       <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">Real-time Audit Trail</h3>
                       <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Tracking sensitive data access</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-2">
                    <div className="relative">
                       <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                       <input placeholder="Search logs..." className="pl-9 pr-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl text-[10px] font-black uppercase outline-none focus:border-teal-500 w-48" />
                    </div>
                    <button className="p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-400">
                       <Database className="w-4 h-4" />
                    </button>
                 </div>
              </div>

              <div className="flex-1 overflow-x-auto">
                 <table className="w-full text-left">
                    <thead className="bg-slate-50/80 dark:bg-slate-800/50 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100 dark:border-slate-800">
                       <tr>
                          <th className="px-8 py-5">Initiator</th>
                          <th className="px-8 py-5">Event</th>
                          <th className="px-8 py-5">Target Asset</th>
                          <th className="px-8 py-5">Network IP</th>
                          <th className="px-8 py-5 text-right">Time</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                       {auditLogs.map((log) => (
                          <motion.tr 
                            key={log.id} 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors group cursor-pointer"
                          >
                             <td className="px-8 py-5">
                                <div className="flex items-center gap-3">
                                   <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-black text-[10px] text-slate-500">{log.user[0]}</div>
                                   <span className="text-xs font-black text-slate-900 dark:text-white">{log.user}</span>
                                </div>
                             </td>
                             <td className="px-8 py-5">
                                <span className={cn(
                                   "px-2.5 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest border",
                                   log.level === "info" ? "bg-blue-50 text-blue-600 border-blue-100" :
                                   log.level === "success" ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                                   log.level === "warning" ? "bg-amber-50 text-amber-600 border-amber-100" :
                                   "bg-rose-50 text-rose-600 border-rose-100"
                                )}>
                                   {log.action}
                                </span>
                             </td>
                             <td className="px-8 py-5 text-xs font-bold text-slate-500 dark:text-slate-400">{log.target}</td>
                             <td className="px-8 py-5 text-[10px] font-mono text-slate-400">{log.ip.includes('.') ? log.ip.replace(/\.\d+\.\d+$/, ".x.x") : log.ip}</td>
                             <td className="px-8 py-5 text-right text-[10px] font-black text-slate-400 uppercase">{log.time}</td>
                          </motion.tr>
                       ))}
                    </tbody>
                 </table>
              </div>
              <div className="p-5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-900/30 text-center">
                 <button className="text-[10px] font-black text-slate-400 hover:text-teal-600 uppercase tracking-widest transition-colors flex items-center gap-2 mx-auto">
                    Load Archive Logs <ChevronRight className="w-3 h-3" />
                 </button>
              </div>
           </div>
        </div>

        {/* RIGHT: COMPLIANCE & BACKUPS */}
        <div className="lg:col-span-4 space-y-8">
           {/* Compliance Score */}
           <div className="bg-slate-900 rounded-[3rem] p-8 text-white space-y-6 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/20 blur-[60px] group-hover:bg-teal-500/30 transition-all" />
              <div className="flex justify-between items-start">
                 <div className="space-y-1">
                    <p className="text-[10px] font-black text-teal-400 uppercase tracking-widest">Health Data Security</p>
                    <h3 className="text-xl font-black tracking-tight">Compliance Score</h3>
                 </div>
                 <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/10">
                    <Fingerprint className="w-6 h-6 text-teal-400" />
                 </div>
              </div>
              <div className="flex items-center gap-6">
                 <div className="text-5xl font-black tracking-tighter text-teal-400">98<span className="text-xl text-white/40 ml-1">%</span></div>
                 <div className="flex-1 space-y-2">
                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                       <div className="h-full w-[98%] bg-teal-500" />
                    </div>
                    <p className="text-[9px] font-bold text-white/50 uppercase tracking-widest">Exceeding HIPAA standards</p>
                 </div>
              </div>
              <div className="pt-4 grid grid-cols-2 gap-4">
                 <div className="p-3 bg-white/5 rounded-2xl border border-white/5 text-center">
                    <p className="text-[8px] font-black text-white/40 uppercase mb-1">GDPR Status</p>
                    <p className="text-xs font-black text-emerald-400">Verified</p>
                 </div>
                 <div className="p-3 bg-white/5 rounded-2xl border border-white/5 text-center">
                    <p className="text-[8px] font-black text-white/40 uppercase mb-1">HDS Cloud</p>
                    <p className="text-xs font-black text-emerald-400">Certified</p>
                 </div>
              </div>
           </div>

           {/* Backup Control */}
           <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[3rem] p-8 space-y-6 shadow-sm">
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center">
                    <Database className="w-5 h-5" />
                 </div>
                 <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">Data Retention</h4>
              </div>
              <div className="space-y-4">
                 <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Last Snapshot</span>
                    <span className="text-xs font-black text-slate-900 dark:text-white">15m ago</span>
                 </div>
                 <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Storage Used</span>
                    <span className="text-xs font-black text-slate-900 dark:text-white">1.2 TB</span>
                 </div>
                 <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full w-[45%] bg-indigo-500" />
                 </div>
              </div>
              <button className="w-full py-3 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-2xl font-black text-[9px] uppercase tracking-widest hover:bg-teal-600 hover:text-white transition-all active:scale-95">
                 Run Manual Backup
              </button>
           </div>

           {/* Security Warning */}
           <div className="p-6 bg-rose-500/5 border-2 border-rose-500/20 rounded-[2.5rem] space-y-3">
              <div className="flex items-center gap-3">
                 <ShieldAlert className="w-5 h-5 text-rose-500" />
                 <h4 className="text-xs font-black text-rose-600 uppercase tracking-widest">Security Alert</h4>
              </div>
              <p className="text-[10px] font-bold text-slate-500 uppercase leading-relaxed">3 users are using weak passwords. Force password rotation is recommended.</p>
              <button className="text-[9px] font-black text-rose-600 uppercase tracking-[0.2em] hover:underline">
                 Resolve Issues Now
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
