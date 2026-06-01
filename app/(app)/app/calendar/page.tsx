import FullCalendarWrapper from "@/components/calendar/full-calendar-wrapper";
import { User, Clock, AlertCircle, Video, UserPlus, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const doctorAvailability = [
  { name: "Dr. Sarah Miller", status: "Available", color: "bg-teal-500", patients: 4 },
  { name: "Dr. James Chen", status: "In Session", color: "bg-amber-500", patients: 12 },
  { name: "Dr. Elena Rodriguez", status: "On Break", color: "bg-slate-400", patients: 0 },
];

const liveQueue = [
  { id: "Q-104", name: "Marc Aubert", time: "10:15 AM", type: "Urgent", color: "text-rose-600" },
  { id: "Q-105", name: "Sophie Laurent", time: "10:30 AM", type: "Routine", color: "text-teal-600" },
  { id: "Q-106", name: "Kevin Durant", time: "10:45 AM", type: "Video", color: "text-indigo-600" },
];

export default function CalendarPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <p className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
            Clinic / Master Schedule
          </p>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Medical Calendar</h1>
        </div>
        
        <div className="flex flex-wrap items-center gap-3 bg-white dark:bg-slate-900 px-5 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          {[
            { label: "Consultation", color: "bg-teal-500" },
            { label: "Urgent", color: "bg-rose-500" },
            { label: "Video Call", color: "bg-indigo-500" },
            { label: "Completed", color: "bg-slate-300" },
          ].map(tag => (
            <div key={tag.label} className="flex items-center gap-2">
              <span className={cn("w-2 h-2 rounded-full", tag.color)}></span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-black uppercase tracking-widest">{tag.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
         {/* SIDEBAR: Availability & Queue */}
         <div className="space-y-6">
            {/* Availability */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
               <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 flex items-center justify-between">
                  Availability <User className="w-4 h-4" />
               </h3>
               <div className="space-y-4">
                  {doctorAvailability.map(doc => (
                    <div key={doc.name} className="flex items-center justify-between group cursor-pointer">
                       <div className="flex items-center gap-3">
                          <div className="relative">
                             <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-black text-xs">
                                {doc.name.split(' ').map(n => n[0]).join('')}
                             </div>
                             <span className={cn("absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white dark:border-slate-900", doc.color)} />
                          </div>
                          <div>
                             <p className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-teal-600 transition-colors">{doc.name}</p>
                             <p className="text-[10px] text-slate-500 font-medium">{doc.status}</p>
                          </div>
                       </div>
                       <span className="text-[10px] font-black text-slate-400">{doc.patients} pts</span>
                    </div>
                  ))}
               </div>
               <button className="w-full py-2.5 bg-slate-50 dark:bg-slate-800/50 hover:bg-teal-50 dark:hover:bg-teal-500/10 text-slate-600 dark:text-slate-400 hover:text-teal-600 rounded-xl text-[10px] font-black uppercase tracking-widest border border-slate-100 dark:border-slate-800 transition-all">
                  Manage Shifts
               </button>
            </div>

            {/* Queue Monitor */}
            <div className="bg-slate-900 dark:bg-slate-950 p-6 rounded-[2rem] border border-white/5 shadow-xl space-y-6">
               <div className="flex items-center justify-between">
                  <h3 className="text-sm font-black uppercase tracking-widest text-white/50">Live Queue</h3>
                  <div className="px-2 py-0.5 bg-teal-500/10 border border-teal-500/20 rounded-full flex items-center gap-1.5">
                     <span className="w-1 h-1 bg-teal-500 rounded-full animate-pulse" />
                     <span className="text-[8px] font-black text-teal-500 uppercase tracking-widest">Active</span>
                  </div>
               </div>
               <div className="space-y-4">
                  {liveQueue.map(item => (
                    <div key={item.id} className="p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors">
                       <div className="flex items-center justify-between mb-1">
                          <p className="text-[10px] font-bold text-white">{item.name}</p>
                          <span className="text-[9px] font-black text-white/30 uppercase">{item.time}</span>
                       </div>
                       <div className="flex items-center justify-between">
                          <p className="text-[9px] text-slate-400 font-medium">{item.id}</p>
                          <span className={cn("text-[8px] font-black uppercase tracking-widest px-2 py-0.5 bg-white/5 rounded-full", item.color)}>
                             {item.type}
                          </span>
                       </div>
                    </div>
                  ))}
               </div>
               <button className="w-full py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl text-[10px] font-black uppercase tracking-widest border border-white/10 transition-all flex items-center justify-center gap-2">
                  <UserPlus className="w-4 h-4" /> Add to Queue
               </button>
            </div>
         </div>

         {/* MAIN CALENDAR */}
         <div className="lg:col-span-3">
            <FullCalendarWrapper />
         </div>
      </div>
    </div>
  );
}
