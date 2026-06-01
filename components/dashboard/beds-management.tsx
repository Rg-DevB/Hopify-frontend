"use client";

import { useState } from "react";
import { 
  Bed, 
  Search, 
  Filter, 
  MoreVertical, 
  CheckCircle2, 
  AlertCircle,
  ArrowUpRight,
  Plus,
  Activity,
  Heart
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const departments = [
  { id: "icu", name: "ICU (Critical Care)", capacity: 12, occupied: 10, color: "text-rose-500 bg-rose-500/10" },
  { id: "surgery", name: "Surgery Unit", capacity: 20, occupied: 14, color: "text-teal-500 bg-teal-500/10" },
  { id: "general", name: "General Medicine", capacity: 30, occupied: 18, color: "text-indigo-500 bg-indigo-500/10" },
  { id: "maternity", name: "Maternity Ward", capacity: 15, occupied: 12, color: "text-purple-500 bg-purple-500/10" },
];

const generateBeds = (deptId: string, count: number, occupiedCount: number) => {
  return Array.from({ length: count }).map((_, i) => ({
    id: `${deptId}-b${i + 1}`,
    name: `Bed ${i + 1}`,
    status: i < occupiedCount ? "occupied" : i < occupiedCount + 2 ? "reserved" : "available",
    patient: i < occupiedCount ? "Patient Anonymous" : null,
  }));
};

export default function BedsManagement() {
  const [selectedDept, setSelectedDept] = useState(departments[0]);
  const beds = generateBeds(selectedDept.id, selectedDept.capacity, selectedDept.occupied);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[3rem] shadow-sm overflow-hidden flex flex-col h-full">
      {/* Header */}
      <div className="p-8 border-b border-slate-100 dark:border-slate-800 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-500 flex items-center justify-center text-white shadow-lg shadow-teal-500/20">
               <Bed className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">Beds Management</h3>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Global Capacity: 84% — 54/77 occupied</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
             <button className="p-2.5 bg-slate-50 dark:bg-slate-800 text-slate-400 rounded-xl hover:text-teal-500 transition-colors">
                <Search className="w-5 h-5" />
             </button>
             <button className="p-2.5 bg-slate-50 dark:bg-slate-800 text-slate-400 rounded-xl hover:text-teal-500 transition-colors">
                <Filter className="w-5 h-5" />
             </button>
          </div>
        </div>

        {/* Dept Selector Pills */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {departments.map((dept) => (
            <button
              key={dept.id}
              onClick={() => setSelectedDept(dept)}
              className={cn(
                "px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap border-2",
                selectedDept.id === dept.id 
                  ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white shadow-lg" 
                  : "bg-white dark:bg-slate-800 text-slate-500 border-slate-100 dark:border-slate-800 hover:border-teal-500/30"
              )}
            >
              {dept.name}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 p-8 overflow-y-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main Grid Map */}
          <div className="lg:col-span-8">
            <div className="flex items-center justify-between mb-6">
               <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Bed Map: {selectedDept.name}</h4>
               <div className="flex gap-4">
                  <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                     <div className="w-2 h-2 rounded-full bg-emerald-500" /> Free
                  </div>
                  <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                     <div className="w-2 h-2 rounded-full bg-rose-500" /> Occupied
                  </div>
                  <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                     <div className="w-2 h-2 rounded-full bg-amber-500" /> Reserved
                  </div>
               </div>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-6 xl:grid-cols-8 gap-4">
              <AnimatePresence mode="wait">
                {beds.map((bed, i) => (
                  <motion.div
                    key={bed.id}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: i * 0.02 }}
                    className={cn(
                      "aspect-square rounded-2xl border-2 flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-all hover:scale-105 active:scale-95 group relative",
                      bed.status === "occupied" 
                        ? "bg-rose-50/50 dark:bg-rose-500/5 border-rose-100 dark:border-rose-500/20 shadow-inner" 
                        : bed.status === "reserved"
                        ? "bg-amber-50/50 dark:bg-amber-500/5 border-amber-100 dark:border-amber-500/20 border-dashed"
                        : "bg-emerald-50/50 dark:bg-emerald-500/5 border-emerald-100 dark:border-emerald-500/20 hover:border-emerald-500/50"
                    )}
                  >
                    <Bed className={cn(
                      "w-5 h-5",
                      bed.status === "occupied" ? "text-rose-500" : bed.status === "reserved" ? "text-amber-500" : "text-emerald-500"
                    )} />
                    <span className="text-[8px] font-black uppercase tracking-tighter text-slate-500">{bed.name}</span>
                    
                    {/* Tooltip on hover */}
                    <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[8px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none z-10 whitespace-nowrap">
                       {bed.status === "occupied" ? "Patient: " + bed.patient : bed.status === "reserved" ? "ETA 02:00 PM" : "Bed Available"}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              <button className="aspect-square rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-300 hover:text-teal-500 hover:border-teal-500 transition-all">
                <Plus className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Right Panel: Service Stats */}
          <div className="lg:col-span-4 space-y-8">
             <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-800">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Occupancy Rate by Ward</h4>
                <div className="space-y-6">
                   <div className="space-y-2">
                      <div className="flex justify-between text-xs font-black text-slate-900 dark:text-white uppercase tracking-tighter">
                         <span>ICU</span>
                         <span className="text-rose-500">92%</span>
                      </div>
                      <div className="h-1.5 w-full bg-white dark:bg-slate-900 rounded-full overflow-hidden">
                         <div className="h-full w-[92%] bg-rose-500 rounded-full" />
                      </div>
                   </div>
                   <div className="space-y-2">
                      <div className="flex justify-between text-xs font-black text-slate-900 dark:text-white uppercase tracking-tighter">
                         <span>Surgery</span>
                         <span className="text-teal-500">70%</span>
                      </div>
                      <div className="h-1.5 w-full bg-white dark:bg-slate-900 rounded-full overflow-hidden">
                         <div className="h-full w-[70%] bg-teal-500 rounded-full" />
                      </div>
                   </div>
                   <div className="space-y-2">
                      <div className="flex justify-between text-xs font-black text-slate-900 dark:text-white uppercase tracking-tighter">
                         <span>Maternity</span>
                         <span className="text-amber-500">80%</span>
                      </div>
                      <div className="h-1.5 w-full bg-white dark:bg-slate-900 rounded-full overflow-hidden">
                         <div className="h-full w-[80%] bg-amber-500 rounded-full" />
                      </div>
                   </div>
                </div>
             </div>

             <div className="p-6 border-2 border-rose-500/20 rounded-3xl bg-rose-500/[0.02] space-y-4">
                <div className="flex items-center gap-3">
                   <AlertCircle className="w-5 h-5 text-rose-500 animate-pulse" />
                   <h4 className="text-xs font-black text-rose-600 uppercase tracking-widest leading-none">Critical Capacity</h4>
                </div>
                <p className="text-[10px] font-bold text-slate-500 leading-relaxed uppercase">**ICU Ward** has reached 92%. Please redirect new admissions to Surgery A ward.</p>
                <button className="flex items-center gap-2 text-[9px] font-black text-rose-600 uppercase tracking-widest hover:underline">
                   View alternatives <ArrowUpRight className="w-3 h-3" />
                </button>
             </div>

             <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-teal-50 dark:bg-teal-500/5 rounded-2xl border border-teal-500/20">
                   <Activity className="w-4 h-4 text-teal-600 mb-2" />
                   <p className="text-lg font-black text-teal-900 dark:text-white">08</p>
                   <p className="text-[8px] font-black text-teal-600 uppercase">Pending Discharges</p>
                </div>
                <div className="p-4 bg-indigo-50 dark:bg-indigo-500/5 rounded-2xl border border-indigo-500/20">
                   <Heart className="w-4 h-4 text-indigo-600 mb-2" />
                   <p className="text-lg font-black text-indigo-900 dark:text-white">12</p>
                   <p className="text-[8px] font-black text-indigo-600 uppercase">Planned Admissions</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
