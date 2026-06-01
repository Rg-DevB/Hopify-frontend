"use client";

import { 
  Truck, MapPin, Navigation, 
  PhoneCall, Users, AlertCircle, 
  CheckCircle2, Clock, Map as MapIcon,
  Activity, MoreVertical, Plus
} from "lucide-react";
import { cn } from "@/lib/utils";

const ambulances = [
  { id: "AMB-01", status: "Available", location: "Main Base", crew: ["John Doe", "Sarah Connor"], fuel: 85, model: "Ford Transit High Roof" },
  { id: "AMB-02", status: "On Mission", location: "45th Avenue, West Side", crew: ["Mike Ross", "Harvey Specter"], fuel: 40, model: "Mercedes Sprinter" },
  { id: "AMB-03", status: "Maintenance", location: "Garage", crew: [], fuel: 100, model: "Ford Transit" },
  { id: "AMB-04", status: "Available", location: "East Station", crew: ["Walter White", "Jesse Pinkman"], fuel: 92, model: "GMC Savana" },
];

export default function AmbulanceManagementPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
           <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Ambulance Fleet</h1>
           <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium">Real-time emergency dispatch and vehicle tracking.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:scale-[1.02] transition-all">
           <Plus className="w-4 h-4" /> Add Vehicle
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Fleet List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ambulances.map((amb) => (
              <div key={amb.id} className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm hover:border-teal-500 transition-all group">
                <div className="flex justify-between items-start mb-6">
                  <div className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center",
                    amb.status === "Available" ? "bg-emerald-50 text-emerald-600" : 
                    amb.status === "On Mission" ? "bg-amber-50 text-amber-600" : "bg-slate-50 text-slate-400"
                  )}>
                    <Truck className="w-6 h-6" />
                  </div>
                  <span className={cn(
                    "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest",
                    amb.status === "Available" ? "bg-emerald-50 text-emerald-600" : 
                    amb.status === "On Mission" ? "bg-amber-50 text-amber-600" : "bg-slate-50 text-slate-400"
                  )}>{amb.status}</span>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white">{amb.id}</h3>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{amb.model}</p>
                  </div>

                  <div className="flex items-center gap-2 text-sm font-bold text-slate-600 dark:text-slate-300">
                    <MapPin className="w-4 h-4 text-rose-500" />
                    {amb.location}
                  </div>

                  <div className="flex items-center gap-4 pt-4 border-t border-slate-50 dark:border-slate-800">
                    <div className="flex -space-x-2">
                       {[1, 2].map(i => (
                         <div key={i} className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-white dark:border-slate-900 flex items-center justify-center text-[10px] font-black text-slate-400">
                           {amb.crew[i-1] ? amb.crew[i-1].split(' ').map(n => n[0]).join('') : "?"}
                         </div>
                       ))}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between text-[9px] font-black uppercase text-slate-400 mb-1">
                        <span>Fuel</span>
                        <span>{amb.fuel}%</span>
                      </div>
                      <div className="h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div className={cn(
                          "h-full rounded-full",
                          amb.fuel > 30 ? "bg-emerald-500" : "bg-rose-500"
                        )} style={{ width: `${amb.fuel}%` }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dispatch Console */}
        <div className="space-y-8">
           <div className="bg-slate-900 text-white rounded-[2.5rem] p-8 space-y-8 relative overflow-hidden">
              <Navigation className="w-12 h-12 text-teal-400 absolute -right-2 -top-2 opacity-20" />
              <h3 className="text-lg font-black tracking-tight">Active Dispatch</h3>
              
              <div className="space-y-6">
                 <div className="p-4 bg-white/5 border border-white/10 rounded-2xl space-y-4">
                    <div className="flex items-center justify-between">
                       <span className="text-[10px] font-black uppercase text-teal-400">Call #942</span>
                       <span className="text-[10px] font-black uppercase bg-rose-500 px-2 py-0.5 rounded">High Priority</span>
                    </div>
                    <div>
                       <p className="text-xs font-bold">128 Oak Street, Downtown</p>
                       <p className="text-[10px] opacity-60">Possible cardiac arrest. Dispatch AMB-02.</p>
                    </div>
                    <button className="w-full py-3 bg-white text-slate-900 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-teal-400 transition-all">
                       Contact Crew
                    </button>
                 </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                 <div>
                    <p className="text-[10px] font-black uppercase text-white/40">Response Time</p>
                    <p className="text-xl font-black">7:42 <span className="text-xs font-normal opacity-40">min</span></p>
                 </div>
                 <Activity className="w-8 h-8 text-teal-500 opacity-50" />
              </div>
           </div>

           <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <MapIcon className="w-6 h-6 text-slate-400" />
                <h3 className="text-sm font-black uppercase tracking-tight">Live Map Tracking</h3>
              </div>
              <div className="aspect-square bg-slate-100 dark:bg-slate-800 rounded-[2rem] flex items-center justify-center relative overflow-hidden">
                 <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ccc_1px,transparent_1px)] [background-size:20px_20px]" />
                 <div className="relative text-center">
                    <MapPin className="w-8 h-8 text-rose-500 animate-bounce mx-auto" />
                    <p className="text-[10px] font-black text-slate-400 uppercase mt-2">Connecting to GPS...</p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
