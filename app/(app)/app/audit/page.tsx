"use client";

import { useState } from "react";
import { 
  History, 
  Search, 
  Filter, 
  Download, 
  User, 
  Database, 
  ShieldCheck, 
  ArrowRight,
  Clock,
  Globe,
  FileJson,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  Fingerprint
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const fullAuditLogs = [
  { 
    id: "LOG-89021", 
    user: "Dr. Tajuddin", 
    role: "Chief Surgeon",
    action: "Updated Medical Record", 
    entity: "Patient #S-092 (Sarah Miller)",
    field: "Blood Pressure",
    oldValue: "120/80",
    newValue: "145/95",
    time: "2026-05-15 10:45 AM", 
    ip: "192.168.1.45",
    status: "Verified",
    hash: "sha256:7f8e...9d2a"
  },
  { 
    id: "LOG-89022", 
    user: "Nurse Elena", 
    role: "ICU Staff",
    action: "Administered Medication", 
    entity: "Patient #I-004 (Marc Rossi)",
    field: "Dosage (Morphine)",
    oldValue: "0mg",
    newValue: "5mg",
    time: "2026-05-15 11:02 AM", 
    ip: "192.168.1.58",
    status: "Verified",
    hash: "sha256:a3d1...4e5b"
  },
  { 
    id: "LOG-89023", 
    user: "System Admin", 
    role: "Admin",
    action: "Changed Permissions", 
    entity: "Role: Lab Technician",
    field: "Delete Records",
    oldValue: "Disabled",
    newValue: "Enabled",
    time: "2026-05-15 11:15 AM", 
    ip: "10.0.0.12",
    status: "Warning",
    hash: "sha256:c9b2...1a8f"
  },
  { 
    id: "LOG-89024", 
    user: "Pharmacist John", 
    role: "Pharmacy Manager",
    action: "Stock Inventory Update", 
    entity: "Drug: Paracetamol 500mg",
    field: "Quantity",
    oldValue: "450 units",
    newValue: "2000 units",
    time: "2026-05-15 11:20 AM", 
    ip: "172.16.0.4",
    status: "Verified",
    hash: "sha256:f4e0...8b3c"
  },
];

export default function AuditPage() {
  const [selectedLog, setSelectedLog] = useState<typeof fullAuditLogs[0] | null>(null);

  return (
    <div className="max-w-[1600px] mx-auto space-y-10 pb-20">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-4 sm:px-0">
        <div className="space-y-1">
          <p className="text-[10px] font-black uppercase text-teal-600 tracking-[0.2em] mb-1 flex items-center gap-2">
             <Fingerprint className="w-3 h-3" /> System Transparency Core
          </p>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Full Audit Trail</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">Comprehensive tracking of every modification within the Hopify ecosystem.</p>
        </div>

        <div className="flex items-center gap-3">
           <button className="px-5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center gap-2">
              <Download className="w-4 h-4" /> Export for Compliance (PDF)
           </button>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-wrap items-center gap-4">
         <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input placeholder="Search by User, Patient or Action..." className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-transparent rounded-2xl text-xs font-bold uppercase outline-none focus:border-teal-500 transition-all" />
         </div>
         <div className="flex items-center gap-2">
            <button className="px-5 py-3 bg-slate-50 dark:bg-slate-800 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-teal-600 border border-transparent hover:border-teal-500/30">
               All Time
            </button>
            <button className="px-5 py-3 bg-slate-50 dark:bg-slate-800 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-teal-600 border border-transparent hover:border-teal-500/30">
               Critical Only
            </button>
            <button className="p-3 bg-teal-600 text-white rounded-2xl shadow-lg shadow-teal-500/20">
               <Filter className="w-5 h-5" />
            </button>
         </div>
      </div>

      {/* MAIN CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* LOGS TABLE */}
        <div className={cn("space-y-6 transition-all duration-500", selectedLog ? "lg:col-span-7" : "lg:col-span-12")}>
           <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[3rem] overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                 <table className="w-full text-left">
                    <thead className="bg-slate-50/50 dark:bg-slate-800/50 text-[9px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800">
                       <tr>
                          <th className="px-8 py-5">Event ID</th>
                          <th className="px-8 py-5">User</th>
                          <th className="px-8 py-5">Action</th>
                          <th className="px-8 py-5">Entity</th>
                          <th className="px-8 py-5">IP Source</th>
                          <th className="px-8 py-5 text-right">Timestamp</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                       {fullAuditLogs.map((log) => (
                          <motion.tr 
                            key={log.id} 
                            onClick={() => setSelectedLog(log)}
                            className={cn(
                              "hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-all cursor-pointer group",
                              selectedLog?.id === log.id ? "bg-teal-50/50 dark:bg-teal-500/5" : ""
                            )}
                          >
                             <td className="px-8 py-5 font-mono text-[10px] text-slate-400">{log.id}</td>
                             <td className="px-8 py-5">
                                <div className="flex items-center gap-3">
                                   <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-black text-[10px] text-slate-500">{log.user[0]}</div>
                                   <div>
                                      <p className="text-xs font-black text-slate-900 dark:text-white">{log.user}</p>
                                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{log.role}</p>
                                   </div>
                                </div>
                             </td>
                             <td className="px-8 py-5">
                                <span className={cn(
                                   "px-2.5 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest border",
                                   log.status === "Verified" ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-rose-50 text-rose-600 border-rose-100"
                                )}>
                                   {log.action}
                                </span>
                             </td>
                             <td className="px-8 py-5 text-xs font-bold text-slate-600 dark:text-slate-400">{log.entity}</td>
                             <td className="px-8 py-5">
                                <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400">
                                   <Globe className="w-3 h-3" /> {log.ip.replace(/\.\d+\.\d+$/, ".x.x")}
                                </div>
                             </td>
                             <td className="px-8 py-5 text-right text-[10px] font-black text-slate-500 uppercase tracking-tight">{log.time}</td>
                          </motion.tr>
                       ))}
                    </tbody>
                 </table>
              </div>
           </div>
        </div>

        {/* LOG DETAIL (SIDE PANEL) */}
        <AnimatePresence>
          {selectedLog && (
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              className="lg:col-span-5 space-y-6"
            >
              <div className="bg-slate-900 rounded-[3rem] p-8 text-white space-y-8 shadow-2xl relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 blur-[60px]" />
                 
                 <div className="flex justify-between items-center">
                    <h3 className="text-sm font-black uppercase tracking-widest">Detailed Event History</h3>
                    <button onClick={() => setSelectedLog(null)} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                       <Database className="w-4 h-4 text-slate-400" />
                    </button>
                 </div>

                 {/* DIFF VIEW */}
                 <div className="space-y-6">
                    <div className="space-y-3">
                       <p className="text-[10px] font-black text-teal-400 uppercase tracking-[0.2em]">Data Modification</p>
                       <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-between">
                          <div className="space-y-1">
                             <p className="text-[8px] font-black text-white/40 uppercase">Old Value</p>
                             <p className="text-sm font-bold text-rose-400 line-through">{selectedLog.oldValue}</p>
                          </div>
                          <ArrowRight className="w-5 h-5 text-white/20" />
                          <div className="space-y-1 text-right">
                             <p className="text-[8px] font-black text-white/40 uppercase">New Value</p>
                             <p className="text-sm font-black text-emerald-400">{selectedLog.newValue}</p>
                          </div>
                       </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                       <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-2">
                          <div className="flex items-center gap-2 text-[9px] font-black text-white/40 uppercase">
                             <Clock className="w-3 h-3" /> Duration
                          </div>
                          <p className="text-xs font-bold text-white">Processed in 12ms</p>
                       </div>
                       <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-2">
                          <div className="flex items-center gap-2 text-[9px] font-black text-white/40 uppercase">
                             <ShieldCheck className="w-3 h-3" /> Integrity
                          </div>
                          <p className="text-xs font-bold text-emerald-400">Checksum Verified</p>
                       </div>
                    </div>

                    <div className="p-6 bg-white/[0.03] rounded-[2rem] border border-white/10 space-y-4">
                       <div className="flex items-center gap-3">
                          <Fingerprint className="w-5 h-5 text-teal-500" />
                          <p className="text-[10px] font-black uppercase tracking-widest text-white">Digital Signature</p>
                       </div>
                       <p className="text-[10px] font-mono text-white/40 break-all leading-relaxed bg-black/40 p-4 rounded-xl border border-white/5 uppercase">
                          {selectedLog.hash}
                       </p>
                    </div>
                 </div>

                 <button className="w-full py-4 bg-white text-slate-900 rounded-[1.5rem] font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all shadow-xl active:scale-95 flex items-center justify-center gap-2">
                    <FileJson className="w-4 h-4" /> Download Event JSON
                 </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
