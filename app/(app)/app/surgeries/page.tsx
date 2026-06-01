"use client";

import { 
  Scissors, Calendar, Clock, MapPin, 
  User, Activity, FileText, CheckCircle2,
  Clock3, ClipboardList, AlertCircle, Plus,
  FlaskConical, Stethoscope
} from "lucide-react";
import { cn } from "@/lib/utils";

const surgeries = [
  { 
    id: "SUR-1024", 
    patient: "Robert Downey", 
    procedure: "Open Heart Bypass", 
    surgeon: "Dr. Stephen Strange", 
    time: "08:00 AM", 
    room: "OR-1", 
    status: "In Progress",
    urgency: "High"
  },
  { 
    id: "SUR-1025", 
    patient: "Tony Stark", 
    procedure: "Appendectomy", 
    surgeon: "Dr. Bruce Banner", 
    time: "11:30 AM", 
    room: "OR-3", 
    status: "Scheduled",
    urgency: "Normal"
  },
  { 
    id: "SUR-1026", 
    patient: "Wanda Maximoff", 
    procedure: "Knee Replacement", 
    surgeon: "Dr. Natasha Romanoff", 
    time: "02:00 PM", 
    room: "OR-2", 
    status: "Scheduled",
    urgency: "Normal"
  }
];

export default function SurgeryManagementPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
           <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Surgery Schedule</h1>
           <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium">Real-time operating room management and surgeon coordination.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:scale-[1.02] transition-all">
           <Plus className="w-4 h-4" /> Schedule Surgery
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
         {[
           { label: "Active Surgeries", value: 2, icon: Activity, color: "text-rose-500", bg: "bg-rose-50" },
           { label: "Total Today", value: 8, icon: Calendar, color: "text-teal-500", bg: "bg-teal-50" },
           { label: "Rooms Available", value: "3/5", icon: MapPin, color: "text-indigo-500", bg: "bg-indigo-50" },
           { label: "Surgeons On-Call", value: 12, icon: Stethoscope, color: "text-amber-500", bg: "bg-amber-50" },
         ].map((stat, i) => (
           <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-200 dark:border-slate-800 flex items-center gap-4">
              <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center", stat.bg)}>
                 <stat.icon className={cn("w-6 h-6", stat.color)} />
              </div>
              <div>
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                 <p className="text-xl font-black text-slate-900 dark:text-white">{stat.value}</p>
              </div>
           </div>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Surgery List */}
         <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
               <div className="p-8 border-b border-slate-50 dark:border-slate-800">
                  <h3 className="font-black text-lg text-slate-900 dark:text-white uppercase tracking-tight">Today&apos;s Operations</h3>
               </div>
               <div className="divide-y divide-slate-50 dark:divide-slate-800">
                  {surgeries.map((sur) => (
                    <div key={sur.id} className="p-8 flex items-center justify-between group hover:bg-slate-50/50 transition-all">
                       <div className="flex items-center gap-6">
                          <div className={cn(
                            "w-16 h-16 rounded-3xl flex flex-col items-center justify-center",
                            sur.status === "In Progress" ? "bg-rose-500 text-white animate-pulse" : "bg-slate-100 dark:bg-slate-800 text-slate-400"
                          )}>
                             <Scissors className="w-6 h-6" />
                          </div>
                          <div>
                             <div className="flex items-center gap-2">
                                <h3 className="font-black text-slate-900 dark:text-white">{sur.procedure}</h3>
                                <span className={cn(
                                  "px-2 py-0.5 rounded-full text-[8px] font-black uppercase",
                                  sur.urgency === "High" ? "bg-rose-100 text-rose-600" : "bg-slate-100 text-slate-500"
                                )}>{sur.urgency}</span>
                             </div>
                             <p className="text-xs font-bold text-slate-500 flex items-center gap-2 mt-1">
                                <User className="w-3.5 h-3.5" /> Patient: {sur.patient} • <Stethoscope className="w-3.5 h-3.5 ml-2" /> Surgeon: {sur.surgeon}
                             </p>
                          </div>
                       </div>

                       <div className="flex items-center gap-8">
                          <div className="text-right">
                             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Room & Time</p>
                             <p className="text-sm font-bold text-slate-900 dark:text-white">{sur.room} • {sur.time}</p>
                          </div>
                          <div className={cn(
                            "px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest",
                            sur.status === "In Progress" ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-slate-100 text-slate-500"
                          )}>
                            {sur.status}
                          </div>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
         </div>

         {/* Right: Checklist & Resources */}
         <div className="space-y-8">
            <div className="bg-slate-900 text-white rounded-[2.5rem] p-8 space-y-6">
               <h3 className="text-lg font-black tracking-tight">Pre-Op Checklist</h3>
               <div className="space-y-4">
                  {[
                    "Anesthesia Clearance",
                    "Consent Forms Signed",
                    "Pre-op Blood Work",
                    "Surgical Site Marked",
                    "IV Access Established"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                       <div className="w-5 h-5 rounded-md border-2 border-white/20 flex items-center justify-center">
                          {i < 3 && <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />}
                       </div>
                       <span className="text-xs font-medium opacity-80">{item}</span>
                    </div>
                  ))}
               </div>
               <button className="w-full py-4 bg-teal-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-teal-600 transition-all">
                  Sign-Off Checklist
               </button>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
               <div className="flex items-center justify-between">
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">OR Equipment Status</h3>
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
               </div>
               <div className="space-y-4">
                  {[
                    { name: "Anesthesia Machine", status: "Operational" },
                    { name: "C-Arm X-Ray", status: "In Use" },
                    { name: "Pulse Oximeters", status: "Operational" },
                  ].map((eq, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                       <span className="text-xs font-bold">{eq.name}</span>
                       <span className="text-[9px] font-black text-teal-600 uppercase">{eq.status}</span>
                    </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
