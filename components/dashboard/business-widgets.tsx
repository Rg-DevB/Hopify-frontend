"use client";

import { 
  Pill, 
  Wallet, 
  Users, 
  TrendingUp, 
  AlertCircle, 
  ChevronRight,
  ArrowUpRight,
  DollarSign,
  Briefcase,
  Activity
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function BusinessWidgets() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      {/* ZONE 7: PHARMACY */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-6 space-y-6"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-2xl bg-teal-500/10 text-teal-600 flex items-center justify-center">
                <Pill className="w-5 h-5" />
             </div>
             <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">Pharmacy</h4>
          </div>
          <span className="text-[10px] font-black text-teal-600 uppercase tracking-widest bg-teal-50 dark:bg-teal-500/10 px-2 py-1 rounded-lg">Stock: 85%</span>
        </div>

        <div className="space-y-4">
           <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 group cursor-pointer hover:border-teal-500/30 transition-all">
              <div className="flex items-center gap-3">
                 <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                 <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Low Stock Alerts</span>
              </div>
              <span className="text-xs font-black text-rose-500">12</span>
           </div>
           <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 group cursor-pointer">
              <div className="flex items-center gap-3">
                 <div className="w-2 h-2 rounded-full bg-amber-500" />
                 <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Expired (30d)</span>
              </div>
              <span className="text-xs font-black text-amber-500">05</span>
           </div>
        </div>

        <div className="pt-2">
           <div className="flex justify-between text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">
              <span>Stock Value</span>
              <span>145,200 CAD</span>
           </div>
           <div className="h-1 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full w-[85%] bg-teal-500 rounded-full" />
           </div>
        </div>
      </motion.div>

      {/* ZONE 8: FINANCE */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-6 space-y-6"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                <Wallet className="w-5 h-5" />
             </div>
             <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">Finance</h4>
          </div>
          <TrendingUp className="w-4 h-4 text-emerald-500" />
        </div>

        <div className="grid grid-cols-2 gap-4">
           <div className="space-y-1">
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Daily Revenue</p>
              <p className="text-xl font-black text-slate-900 dark:text-white tracking-tighter">12,450<span className="text-[10px] text-slate-400 ml-1">CAD</span></p>
           </div>
           <div className="space-y-1 text-right">
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Monthly Goal</p>
              <p className="text-xl font-black text-emerald-500 tracking-tighter">72%</p>
           </div>
        </div>

        <div className="space-y-3">
           <div className="flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-400">
              <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-rose-500" /> Overdue Invoices</span>
              <span className="font-black text-rose-600">8,200 $</span>
           </div>
           <div className="flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-400">
              <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500" /> Insurance Claims</span>
              <span className="font-black text-indigo-600">45k $</span>
           </div>
        </div>

        <button className="w-full py-3 bg-emerald-500 text-white rounded-2xl font-black text-[9px] uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20 active:scale-95">
           Full Financial Report
        </button>
      </motion.div>

      {/* ZONE 9: HR (STAFF) */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-6 space-y-6"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center">
                <Users className="w-5 h-5" />
             </div>
             <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">Human Resources</h4>
          </div>
          <Briefcase className="w-4 h-4 text-indigo-500" />
        </div>

        <div className="space-y-4">
           <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                 <div className="flex -space-x-2">
                    {[1,2,3].map(i => (
                      <div key={i} className="w-7 h-7 rounded-full border-2 border-white dark:border-slate-900 bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[8px] font-black">
                         {i === 3 ? "+12" : "U"+i}
                      </div>
                    ))}
                 </div>
                 <span className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-widest">24 Active Staff</span>
              </div>
              <span className="text-[9px] font-bold text-teal-500 uppercase">Coverage OK</span>
           </div>

           <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
                 <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Absences</p>
                 <p className="text-sm font-black text-rose-500">02</p>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
                 <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Leave Requests</p>
                 <p className="text-sm font-black text-indigo-500">06</p>
              </div>
           </div>
        </div>

        <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700">
           <p className="text-[9px] font-bold text-slate-500 text-center uppercase tracking-widest">Current Shift: Morning (08 AM - 04 PM)</p>
        </div>
      </motion.div>

    </div>
  );
}
