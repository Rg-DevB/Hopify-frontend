"use client";

import { useState } from "react";
import { 
  Clock, 
  User, 
  MoreHorizontal, 
  CheckCircle2, 
  Timer, 
  MapPin,
  Calendar,
  AlertCircle,
  ChevronRight,
  Stethoscope,
  List,
  LayoutGrid,
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const sampleAppointments = [
  { id: 1, patient: "Sarah Miller", time: "09:30 AM", doctor: "Dr. Tajuddin", type: "Cardiology", room: "S-102", status: "Arrived", waitTime: 12 },
  { id: 2, patient: "John Davis", time: "10:00 AM", doctor: "Dr. Sarah", type: "General Consult", room: "S-105", status: "Confirmed", waitTime: 0 },
  { id: 3, patient: "Emily Wilson", time: "10:15 AM", doctor: "Dr. Tajuddin", type: "Lab Test", room: "L-01", status: "In Progress", waitTime: 5 },
  { id: 4, patient: "Michael Brown", time: "10:30 AM", doctor: "Dr. Robert", type: "Surgery", room: "Op-A", status: "Delayed", waitTime: 35 },
  { id: 5, patient: "Linda G.", time: "11:15 AM", doctor: "Dr. Sarah", type: "Pediatrics", room: "P-04", status: "Scheduled", waitTime: 0 },
];

export default function AppointmentsZone() {
  const [view, setView] = useState<"list" | "timeline">("list");
  const [appointments] = useState(sampleAppointments);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Arrived": return "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 border-emerald-100 dark:border-emerald-500/20";
      case "In Progress": return "bg-teal-50 text-teal-600 dark:bg-teal-500/10 dark:text-teal-400 border-teal-100 dark:border-teal-500/20";
      case "Confirmed": return "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400 border-blue-100 dark:border-blue-500/20";
      case "Delayed": return "bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400 border-rose-100 dark:border-rose-500/20";
      default: return "bg-slate-50 text-slate-600 dark:bg-slate-500/10 dark:text-slate-400 border-slate-100 dark:border-slate-800";
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] shadow-sm overflow-hidden flex flex-col h-full relative">
      <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 blur-[60px] pointer-events-none" />

      {/* Header */}
      <div className="p-6 border-b border-slate-100 dark:border-slate-800 space-y-6 bg-slate-50/50 dark:bg-slate-900/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm border border-slate-200 dark:border-slate-700">
               <Zap className="w-5 h-5 text-teal-500 animate-pulse" />
            </div>
            <div>
              <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">Live Patient Flow</h3>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5 flex items-center gap-1.5">
                 <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" /> Real-time monitoring
              </p>
            </div>
          </div>
          
          <div className="flex bg-white dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 shadow-inner">
             <button 
               onClick={() => setView("list")}
               className={cn("p-1.5 rounded-lg transition-all", view === "list" ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-lg" : "text-slate-400")}
             >
                <List className="w-4 h-4" />
             </button>
             <button 
               onClick={() => setView("timeline")}
               className={cn("p-1.5 rounded-lg transition-all", view === "timeline" ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-lg" : "text-slate-400")}
             >
                <LayoutGrid className="w-4 h-4" />
             </button>
          </div>
        </div>

        <div className="space-y-2">
           <div className="flex justify-between text-[8px] font-black uppercase tracking-[0.2em] text-slate-400">
              <span>Today's Progress</span>
              <span className="text-teal-600">65% Completed</span>
           </div>
           <div className="h-1 w-full bg-white dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full w-[65%] bg-teal-500 rounded-full shadow-[0_0_10px_rgba(20,184,166,0.5)]" />
           </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto max-h-[600px] scrollbar-hide">
        <AnimatePresence mode="wait">
          {view === "list" ? (
            <motion.div 
              key="list-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="divide-y divide-slate-50 dark:divide-slate-800"
            >
              {appointments.map((apt, idx) => (
                <motion.div 
                  key={apt.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="p-5 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-all group flex items-center justify-between"
                >
                  <div className="flex items-center gap-5">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex flex-col items-center justify-center border border-slate-200 dark:border-slate-700 overflow-hidden">
                        <span className="text-[10px] font-black text-slate-900 dark:text-white leading-none uppercase">{apt.time.split(' ')[0]}</span>
                        <span className="text-[7px] font-bold text-slate-400 mt-1 uppercase">{apt.time.split(' ')[1]}</span>
                      </div>
                      {apt.status === "Arrived" && <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900 shadow-sm" />}
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-black text-slate-900 dark:text-white group-hover:text-teal-600 transition-colors">{apt.patient}</p>
                        <span className={cn("text-[8px] px-2 py-0.5 rounded-lg border font-black uppercase tracking-[0.1em]", getStatusColor(apt.status))}>
                          {apt.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                        <span className="flex items-center gap-1.5"><Stethoscope className="w-3 h-3 text-teal-500" /> {apt.doctor}</span>
                        <span className="flex items-center gap-1.5 opacity-60"><MapPin className="w-3 h-3" /> {apt.room}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    {apt.waitTime > 0 && (
                      <div className={cn(
                        "flex flex-col items-end px-3 py-1.5 rounded-xl border",
                        apt.waitTime > 30 
                          ? "bg-rose-50 dark:bg-rose-500/10 border-rose-100 dark:border-rose-500/20 text-rose-600 animate-pulse" 
                          : "bg-slate-50 dark:bg-slate-800 border-slate-100 dark:border-slate-700 text-slate-500"
                      )}>
                         <span className="text-[8px] font-black uppercase tracking-tighter">Wait Time</span>
                         <span className="text-xs font-black">{apt.waitTime}m</span>
                      </div>
                    )}
                    <button className="p-2 text-slate-400 hover:text-teal-500 transition-all">
                       <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              key="timeline-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-6 space-y-8"
            >
              {[ "Dr. Tajuddin", "Dr. Sarah", "Dr. Robert" ].map((doc, i) => (
                <div key={doc} className="space-y-3">
                   <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-widest">{doc}</span>
                      <span className="text-[8px] font-bold text-slate-400">8 AM — 6 PM</span>
                   </div>
                   <div className="h-8 w-full bg-slate-50 dark:bg-slate-800 rounded-xl relative overflow-hidden border border-slate-100 dark:border-slate-700 shadow-inner">
                      <div className="absolute left-[10%] w-[15%] h-full bg-teal-500/20 border-x border-teal-500/40" />
                      <div className="absolute left-[30%] w-[10%] h-full bg-indigo-500/20 border-x border-indigo-500/40" />
                      <div className="absolute left-[50%] w-[20%] h-full bg-emerald-500/40 border-x border-emerald-500 flex items-center justify-center text-[7px] font-black text-emerald-700">LIVE</div>
                      <div className="absolute left-[75%] w-[15%] h-full bg-slate-400/10 border-x border-slate-400/20" />
                   </div>
                </div>
              ))}
              <div className="p-4 bg-teal-50/50 dark:bg-teal-500/5 rounded-2xl border border-teal-500/20 text-center">
                 <p className="text-[9px] font-bold text-teal-600 uppercase tracking-widest">Full agenda view available in Calendar module</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="p-5 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
         <div className="flex gap-4">
            <div className="text-center">
               <p className="text-sm font-black text-slate-900 dark:text-white">12</p>
               <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Completed</p>
            </div>
            <div className="w-px h-8 bg-slate-100 dark:bg-slate-800" />
            <div className="text-center">
               <p className="text-sm font-black text-slate-900 dark:text-white">08</p>
               <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Remaining</p>
            </div>
         </div>
         <button className="px-6 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-black text-[9px] uppercase tracking-widest hover:scale-105 transition-all shadow-lg active:scale-95">
            Open Agenda
         </button>
      </div>
    </div>
  );
}
