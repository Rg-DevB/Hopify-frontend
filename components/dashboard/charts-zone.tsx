"use client";

import { motion } from "framer-motion";
import { 
  TrendingUp, 
  Users, 
  Activity, 
  Plus,
  CheckCircle2,
  DollarSign,
  UserPlus,
  ArrowRight,
  Clock,
  ExternalLink
} from "lucide-react";
import { cn } from "@/lib/utils";

const recentActivity = [
  { id: 1, type: "admission", title: "New Admission", user: "Reception", desc: "Patient: Alice Cooper — ICU-02", time: "09:42 AM", icon: UserPlus, color: "text-emerald-500 bg-emerald-500/10" },
  { id: 2, type: "payment", title: "Payment Received", user: "Billing", desc: "Invoice #892 — 450.00 CAD", time: "09:15 AM", icon: DollarSign, color: "text-blue-500 bg-blue-500/10" },
  { id: 3, type: "consultation", title: "Consultation Closed", user: "Dr. Tajuddin", desc: "Patient: Bob Marley — Report signed", time: "08:50 AM", icon: CheckCircle2, color: "text-teal-500 bg-teal-500/10" },
  { id: 4, type: "emergency", title: "Emergency Alert", user: "Nursing", desc: "Abnormal vital signs — Room 104", time: "08:30 AM", icon: Activity, color: "text-rose-500 bg-rose-500/10" },
];

export default function AnalyticsAndActivity() {
  return (
    <div className="space-y-12">
      
      {/* ANALYTICS SECTION (50/50 Symmetrical Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* Admissions Evolution */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[3rem] p-8 space-y-8 flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">Admissions Evolution</h4>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Trends over the last 7 days</p>
            </div>
            <div className="flex bg-slate-50 dark:bg-slate-800 p-1 rounded-xl">
              <button className="px-3 py-1.5 bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg text-[9px] font-black uppercase tracking-widest shadow-sm">7 Days</button>
            </div>
          </div>

          <div className="relative h-48 w-full pt-4">
             <svg className="w-full h-full overflow-visible" viewBox="0 0 800 200">
                <defs>
                   <linearGradient id="grad-admissions" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#14b8a6" stopOpacity="0" />
                   </linearGradient>
                </defs>
                {[0, 100, 200].map(y => (
                  <line key={y} x1="0" y1={y} x2="800" y2={y} stroke="currentColor" className="text-slate-100 dark:text-slate-800" strokeDasharray="4 4" />
                ))}
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  d="M0,150 L100,130 L200,160 L300,80 L400,100 L500,40 L600,60 L700,20 L800,50"
                  fill="none"
                  stroke="#14b8a6"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <path d="M0,150 L100,130 L200,160 L300,80 L400,100 L500,40 L600,60 L700,20 L800,50 V200 H0 Z" fill="url(#grad-admissions)" />
             </svg>
             <div className="flex justify-between mt-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
             </div>
          </div>
        </motion.div>

        {/* Speciality Distribution */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[3rem] p-8 space-y-8 flex flex-col justify-between"
        >
          <div className="space-y-1">
            <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">Department Distribution</h4>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Consultations by specialty</p>
          </div>

          <div className="flex items-center gap-10">
             <div className="relative w-32 h-32 shrink-0">
                <svg className="w-full h-full rotate-[-90deg]" viewBox="0 0 100 100">
                   <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" className="text-slate-100 dark:text-slate-800" strokeWidth="15" />
                   <motion.circle 
                     cx="50" cy="50" r="40" fill="none" stroke="#14b8a6" strokeWidth="15"
                     strokeDasharray="251.2"
                     strokeDashoffset={251.2 * 0.4}
                   />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center font-black text-sm">35%</div>
             </div>
             <div className="flex-1 space-y-3">
                <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                   <span className="flex items-center gap-2"><div className="w-2 h-2 rounded bg-teal-500" /> Cardiology</span>
                   <span>35%</span>
                </div>
                <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                   <span className="flex items-center gap-2"><div className="w-2 h-2 rounded bg-indigo-500" /> Surgery</span>
                   <span>28%</span>
                </div>
                <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                   <span className="flex items-center gap-2"><div className="w-2 h-2 rounded bg-slate-200 dark:bg-slate-700" /> Others</span>
                   <span>37%</span>
                </div>
             </div>
          </div>
        </motion.div>
      </div>

      {/* RECENT ACTIVITY (LIVE FEED) */}
      <section className="space-y-6">
        <div className="flex items-center justify-between px-4 sm:px-0">
          <h3 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em]">Recent Activity (Live Feed)</h3>
          <button className="text-[9px] font-black text-teal-600 uppercase tracking-widest flex items-center gap-1 hover:underline">
             Full History <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {recentActivity.map((act, idx) => (
            <motion.div
              key={act.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] p-5 flex items-start gap-4 hover:shadow-lg hover:-translate-y-1 transition-all group cursor-pointer"
            >
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:rotate-12", act.color)}>
                 <act.icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                 <div className="flex justify-between items-start mb-1">
                    <h5 className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-tight">{act.title}</h5>
                    <span className="text-[8px] font-bold text-slate-400 flex items-center gap-1"><Clock className="w-2.5 h-2.5" /> {act.time}</span>
                 </div>
                 <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{act.desc}</p>
                 <div className="mt-3 flex items-center justify-between border-t border-slate-50 dark:border-slate-800 pt-3">
                    <span className="text-[8px] font-black text-teal-600 uppercase tracking-widest">{act.user}</span>
                    <ExternalLink className="w-3 h-3 text-slate-300 group-hover:text-teal-500 transition-colors" />
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
}
