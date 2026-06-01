"use client";

import { useState } from "react";
import { 
  CreditCard, 
  ShieldCheck, 
  CheckCircle2, 
  Zap, 
  Building2, 
  Users, 
  Database, 
  ArrowUpRight,
  Plus,
  Crown,
  History,
  LayoutGrid,
  Settings
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const hospitalUnits = [
  { id: 1, name: "Saint-Joseph Medical Center", city: "Montreal", patients: "12,450", status: "Active", plan: "Enterprise" },
  { id: 2, name: "Hopify Clinic East", city: "Sherbrooke", patients: "2,100", status: "Active", plan: "Pro" },
  { id: 3, name: "Quebec Surgical Center", city: "Quebec", patients: "540", status: "Trial", plan: "Basic" },
];

export default function SubscriptionsPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="max-w-[1600px] mx-auto space-y-10 pb-20">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-4 sm:px-0">
        <div className="space-y-1">
          <p className="text-[10px] font-black uppercase text-teal-600 tracking-[0.2em] mb-1 flex items-center gap-2">
             <Crown className="w-3.5 h-3.5" /> Organization Management
          </p>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Subscriptions & Units</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">Manage your hospital network and SaaS billing plans.</p>
        </div>

        <div className="flex items-center gap-3">
           <button className="px-6 py-3 bg-teal-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-teal-500/20 active:scale-95 flex items-center gap-2">
              <Plus className="w-4 h-4" /> Register New Unit
           </button>
        </div>
      </div>

      {/* ACTIVE PLAN CARD */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Plan Overview */}
        <div className="lg:col-span-4">
           <div className="bg-slate-900 rounded-[3rem] p-10 text-white space-y-10 shadow-2xl relative overflow-hidden group h-full">
              <div className="absolute top-0 right-0 w-48 h-48 bg-teal-500/20 blur-[80px]" />
              
              <div className="space-y-2">
                 <span className="px-3 py-1 bg-teal-500 text-[10px] font-black uppercase tracking-widest rounded-lg">Active Plan</span>
                 <h2 className="text-4xl font-black tracking-tighter">Enterprise Elite</h2>
                 <p className="text-white/40 text-xs font-medium uppercase tracking-widest">Renewal: Dec 12, 2026</p>
              </div>

              <div className="space-y-6">
                 {[
                   { label: "Total Units", current: "03", limit: "Unlimited", icon: Building2 },
                   { label: "Data Storage", current: "1.2 TB", limit: "10 TB", icon: Database },
                   { label: "Staff Members", current: "145", limit: "500", icon: Users },
                 ].map((usage, i) => (
                   <div key={i} className="space-y-2">
                      <div className="flex justify-between items-end">
                         <div className="flex items-center gap-2 text-[10px] font-black text-white/50 uppercase tracking-widest">
                            <usage.icon className="w-3 h-3" /> {usage.label}
                         </div>
                         <span className="text-xs font-black">{usage.current} <span className="text-white/20">/ {usage.limit}</span></span>
                      </div>
                      <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                         <div className="h-full bg-teal-500 rounded-full" style={{ width: '45%' }} />
                      </div>
                   </div>
                 ))}
              </div>

              <button className="w-full py-4 bg-white text-slate-900 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:scale-105 transition-all active:scale-95">
                 Upgrade Organization
              </button>
           </div>
        </div>

        {/* Units Management */}
        <div className="lg:col-span-8 space-y-8">
           <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[3rem] shadow-sm overflow-hidden flex flex-col h-full">
              <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                       <LayoutGrid className="w-5 h-5 text-slate-500" />
                    </div>
                    <div>
                       <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">Linked Establishments</h3>
                       <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Managing 3 hospital units</p>
                    </div>
                 </div>
                 <div className="flex bg-slate-50 dark:bg-slate-800 p-1 rounded-xl">
                    <button className="px-4 py-1.5 bg-white dark:bg-slate-900 text-[9px] font-black uppercase tracking-widest rounded-lg shadow-sm">Grid</button>
                    <button className="px-4 py-1.5 text-slate-400 text-[9px] font-black uppercase tracking-widest rounded-lg">List</button>
                 </div>
              </div>

              <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                 {hospitalUnits.map((unit) => (
                   <motion.div 
                    key={unit.id}
                    whileHover={{ scale: 1.02 }}
                    className="p-6 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] space-y-6 group cursor-pointer"
                   >
                      <div className="flex justify-between items-start">
                         <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-900 flex items-center justify-center border border-slate-100 dark:border-slate-800 shadow-sm transition-transform group-hover:rotate-12">
                            <Building2 className="w-6 h-6 text-teal-500" />
                         </div>
                         <span className={cn(
                           "text-[8px] font-black uppercase tracking-[0.15em] px-3 py-1 rounded-full border",
                           unit.status === "Active" ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-amber-50 text-amber-600 border-amber-100"
                         )}>
                           {unit.status}
                         </span>
                      </div>

                      <div className="space-y-1">
                         <h4 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">{unit.name}</h4>
                         <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{unit.city} — {unit.plan} Plan</p>
                      </div>

                      <div className="pt-4 border-t border-slate-200/50 dark:border-slate-700/50 flex justify-between items-center">
                         <div className="flex items-center gap-2">
                            <Users className="w-3.5 h-3.5 text-slate-400" />
                            <span className="text-[10px] font-black text-slate-600 dark:text-slate-300">{unit.patients} Patients</span>
                         </div>
                         <button className="p-2 bg-white dark:bg-slate-900 rounded-xl text-slate-400 hover:text-teal-600 shadow-sm">
                            <Settings className="w-4 h-4" />
                         </button>
                      </div>
                   </motion.div>
                 ))}
                 
                 <button className="p-6 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[2.5rem] flex flex-col items-center justify-center gap-3 text-slate-400 hover:border-teal-500/50 hover:text-teal-600 transition-all group">
                    <div className="w-12 h-12 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                       <Plus className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest">Register New Unit</span>
                 </button>
              </div>
           </div>
        </div>
      </div>

      {/* BILLING HISTORY (SaaS) */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[3rem] p-8 space-y-8">
         <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest flex items-center gap-3">
               <History className="w-5 h-5 text-indigo-500" /> Organization Billing History
            </h3>
            <button className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline">Download Annual Report</button>
         </div>

         <div className="space-y-4">
            {[
              { id: "HOP-9012", date: "May 01, 2026", amount: "$1,450.00", status: "Paid" },
              { id: "HOP-8950", date: "Apr 01, 2026", amount: "$1,450.00", status: "Paid" },
              { id: "HOP-8821", date: "Mar 01, 2026", amount: "$1,450.00", status: "Paid" },
            ].map((inv) => (
              <div key={inv.id} className="p-5 bg-slate-50 dark:bg-slate-800 rounded-[1.5rem] flex items-center justify-between group hover:bg-white dark:hover:bg-slate-800 border border-transparent hover:border-slate-100 dark:hover:border-slate-700 transition-all">
                 <div className="flex items-center gap-6">
                    <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 flex items-center justify-center shadow-sm">
                       <CreditCard className="w-5 h-5 text-slate-400" />
                    </div>
                    <div>
                       <p className="text-xs font-black text-slate-900 dark:text-white uppercase">{inv.id}</p>
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{inv.date}</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-10">
                    <span className="text-sm font-black text-slate-900 dark:text-white">{inv.amount}</span>
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[9px] font-black uppercase tracking-widest rounded-lg border border-emerald-100">{inv.status}</span>
                    <button className="p-2 text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">
                       <ArrowUpRight className="w-5 h-5" />
                    </button>
                 </div>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
}
