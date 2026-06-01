"use client";

import { 
  Search, Calendar, Clock, MapPin, 
  Sparkles, MessageSquare, FileText, 
  ArrowRight, Heart, Pill, Activity,
  Stethoscope, UserPlus, CreditCard
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/context/language-context";
import Link from "next/link";

export default function PatientPortalPage() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="relative rounded-[3rem] bg-slate-900 dark:bg-slate-900 overflow-hidden p-12 lg:p-20 text-white">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-teal-500/20 to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-2xl space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest">
            <Sparkles className="w-3 h-3 text-teal-400" />
            Your AI Healthcare Companion
          </div>
          <h1 className="text-5xl lg:text-7xl font-black tracking-tight leading-tight">
            {t("howCanWeHelp")}
          </h1>
          <div className="relative max-w-lg group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400 group-focus-within:text-teal-400 transition-colors" />
            <input 
              type="text" 
              placeholder="Search for doctors, specialties, or symptoms..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-16 pr-8 py-6 bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl text-lg outline-none focus:bg-white focus:text-slate-900 transition-all placeholder:text-slate-400"
            />
          </div>
          <div className="flex flex-wrap gap-3">
            {["Cardiology", "Pediatrics", "Neurology", "Dentistry"].map((spec) => (
              <button key={spec} className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded-full text-xs font-bold transition-all">
                {spec}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Health & Appointments */}
        <div className="lg:col-span-2 space-y-8">
          {/* Upcoming Appointment */}
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8">
              <Calendar className="w-20 h-20 text-teal-500 opacity-5 group-hover:scale-110 transition-transform" />
            </div>
            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-2 text-teal-600 font-black text-xs uppercase tracking-widest">
                <Clock className="w-4 h-4" />
                {t("nextAppointment")}
              </div>
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-900 dark:text-white font-black text-xl">
                  26
                  <span className="text-[10px] ml-1 uppercase">Apr</span>
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white">General Consultation</h3>
                  <p className="text-slate-500 font-bold flex items-center gap-2 mt-1">
                    <Stethoscope className="w-4 h-4" />
                    Dr. Sarah Miller
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <button className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-3 rounded-2xl font-bold text-sm hover:scale-[1.02] transition-all">
                  Manage Booking
                </button>
                <button className="text-slate-500 dark:text-slate-400 font-bold text-sm px-4 py-3 hover:text-teal-600 transition-colors">
                  Add to Calendar
                </button>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm text-center space-y-3">
              <div className="w-12 h-12 bg-rose-50 dark:bg-rose-500/10 rounded-2xl flex items-center justify-center mx-auto">
                <Activity className="w-6 h-6 text-rose-600" />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Heart Rate</p>
                <h4 className="text-2xl font-black text-slate-900 dark:text-white">72 <span className="text-xs text-slate-500 font-medium">bpm</span></h4>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm text-center space-y-3">
              <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-500/10 rounded-2xl flex items-center justify-center mx-auto">
                <Pill className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Prescriptions</p>
                <h4 className="text-2xl font-black text-slate-900 dark:text-white">03 <span className="text-xs text-slate-500 font-medium">Active</span></h4>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm text-center space-y-3">
              <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto">
                <FileText className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Reports</p>
                <h4 className="text-2xl font-black text-slate-900 dark:text-white">12 <span className="text-xs text-slate-500 font-medium">Files</span></h4>
              </div>
            </div>
          </div>

          {/* Recent Records & Prescriptions Tabs */}
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="flex bg-slate-50 dark:bg-slate-800/50 p-2 border-b border-slate-100 dark:border-slate-800 items-center justify-between px-6">
               <div className="flex gap-4">
                  {["Records", "Prescriptions", "Payments"].map(tab => (
                    <button key={tab} className="py-3 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-teal-600 transition-colors">
                      {tab}
                    </button>
                  ))}
               </div>
               <Link href="/portal/history" className="text-[10px] font-black text-teal-600 uppercase tracking-widest hover:underline">Full History</Link>
            </div>
            
            <div className="divide-y divide-slate-50 dark:divide-slate-800">
              {[
                { title: "Amoxicillin 500mg", desc: "Take 1 tablet twice a day", type: "Prescription", status: "Active" },
                { title: "Blood Test Results", desc: "Standard annual checkup", type: "Lab Report", status: "Ready" },
                { title: "Invoice INV-2026-092", desc: "$150.00 - Consultation Fee", type: "Payment", status: "Unpaid" }
              ].map((rec, i) => (
                <div key={i} className="p-8 flex items-center justify-between group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                      {rec.type === "Prescription" ? <Pill className="w-6 h-6 text-slate-400 group-hover:text-teal-600 transition-colors" /> : 
                       rec.type === "Payment" ? <CreditCard className="w-6 h-6 text-slate-400 group-hover:text-rose-600 transition-colors" /> :
                       <FileText className="w-6 h-6 text-slate-400 group-hover:text-teal-600 transition-colors" />}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">{rec.title}</p>
                      <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">{rec.type} • {rec.desc}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest",
                      rec.status === "Active" || rec.status === "Ready" ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                    )}>{rec.status}</span>
                    <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: AI Support & Featured Doctors */}
        <div className="space-y-8">
          {/* AI Triage Chatbot */}
          <div className="bg-gradient-to-br from-teal-600 to-cyan-600 rounded-[2.5rem] p-8 text-white shadow-xl shadow-teal-500/20 relative overflow-hidden group">
            <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
              <MessageSquare className="w-48 h-48" />
            </div>
            <div className="relative z-10 space-y-6">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-black leading-tight">{t("aiTriage")}</h3>
              <p className="text-sm opacity-80 leading-relaxed">
                Chat with our AI symptoms checker. Get instant guidance and book the right specialist in seconds.
              </p>
              <Link href="/portal/messages" className="block w-full py-4 bg-white text-teal-600 rounded-2xl font-black text-sm shadow-lg hover:scale-[1.02] active:scale-95 transition-all text-center">
                {t("startTriage")}
              </Link>
            </div>
          </div>

          {/* Featured Doctors */}
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <h3 className="font-black text-xs uppercase tracking-widest text-slate-400">Available Specialists</h3>
            <div className="space-y-6">
              {[
                { name: "Dr. James Wilson", spec: "Neurologist", rating: 4.8 },
                { name: "Dr. Elena Rodriguez", spec: "Pediatrician", rating: 5.0 },
                { name: "Dr. Robert Chen", spec: "Dermatologist", rating: 4.7 }
              ].map((doc, i) => (
                <div key={i} className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 font-bold group-hover:bg-teal-500 group-hover:text-white transition-all">
                    {doc.name.split(' ')[1][0]}
                    {doc.name.split(' ')[2][0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{doc.name}</p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{doc.spec}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-amber-400">
                      <Heart className="w-3 h-3 fill-amber-400" />
                      <span className="text-[10px] font-black">{doc.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full py-4 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-slate-100 transition-all flex items-center justify-center gap-2">
              <UserPlus className="w-4 h-4" />
              View Full Directory
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
