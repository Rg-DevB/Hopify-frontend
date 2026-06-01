"use client";

import { motion } from "framer-motion";
import KPIGrid from "@/components/dashboard/kpi-grid";
import AppointmentsZone from "@/components/dashboard/appointments-zone";
import AlertsZone from "@/components/dashboard/alerts-zone";
import ClinicalActivity from "@/components/dashboard/clinical-activity";
import BusinessWidgets from "@/components/dashboard/business-widgets";
import ChartsZone from "@/components/dashboard/charts-zone";
import { 
  Plus, 
  CalendarPlus, 
  Sparkles, 
  Activity, 
  ChevronRight, 
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
  return (
    <div className="space-y-12 pb-20 max-w-[1600px] mx-auto">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-4 sm:px-0">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Welcome back, Dr. Tajuddin</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">Here's what's happening in your hospital today.</p>
        </div>

        {/* QUICK ACTIONS BAR */}
        <div className="flex flex-wrap items-center gap-3">
          <button className="flex items-center gap-2.5 px-5 py-2.5 bg-teal-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-teal-700 hover:scale-105 transition-all shadow-lg shadow-teal-500/20 active:scale-95 group">
            <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
            New Patient
          </button>
          <button className="flex items-center gap-2.5 px-5 py-2.5 bg-indigo-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-700 hover:scale-105 transition-all shadow-lg shadow-indigo-500/20 active:scale-95">
            <CalendarPlus className="w-4 h-4" />
            Appointment
          </button>
          <button className="flex items-center gap-2.5 px-5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-slate-800 hover:scale-105 transition-all active:scale-95">
            <Sparkles className="w-4 h-4 text-teal-500" />
            AI Prescription
          </button>
          <button className="flex items-center justify-center w-11 h-11 bg-rose-50 dark:bg-rose-500/10 text-rose-600 border border-rose-100 dark:border-rose-500/20 rounded-2xl hover:bg-rose-600 hover:text-white transition-all group">
            <Activity className="w-5 h-5 animate-pulse group-hover:scale-110" />
          </button>
        </div>
      </div>

      {/* KPI GRID */}
      <section>
        <KPIGrid />
      </section>

      {/* EMERGENCY SECTION - FULL WIDTH FOR MAXIMUM ATTENTION */}
      <section>
        <AlertsZone />
      </section>

      {/* CORE OPERATIONS - SYMMETRICAL 50/50 GRID (Zone 6 & Zone 4) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <ClinicalActivity />
        <AppointmentsZone />
      </div>

      {/* BUSINESS INTELLIGENCE (Zones 7, 8, 9) */}
      <section>
        <BusinessWidgets />
      </section>

      {/* DATA-VIZ & ANALYTICS (Zone 10 & 11) */}
      <section>
        <ChartsZone />
      </section>

    </div>
  );
}
