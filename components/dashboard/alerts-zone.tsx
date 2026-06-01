"use client";

import { 
  AlertTriangle, 
  FlaskConical, 
  Activity, 
  Pill, 
  ChevronRight, 
  FileWarning, 
  Stethoscope,
  TrendingUp,
  AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const alerts = [
  { 
    id: 1, 
    type: "critical", 
    title: "Critical Lab Result", 
    desc: "Patient: Emma Thompson — Potassium: 6.2 mmol/L", 
    time: "2m ago",
    icon: FlaskConical,
    category: "Laboratory"
  },
  { 
    id: 2, 
    type: "critical", 
    title: "Unstable Vital Signs", 
    desc: "Patient: Marc Rossi (ICU-04) — SpO2: 88%", 
    time: "Live",
    icon: Activity,
    category: "Monitoring"
  },
  { 
    id: 3, 
    type: "urgent", 
    title: "Medication Interaction", 
    desc: "Major Alert: Warfarin + Ibuprofen (Dr. Sarah)", 
    time: "15m ago",
    icon: Pill,
    category: "Pharmacy"
  },
  { 
    id: 4, 
    type: "urgent", 
    title: "Urgent Imaging Missing", 
    desc: "Brain CT (Emergency) — Ready since 2h", 
    time: "2h ago",
    icon: FileWarning,
    category: "Radiology"
  },
  { 
    id: 5, 
    type: "moderate", 
    title: "Low Pharmacy Stock", 
    desc: "Insulin Aspart — 5 units remaining", 
    time: "This morning",
    icon: Pill,
    category: "Logistics"
  },
];

const getAlertStyles = (type: string) => {
  switch (type) {
    case "critical": return "bg-rose-500/10 border-rose-500/20 text-rose-600 dark:text-rose-400 ring-1 ring-rose-500/50";
    case "urgent": return "bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400";
    case "moderate": return "bg-blue-500/10 border-blue-500/20 text-blue-600 dark:text-blue-400";
    default: return "bg-slate-500/10 border-slate-500/20 text-slate-600";
  }
};

export default function AlertsZone() {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] shadow-sm flex flex-col h-full overflow-hidden">
      <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-rose-500 flex items-center justify-center text-white shadow-lg shadow-rose-500/20">
             <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">Alerts & Emergencies</h3>
            <p className="text-[9px] font-bold text-rose-500 uppercase tracking-widest mt-0.5 animate-pulse">2 Critical detected</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-[600px] scrollbar-hide">
        {alerts.map((alert, idx) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={cn(
              "p-4 rounded-3xl border transition-all hover:scale-[1.02] cursor-pointer group",
              getAlertStyles(alert.type)
            )}
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <alert.icon className="w-3.5 h-3.5" />
                <span className="text-[8px] font-black uppercase tracking-widest">{alert.category}</span>
              </div>
              <span className="text-[8px] font-bold opacity-60 uppercase">{alert.time}</span>
            </div>
            
            <h4 className="text-xs font-black mb-1 flex items-center gap-2">
              {alert.type === "critical" && <div className="w-1.5 h-1.5 rounded-full bg-current animate-ping" />}
              {alert.title}
            </h4>
            <p className="text-[10px] font-medium opacity-80 leading-relaxed mb-3">
              {alert.desc}
            </p>

            <button className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest hover:underline">
               Intervene Now <ChevronRight className="w-3 h-3" />
            </button>
          </motion.div>
        ))}
      </div>

      <div className="p-4 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800">
         <button className="w-full py-3 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
            Access Triage Center
         </button>
      </div>
    </div>
  );
}
