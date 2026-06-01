import { cn } from "@/lib/utils";
import { type LucideIcon } from "lucide-react";

export default function StatCard({ title, value, subtitle, icon: Icon, className }: {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  className?: string;
}) {
  return (
    <div className={cn("bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm", className)}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">{title}</p>
          <h3 className="text-3xl font-extrabold text-slate-800 dark:text-slate-100 mt-2">{value}</h3>
          {subtitle && <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{subtitle}</p>}
        </div>
        <div className="w-10 h-10 bg-teal-50 dark:bg-teal-500/10 rounded-xl flex items-center justify-center">
          <Icon className="w-5 h-5 text-teal-600 dark:text-teal-400" />
        </div>
      </div>
    </div>
  );
}