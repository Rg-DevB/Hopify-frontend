"use client";

import { 
  Stethoscope, Search, Plus, MoreVertical, Star, 
  Mail, Phone, Calendar, CheckCircle2, Clock
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import AddDoctorModal from "@/components/modals/add-doctor-modal";

const doctors = [
  {
    id: 1,
    name: "Dr. Sarah Miller",
    specialty: "Cardiologist",
    rating: 4.9,
    reviews: 128,
    status: "Available",
    email: "s.miller@hopify.com",
    phone: "+1 (555) 123-4567",
    experience: "12 years",
    avatar: "SM"
  },
  {
    id: 2,
    name: "Dr. James Wilson",
    specialty: "Neurologist",
    rating: 4.8,
    reviews: 94,
    status: "Busy",
    email: "j.wilson@hopify.com",
    phone: "+1 (555) 234-5678",
    experience: "15 years",
    avatar: "JW"
  },
  {
    id: 3,
    name: "Dr. Elena Rodriguez",
    specialty: "Pediatrician",
    rating: 5.0,
    reviews: 215,
    status: "Available",
    email: "e.rodriguez@hopify.com",
    phone: "+1 (555) 345-6789",
    experience: "8 years",
    avatar: "ER"
  },
  {
    id: 4,
    name: "Dr. Robert Chen",
    specialty: "Dermatologist",
    rating: 4.7,
    reviews: 86,
    status: "On Break",
    email: "r.chen@hopify.com",
    phone: "+1 (555) 456-7890",
    experience: "10 years",
    avatar: "RC"
  }
];

export default function DoctorsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDoctors = doctors.filter(doc => 
    doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Our Specialists</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage and monitor your clinic&apos;s medical staff.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search doctors..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 outline-none transition-all dark:text-slate-200"
            />
          </div>
          <AddDoctorModal />
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Total Doctors</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-black text-slate-900 dark:text-white">18</h3>
            <span className="text-xs font-bold text-teal-600">+2 this month</span>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Active Now</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-black text-slate-900 dark:text-white">14</h3>
            <span className="text-xs font-bold text-amber-600">4 On break</span>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Avg. Rating</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-black text-slate-900 dark:text-white">4.85</h3>
            <div className="flex gap-0.5 text-amber-400">
              <Star className="w-4 h-4 fill-amber-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {filteredDoctors.map((doc) => (
          <div key={doc.id} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden group hover:border-teal-500 transition-all">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-500/10 dark:to-cyan-500/10 flex items-center justify-center text-teal-700 dark:text-teal-400 text-xl font-black shadow-inner">
                  {doc.avatar}
                </div>
                <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
                  <MoreVertical className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">{doc.name}</h3>
                  {doc.status === "Available" && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                </div>
                <p className="text-sm font-bold text-teal-600 dark:text-teal-400">{doc.specialty}</p>
              </div>

              <div className="mt-4 flex items-center gap-4 py-4 border-y border-slate-50 dark:border-slate-800">
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Experience</span>
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{doc.experience}</span>
                </div>
                <div className="w-px h-8 bg-slate-100 dark:bg-slate-800" />
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Rating</span>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{doc.rating}</span>
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                  <Mail className="w-4 h-4" />
                  <span className="truncate">{doc.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                  <Phone className="w-4 h-4" />
                  <span>{doc.phone}</span>
                </div>
              </div>

              <div className="mt-8 flex gap-3">
                <button className="flex-1 py-2.5 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2">
                  <Calendar className="w-3.5 h-3.5" />
                  Profile
                </button>
                <button className={cn(
                  "flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2",
                  doc.status === "Available" 
                    ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100"
                    : doc.status === "Busy"
                    ? "bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-400 hover:bg-rose-100"
                    : "bg-slate-50 dark:bg-slate-800 text-slate-500 hover:bg-slate-100"
                )}>
                  <Clock className="w-3.5 h-3.5" />
                  {doc.status}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
