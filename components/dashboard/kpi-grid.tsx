"use client";

import { 
  Users, 
  UserPlus, 
  UserMinus, 
  Bed, 
  Calendar, 
  Stethoscope, 
  Activity, 
  FlaskConical, 
  DollarSign, 
  Briefcase,
  TrendingUp,
  TrendingDown,
  AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface KPICardProps {
  title: string;
  value: string | number;
  trend?: {
    value: string;
    isUp: boolean;
    label: string;
  };
  icon: any;
  color: string;
  alert?: {
    message: string;
    level: "warning" | "critical";
  };
  progress?: number;
  subValue?: string;
}

const KPICard = ({ title, value, trend, icon: Icon, color, alert, progress, subValue }: KPICardProps) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm hover:shadow-md transition-all group"
  >
    <div className="flex justify-between items-start mb-3">
      <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110", color)}>
        <Icon className="w-5 h-5" />
      </div>
      {trend && (
        <div className={cn(
          "flex items-center gap-1 px-1.5 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-widest",
          trend.isUp ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600" : "bg-rose-50 dark:bg-rose-500/10 text-rose-600"
        )}>
          {trend.isUp ? <TrendingUp className="w-2.5 h-2.5" /> : <TrendingDown className="w-2.5 h-2.5" />}
          {trend.value}
        </div>
      )}
    </div>

    <div className="space-y-0.5">
      <h4 className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.15em] truncate">{title}</h4>
      <div className="flex items-baseline gap-1.5">
        <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">{value}</span>
        {subValue && <span className="text-[10px] font-bold text-slate-400">{subValue}</span>}
      </div>
    </div>

    {progress !== undefined && (
      <div className="mt-3 space-y-1.5">
        <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <div 
            className={cn(
              "h-full rounded-full transition-all duration-1000",
              progress > 90 ? "bg-rose-500" : progress > 75 ? "bg-amber-500" : "bg-teal-500"
            )}
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-[9px] font-bold text-slate-400 uppercase tracking-widest">
           <span>Occupancy {progress}%</span>
        </div>
      </div>
    )}

    {alert && (
      <div className={cn(
        "mt-3 p-1.5 rounded-lg flex items-center gap-1.5 border animate-pulse",
        alert.level === "critical" 
          ? "bg-rose-50 dark:bg-rose-500/10 border-rose-100 dark:border-rose-500/20 text-rose-600" 
          : "bg-amber-50 dark:bg-amber-500/10 border-amber-100 dark:border-amber-500/20 text-amber-600"
      )}>
        <AlertCircle className="w-3 h-3" />
        <span className="text-[8px] font-black uppercase tracking-widest leading-none">{alert.message}</span>
      </div>
    )}
  </motion.div>
);

export default function KPIGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      <KPICard 
        title="Active Patients" 
        value="128" 
        trend={{ value: "12%", isUp: true, label: "vs yesterday" }}
        icon={Users}
        color="bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400"
      />
      <KPICard 
        title="New Admissions" 
        value="14" 
        trend={{ value: "4%", isUp: false, label: "vs yesterday" }}
        icon={UserPlus}
        color="bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
      />
      <KPICard 
        title="Bed Occupancy" 
        value="84" 
        subValue="%"
        progress={84}
        icon={Bed}
        color="bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400"
        alert={{ message: "Critical > 80%", level: "warning" }}
      />
      <KPICard 
        title="Today's Appt" 
        value="42" 
        trend={{ value: "+8", isUp: true, label: "new" }}
        icon={Calendar}
        color="bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400"
      />
      <KPICard 
        title="ER Wait Time" 
        value="18" 
        subValue="min"
        icon={Activity}
        color="bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400"
        alert={{ message: "Alert > 15m", level: "critical" }}
      />
      <KPICard 
        title="Consultations" 
        value="36" 
        icon={Stethoscope}
        color="bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400"
      />
      <KPICard 
        title="Pending Labs" 
        value="09" 
        icon={FlaskConical}
        color="bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400"
      />
      <KPICard 
        title="Daily Revenue" 
        value="12.5k" 
        subValue="CAD"
        trend={{ value: "20%", isUp: true, label: "vs yesterday" }}
        icon={DollarSign}
        color="bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
      />
      <KPICard 
        title="Active Staff" 
        value="24" 
        icon={Briefcase}
        color="bg-slate-50 dark:bg-slate-500/10 text-slate-600 dark:text-slate-400"
      />
      <KPICard 
        title="Discharged" 
        value="06" 
        icon={UserMinus}
        color="bg-gray-50 dark:bg-gray-500/10 text-gray-600 dark:text-gray-400"
      />
    </div>
  );
}
