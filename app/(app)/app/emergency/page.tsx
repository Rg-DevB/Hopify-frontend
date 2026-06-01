"use client";

import { useState } from "react";
import { 
  AlertTriangle, Clock, MapPin, 
  Activity, Zap, Siren, Users, 
  ChevronRight, ArrowUpCircle, Filter,
  ShieldAlert, MoreVertical
} from "lucide-react";
import { cn } from "@/lib/utils";

const emergencyPatients = [
  { id: "ER-001", name: "Marc Dupont", condition: "Myocardial Infarction", level: "Critical", code: "Red", arrival: "2m ago", bed: "Box 1" },
  { id: "ER-002", name: "Sophie Laurent", condition: "Open Fracture", level: "Urgent", code: "Orange", arrival: "15m ago", bed: "Box 5" },
  { id: "ER-003", name: "Jean Durand", condition: "Acute Appendicitis", level: "Standard", code: "Yellow", arrival: "45m ago", bed: "Waiting" },
  { id: "ER-004", name: "Marie Curie", condition: "Severe Dehydration", level: "Urgent", code: "Orange", arrival: "20m ago", bed: "Box 2" },
];

export default function EmergencyTriagePage() {
  return (
    <div className="space-y-8">
      {/* Status Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Critical (Red)", count: 2, color: "bg-rose-500" },
          { label: "Urgent (Orange)", count: 5, color: "bg-orange-500" },
          { label: "Stable (Yellow)", count: 8, color: "bg-amber-500" },
          { label: "Minor (Green)", count: 12, color: "bg-emerald-500" },
        ].map((status, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={cn("w-3 h-3 rounded-full animate-pulse", status.color)} />
              <span className="text-xs font-black text-slate-500 uppercase tracking-wider">{status.label}</span>
            </div>
            <span className="text-xl font-black">{status.count}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Triage Table */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-slate-50 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Siren className="w-6 h-6 text-rose-600" />
                <h2 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Active Triage</h2>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-600">
                <Filter className="w-4 h-4" /> Filter By Level
              </button>
            </div>

            <div className="divide-y divide-slate-50 dark:divide-slate-800">
              {emergencyPatients.map((p) => (
                <div key={p.id} className="p-8 flex items-center justify-between group hover:bg-slate-50/50 transition-all">
                  <div className="flex items-center gap-6">
                    <div className={cn(
                      "w-16 h-16 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg",
                      p.code === "Red" ? "bg-rose-500 shadow-rose-500/20" : 
                      p.code === "Orange" ? "bg-orange-500 shadow-orange-500/20" : "bg-amber-500 shadow-amber-500/20"
                    )}>
                      {p.code[0]}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-black text-slate-900 dark:text-white">{p.name}</h3>
                        <span className="text-[10px] text-slate-400 font-bold">#{p.id}</span>
                      </div>
                      <p className="text-xs font-bold text-slate-500 flex items-center gap-2">
                        <Activity className="w-3.5 h-3.5" />
                        {p.condition}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-12">
                    <div className="text-right hidden sm:block">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Arrival</p>
                      <p className="text-sm font-bold text-slate-900 dark:text-white flex items-center justify-end gap-1">
                        <Clock className="w-3.5 h-3.5" /> {p.arrival}
                      </p>
                    </div>
                    <div className="text-right hidden sm:block">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Location</p>
                      <p className="text-sm font-bold text-teal-600 flex items-center justify-end gap-1">
                        <MapPin className="w-3.5 h-3.5" /> {p.bed}
                      </p>
                    </div>
                    <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar / Quick Stats */}
        <div className="space-y-8">
           <div className="bg-slate-900 text-white rounded-[2.5rem] p-8 space-y-6 relative overflow-hidden">
              <Zap className="w-12 h-12 text-amber-400 absolute -right-2 -top-2 opacity-20 rotate-12" />
              <h3 className="text-lg font-black tracking-tight">System Alert</h3>
              <div className="p-4 bg-white/5 border border-white/10 rounded-2xl space-y-2">
                 <p className="text-[10px] font-black uppercase text-amber-400">Resource Warning</p>
                 <p className="text-xs opacity-70">ER occupancy at 92%. Divert non-critical patients to General Medicine.</p>
              </div>
              <button className="w-full py-4 bg-white text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-100 transition-all">
                Update Capacity
              </button>
           </div>

           <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Available Staff</h3>
              <div className="space-y-4">
                 {[
                   { name: "Dr. K. Aris", role: "ER Chief", status: "In Surgery" },
                   { name: "Nurse L. Moore", role: "Triage Lead", status: "Active" },
                   { name: "Dr. M. Sano", role: "Trauma Surgeon", status: "Active" },
                 ].map((staff, i) => (
                   <div key={i} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                      <div>
                        <p className="text-xs font-black">{staff.name}</p>
                        <p className="text-[10px] text-slate-400 font-bold">{staff.role}</p>
                      </div>
                      <span className={cn(
                        "w-2 h-2 rounded-full",
                        staff.status === "Active" ? "bg-emerald-500" : "bg-amber-500"
                      )} />
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
