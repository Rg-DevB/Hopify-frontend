"use client";

import { useState } from "react";
import { 
  Users, Calendar, Clock, DollarSign, Briefcase, 
  Search, Filter, Plus, MoreVertical, CheckCircle2, 
  XCircle, UserPlus, FileText, ArrowUpRight,
  UserCheck, Plane, Building2, Wallet
} from "lucide-react";
import { cn } from "@/lib/utils";

const employees = [
  { id: "EMP-101", name: "Dr. Sarah Miller", role: "Chief Surgeon", dept: "Surgery", status: "Active", salary: "$12,500", shift: "08:00 - 16:00", attendance: "98%" },
  { id: "EMP-102", name: "Nurse Jessica White", role: "Head Nurse", dept: "Emergency", status: "On Leave", salary: "$5,200", shift: "20:00 - 04:00", attendance: "94%" },
  { id: "EMP-103", name: "Marc Aubert", role: "Admin Director", dept: "Administration", status: "Active", salary: "$8,000", shift: "09:00 - 17:00", attendance: "100%" },
  { id: "EMP-104", name: "Dr. Robert Chen", role: "Pediatrician", dept: "Pediatrics", status: "Active", salary: "$10,500", shift: "08:00 - 16:00", attendance: "92%" },
];

const leaveRequests = [
  { id: 1, name: "Nurse Jessica White", type: "Annual Leave", duration: "5 Days", status: "Approved", date: "May 12 - May 17" },
  { id: 2, name: "Dr. Robert Chen", type: "Sick Leave", duration: "2 Days", status: "Pending", date: "May 15 - May 16" },
];

export default function HRPage() {
  const [activeTab, setActiveTab] = useState("Directory");

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
           <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-1">Human Resources / Management</p>
           <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Staff & Operations</h1>
           <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium italic">Empowering your clinical team with smart HR logistics.</p>
        </div>
        
        <div className="flex items-center gap-3">
           <button className="flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-xl shadow-teal-500/20 hover:scale-105 transition-all">
              <UserPlus className="w-4 h-4" /> Recruit Staff
           </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-1 shadow-sm w-fit">
        {["Directory", "Schedules", "Payroll", "Leaves"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-6 py-2.5 rounded-xl text-xs font-black transition-all",
              activeTab === tab ? "bg-slate-900 text-white shadow-lg" : "text-slate-500 hover:text-slate-700"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
         {/* LEFT: Stats & Summary (4 cols) */}
         <div className="lg:col-span-4 space-y-8">
            <div className="grid grid-cols-2 gap-4">
               <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                  <div className="w-10 h-10 bg-teal-50 dark:bg-teal-500/10 rounded-xl flex items-center justify-center text-teal-600">
                     <Users className="w-5 h-5" />
                  </div>
                  <div>
                     <h3 className="text-2xl font-black">124</h3>
                     <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Total Staff</p>
                  </div>
               </div>
               <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                  <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-600">
                     <Clock className="w-5 h-5" />
                  </div>
                  <div>
                     <h3 className="text-2xl font-black">94%</h3>
                     <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Attendance</p>
                  </div>
               </div>
            </div>

            <div className="bg-slate-900 dark:bg-slate-950 p-8 rounded-[2.5rem] text-white shadow-xl space-y-6">
               <div className="flex items-center justify-between">
                  <h3 className="text-sm font-black uppercase tracking-widest text-white/50">Payroll Summary</h3>
                  <Wallet className="w-5 h-5 text-teal-400" />
               </div>
               <div className="space-y-4">
                  <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex justify-between items-center">
                     <span className="text-xs font-medium opacity-60">Next Payout</span>
                     <span className="text-sm font-black">May 28, 2026</span>
                  </div>
                  <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex justify-between items-center">
                     <span className="text-xs font-medium opacity-60">Total Budget</span>
                     <span className="text-sm font-black">$428,500</span>
                  </div>
               </div>
               <button className="w-full py-4 bg-teal-500 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-teal-600 transition-all">Process Payroll</button>
            </div>

            {/* Leave Requests Mini list */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
               <div className="flex items-center justify-between">
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Leave Requests</h3>
                  <Plane className="w-4 h-4 text-slate-400" />
               </div>
               <div className="space-y-4">
                  {leaveRequests.map(req => (
                    <div key={req.id} className="flex items-center justify-between group cursor-pointer">
                       <div className="min-w-0">
                          <p className="text-xs font-black text-slate-900 dark:text-white truncate">{req.name}</p>
                          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{req.type}</p>
                       </div>
                       <span className={cn(
                          "px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest",
                          req.status === "Approved" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                       )}>{req.status}</span>
                    </div>
                  ))}
               </div>
            </div>
         </div>

         {/* RIGHT: Main Content (8 cols) */}
         <div className="lg:col-span-8 space-y-8">
            {activeTab === "Directory" && (
               <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                  <div className="p-8 border-b border-slate-50 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                     <h3 className="text-xl font-black text-slate-900 dark:text-white">Staff Directory</h3>
                     <div className="flex items-center gap-4">
                        <div className="relative">
                           <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                           <input placeholder="Search employees..." className="pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-[10px] font-black uppercase tracking-widest outline-none focus:border-teal-500 transition-all" />
                        </div>
                        <button className="p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl">
                           <Filter className="w-4 h-4 text-slate-400" />
                        </button>
                     </div>
                  </div>
                  <div className="overflow-x-auto">
                     <table className="w-full text-left whitespace-nowrap">
                        <thead className="bg-slate-50/50 dark:bg-slate-800/50 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                           <tr>
                              <th className="px-8 py-4">Employee</th>
                              <th className="px-8 py-4">Department</th>
                              <th className="px-8 py-4">Attendance</th>
                              <th className="px-8 py-4">Salary</th>
                              <th className="px-8 py-4 text-right">Action</th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                           {employees.map(emp => (
                             <tr key={emp.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                                <td className="px-8 py-5">
                                   <div className="flex items-center gap-3">
                                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-white text-[10px] font-black">
                                         {emp.name.split(' ').map(n => n[0]).join('')}
                                      </div>
                                      <div>
                                         <p className="text-sm font-black text-slate-900 dark:text-white">{emp.name}</p>
                                         <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{emp.role}</p>
                                      </div>
                                   </div>
                                </td>
                                <td className="px-8 py-5">
                                   <span className="text-[10px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest">{emp.dept}</span>
                                </td>
                                <td className="px-8 py-5">
                                   <div className="flex items-center gap-2">
                                      <div className="flex-1 w-16 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                         <div className="h-full bg-teal-500" style={{ width: emp.attendance }} />
                                      </div>
                                      <span className="text-[10px] font-black text-slate-900 dark:text-white">{emp.attendance}</span>
                                   </div>
                                </td>
                                <td className="px-8 py-5">
                                   <span className="text-xs font-black text-slate-900 dark:text-white">{emp.salary}</span>
                                </td>
                                <td className="px-8 py-5 text-right">
                                   <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                                      <MoreVertical className="w-4 h-4 text-slate-400" />
                                   </button>
                                </td>
                             </tr>
                           ))}
                        </tbody>
                     </table>
                  </div>
               </div>
            )}

            {/* Shift Calendar Mockup */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm space-y-8">
               <div className="flex items-center justify-between">
                  <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">On-Call (Service de Garde)</h3>
                  <div className="flex gap-2">
                     <button className="px-4 py-1.5 bg-teal-50 text-teal-600 rounded-lg text-[10px] font-black uppercase tracking-widest">Week View</button>
                     <button className="px-4 py-1.5 bg-slate-50 text-slate-400 rounded-lg text-[10px] font-black uppercase tracking-widest">Month View</button>
                  </div>
               </div>
               <div className="grid grid-cols-7 gap-4">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(day => (
                    <div key={day} className="space-y-4">
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">{day}</p>
                       <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 min-h-[100px] space-y-3">
                          <div className="p-2 bg-teal-500/10 border border-teal-500/20 rounded-xl">
                             <p className="text-[8px] font-black text-teal-600 uppercase">Night Shift</p>
                             <p className="text-[9px] font-bold text-slate-700 dark:text-slate-300 mt-1 truncate">Dr. Miller</p>
                          </div>
                          <div className="p-2 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
                             <p className="text-[8px] font-black text-indigo-600 uppercase">Day Shift</p>
                             <p className="text-[9px] font-bold text-slate-700 dark:text-slate-300 mt-1 truncate">Nurse Jessica</p>
                          </div>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
