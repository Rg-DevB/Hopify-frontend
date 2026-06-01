"use client";

import { 
  ClipboardList, 
  Stethoscope, 
  FileCheck, 
  Clock, 
  ChevronRight, 
  User,
  CheckCircle2,
  AlertCircle,
  MoreHorizontal
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const activities = [
  { id: 1, type: "consultation", patient: "Alice Cooper", doctor: "Dr. Tajuddin", status: "Active", time: "15m ago", icon: Stethoscope },
  { id: 2, type: "validation", patient: "Robert De Niro", doctor: "Radiology", status: "Awaiting Signature", time: "Ready", icon: FileCheck },
  { id: 3, type: "prescription", patient: "John Wick", doctor: "Dr. Sarah", status: "To Dispense", time: "Urgent", icon: ClipboardList },
  { id: 4, type: "lab", patient: "Neo Anderson", doctor: "Main Lab", status: "Results Ready", time: "New", icon: FileCheck },
];

export default function ClinicalActivity() {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] shadow-sm flex flex-col h-full overflow-hidden">
      <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
             <ClipboardList className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">Clinical Activity</h3>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Worklist — 6 pending tasks</p>
          </div>
        </div>
        <button className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline flex items-center gap-1">
           View All <ChevronRight className="w-3 h-3" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto min-h-[400px]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-50 dark:border-slate-800">
               <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">Type / Patient</th>
               <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">Assignee</th>
               <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">Status</th>
               <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
            {activities.map((act, idx) => (
              <motion.tr 
                key={act.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="group hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-all cursor-pointer"
              >
                <td className="px-6 py-4">
                   <div className="flex items-center gap-4">
                      <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                         <act.icon className="w-4 h-4" />
                      </div>
                      <div>
                         <p className="text-sm font-black text-slate-900 dark:text-white">{act.patient}</p>
                         <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{act.type}</p>
                      </div>
                   </div>
                </td>
                <td className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400">
                   {act.doctor}
                </td>
                <td className="px-6 py-4">
                   <div className="flex flex-col">
                      <span className={cn(
                        "text-[9px] font-black uppercase tracking-widest mb-1",
                        act.status === "Active" ? "text-teal-500" : act.status === "Urgent" ? "text-rose-500" : "text-indigo-500"
                      )}>
                         {act.status}
                      </span>
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter flex items-center gap-1">
                         <Clock className="w-2.5 h-2.5" /> {act.time}
                      </span>
                   </div>
                </td>
                <td className="px-6 py-4 text-right">
                   <button className="p-2 text-slate-300 hover:text-slate-600 dark:hover:text-white group-hover:translate-x-1 transition-all">
                      <ChevronRight className="w-5 h-5" />
                   </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="p-4 bg-slate-100/50 dark:bg-slate-800/20 border-t border-slate-100 dark:border-slate-800 flex items-center justify-center gap-4">
         <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-teal-500" />
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">3 Active</span>
         </div>
         <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-indigo-500" />
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">8 To Validate</span>
         </div>
      </div>
    </div>
  );
}
