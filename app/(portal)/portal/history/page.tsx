"use client";

import { 
  FileText, Calendar, Activity, Pill, 
  Search, Filter, ChevronRight, ArrowLeft,
  Microscope, HeartPulse, Download, ExternalLink,
  ShieldCheck
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const medicalHistory = [
  { 
    id: 1, 
    date: "Oct 12, 2025", 
    title: "Annual Cardiovascular Checkup", 
    doctor: "Dr. Sarah Miller", 
    dept: "Cardiology",
    type: "Consultation",
    status: "Completed",
    notes: "Patient reports minor chest tightness during intense exercise. ECG shows normal rhythm."
  },
  { 
    id: 2, 
    date: "Aug 05, 2025", 
    title: "Routine Blood Panel", 
    doctor: "Lab Team", 
    dept: "Laboratory",
    type: "Lab Test",
    status: "Normal",
    notes: "All values within standard ranges. Cholesterol slightly elevated."
  },
  { 
    id: 3, 
    date: "Jun 20, 2025", 
    title: "Flu Vaccination", 
    doctor: "Nurse Jessica", 
    dept: "General",
    type: "Immunization",
    status: "Administered",
    notes: "Batch #FL2025-08. No immediate adverse reactions."
  }
];

export default function PatientHistoryPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* Top Nav */}
      <div className="flex items-center justify-between">
         <Link href="/portal" className="flex items-center gap-2 text-slate-500 hover:text-teal-600 transition-colors font-bold text-sm">
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
         </Link>
         <div className="flex items-center gap-2 px-3 py-1 bg-teal-50 dark:bg-teal-500/10 text-teal-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-teal-500/20">
            <ShieldCheck className="w-3.5 h-3.5" /> HIPAA Verified
         </div>
      </div>

      {/* Header */}
      <div>
         <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Full Medical History</h1>
         <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium">Your lifetime medical records, securely stored and always accessible.</p>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
         <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input placeholder="Search records, diagnoses, or doctors..." className="w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 transition-all shadow-sm" />
         </div>
         <button className="px-6 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center gap-2 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
            <Filter className="w-4 h-4" /> Filters
         </button>
      </div>

      {/* History Timeline */}
      <div className="space-y-6">
         {medicalHistory.map((item) => (
           <div key={item.id} className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden group hover:border-teal-500 transition-all">
              <div className="p-8 flex flex-col md:flex-row gap-8">
                 {/* Left: Date & Type */}
                 <div className="md:w-32 shrink-0 flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-slate-800/50 rounded-3xl text-center">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{item.date.split(' ')[0]}</p>
                    <p className="text-2xl font-black text-slate-900 dark:text-white leading-none">{item.date.split(' ')[1].replace(',', '')}</p>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{item.date.split(' ')[2]}</p>
                    <div className="mt-4 p-2 bg-white dark:bg-slate-900 rounded-xl shadow-sm">
                       {item.type === "Consultation" ? <Activity className="w-5 h-5 text-teal-600" /> : 
                        item.type === "Lab Test" ? <Microscope className="w-5 h-5 text-indigo-600" /> :
                        <HeartPulse className="w-5 h-5 text-rose-600" />}
                    </div>
                 </div>

                 {/* Middle: Info */}
                 <div className="flex-1 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                       <div>
                          <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">{item.title}</h3>
                          <div className="flex items-center gap-3 mt-1">
                             <span className="text-xs font-bold text-teal-600 uppercase tracking-wide">{item.dept}</span>
                             <span className="w-1 h-1 rounded-full bg-slate-300" />
                             <span className="text-xs font-bold text-slate-500">{item.doctor}</span>
                          </div>
                       </div>
                       <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-full text-[9px] font-black uppercase tracking-[0.1em] self-start sm:self-center">
                          {item.status}
                       </span>
                    </div>

                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed italic">
                       &quot;{item.notes}&quot;
                    </p>

                    <div className="flex flex-wrap gap-4 pt-4">
                       <button className="flex items-center gap-2 text-xs font-black text-teal-600 uppercase tracking-widest hover:underline">
                          <Download className="w-4 h-4" /> Download Report
                       </button>
                       <button className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors">
                          <ExternalLink className="w-4 h-4" /> View Full Details
                       </button>
                    </div>
                 </div>
              </div>
           </div>
         ))}
      </div>

      {/* Footer CTA */}
      <div className="bg-slate-900 dark:bg-white p-12 rounded-[3rem] text-white dark:text-slate-900 flex flex-col items-center text-center space-y-6 shadow-2xl">
         <div className="w-16 h-16 bg-white/10 dark:bg-slate-900/10 rounded-[2rem] flex items-center justify-center">
            <Pill className="w-8 h-8 text-teal-400" />
         </div>
         <div className="space-y-2">
            <h3 className="text-2xl font-black tracking-tight">Need a new consultation?</h3>
            <p className="text-sm opacity-60 font-medium">Book an appointment with your favorite specialist in 2 minutes.</p>
         </div>
         <Link href="/portal" className="px-8 py-4 bg-teal-500 hover:bg-teal-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-xl shadow-teal-500/20">
            Schedule Appointment
         </Link>
      </div>
    </div>
  );
}
