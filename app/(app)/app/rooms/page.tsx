"use client";

import { useState } from "react";
import BedsManagement from "@/components/dashboard/beds-management";
import { 
  Plus, 
  Search, 
  Filter, 
  LayoutGrid, 
  List as ListIcon,
  MapPin,
  ArrowRightLeft,
  LogOut,
  Clock,
  Bed as BedIcon,
  Activity
} from "lucide-react";
import { cn } from "@/lib/utils";
import AdmissionModal from "@/components/modals/admission-modal";
import DischargeModal from "@/components/modals/discharge-modal";

export default function RoomsPage() {
  const [view, setView] = useState<"visual" | "list">("visual");

  return (
    <div className="max-w-[1600px] mx-auto space-y-10 pb-20">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-4 sm:px-0">
        <div className="space-y-1">
          <p className="text-[10px] font-black uppercase text-teal-600 tracking-[0.2em] mb-1">Hospitalization & Units</p>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Beds & Wards Control</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">Real-time occupancy map and patient room management.</p>
        </div>

        <div className="flex items-center gap-3">
          {/* View Switcher */}
          <div className="flex bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-1 shadow-sm mr-2">
            <button 
              onClick={() => setView("visual")}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all", 
                view === "visual" ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900" : "text-slate-400"
              )}
            >
              <LayoutGrid className="w-4 h-4" /> Visual Map
            </button>
            <button 
              onClick={() => setView("list")}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all", 
                view === "list" ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900" : "text-slate-400"
              )}
            >
              <ListIcon className="w-4 h-4" /> List View
            </button>
          </div>
          
          <AdmissionModal />
        </div>
      </div>

      {/* STATS OVERVIEW */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {[
           { label: "Total Beds", value: "120", sub: "Active", icon: BedIcon, color: "text-teal-600 bg-teal-50 dark:bg-teal-500/10" },
           { label: "Occupancy Rate", value: "84%", sub: "High demand", icon: Clock, color: "text-amber-600 bg-amber-50 dark:bg-amber-500/10" },
           { label: "Critical Care", value: "02", sub: "Beds left", icon: Activity, color: "text-rose-600 bg-rose-50 dark:bg-rose-500/10" },
           { label: "Maintenance", value: "05", sub: "Out of order", icon: Filter, color: "text-slate-600 bg-slate-50 dark:bg-slate-500/10" },
         ].map((stat, i) => (
           <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-5">
              <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center", stat.color)}>
                 <stat.icon className="w-6 h-6" />
              </div>
              <div>
                 <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{stat.label}</p>
                 <p className="text-2xl font-black text-slate-900 dark:text-white">{stat.value}</p>
                 <p className="text-[9px] font-bold text-slate-400 uppercase mt-0.5">{stat.sub}</p>
              </div>
           </div>
         ))}
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="bg-white dark:bg-slate-900 rounded-[3.5rem] border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
         {view === "visual" ? (
            <div className="p-2">
               {/* Using the component but it's now the main content */}
               <BedsManagement />
            </div>
         ) : (
            <div className="p-10 text-center space-y-4">
               <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto text-slate-300">
                  <ListIcon className="w-10 h-10" />
               </div>
               <p className="text-sm font-black text-slate-400 uppercase tracking-widest">List View is currently being redesigned</p>
               <button onClick={() => setView("visual")} className="text-xs font-black text-teal-600 uppercase tracking-widest hover:underline">Return to Visual Map</button>
            </div>
         )}
      </div>

      <DischargeModal 
        open={false}
        onOpenChange={() => {}}
        patientName=""
        roomId=""
      />
    </div>
  );
}
