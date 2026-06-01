"use client";

import AddPatientModal from "@/components/modals/add-patient-modal"
import { 
  Users, 
  Search, 
  Filter, 
  MoreHorizontal,
  Mail,
  Phone,
  CalendarDays,
  UserX,
  FileText
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"
import Link from "next/link"

const patients = [
  {
    id: "PAT-0012",
    name: "Md Tajuddin",
    avatar: "MT",
    email: "tajuddin@example.com",
    phone: "+880 1711-223344",
    lastVisit: "Apr 15, 2026",
    nextAppointment: "Apr 26, 2026",
    status: "active",
  },
  {
    id: "PAT-0045",
    name: "Shakib Hasan",
    avatar: "SH",
    email: "shakib.h@example.com",
    phone: "+880 1822-334455",
    lastVisit: "Mar 10, 2026",
    nextAppointment: "Apr 26, 2026",
    status: "active",
  },
  {
    id: "PAT-0089",
    name: "Asif Khan",
    avatar: "AK",
    email: "asif.k@example.com",
    phone: "+880 1933-445566",
    lastVisit: "Jan 05, 2026",
    nextAppointment: "Apr 27, 2026",
    status: "active",
  },
  {
    id: "PAT-0102",
    name: "Rakib Ahmed",
    avatar: "RA",
    email: "rakib99@example.com",
    phone: "+880 1644-556677",
    lastVisit: "Dec 12, 2025",
    nextAppointment: "Apr 27, 2026",
    status: "inactive",
  },
  {
    id: "PAT-0156",
    name: "Hasan Mahmud",
    avatar: "HM",
    email: "hasan.m@example.com",
    phone: "+880 1555-667788",
    lastVisit: "Feb 20, 2026",
    nextAppointment: "Unscheduled",
    status: "active",
  },
];

export default function PatientsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filteredPatients = patients.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         p.phone.includes(searchQuery);
    
    if (activeTab === "all") return matchesSearch;
    return matchesSearch && p.status === activeTab;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
            Dashboard / Patients
          </p>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Patient Directory</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage patient records, history, and contact information.</p>
        </div>
        <AddPatientModal />
      </div>

      {/* Filters and Search */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row gap-4 justify-between items-center transition-colors">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button 
            onClick={() => setActiveTab("all")}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-semibold transition-all",
              activeTab === "all" 
                ? "bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-md shadow-teal-500/20" 
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50"
            )}
          >
            All Patients <span className={cn("ml-1.5 px-1.5 py-0.5 rounded-md text-xs", activeTab === "all" ? "bg-white/20 text-white" : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400")}>{patients.length}</span>
          </button>
          <button 
            onClick={() => setActiveTab("active")}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-all",
              activeTab === "active" 
                ? "bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-md shadow-teal-500/20" 
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50"
            )}
          >
            Active
          </button>
          <button 
            onClick={() => setActiveTab("inactive")}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-all",
              activeTab === "inactive" 
                ? "bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-md shadow-teal-500/20" 
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50"
            )}
          >
            Inactive
          </button>
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by name, ID, phone..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:bg-white dark:focus:bg-slate-800 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 dark:focus:ring-teal-900 outline-none transition-all dark:text-slate-200 dark:placeholder-slate-400"
            />
          </div>
          <button className="p-2 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Patients Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-colors">
        {filteredPatients.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left whitespace-nowrap">
              <thead className="text-xs text-slate-500 dark:text-slate-400 uppercase bg-slate-50/80 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="px-6 py-4 font-semibold tracking-wider">Patient Name</th>
                  <th className="px-6 py-4 font-semibold tracking-wider">Contact Info</th>
                  <th className="px-6 py-4 font-semibold tracking-wider">Last Visit</th>
                  <th className="px-6 py-4 font-semibold tracking-wider">Status</th>
                  <th className="px-6 py-4 font-semibold tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-600 dark:text-slate-300">
                {filteredPatients.map((patient) => {
                  const isActive = patient.status === "active";
                  return (
                    <tr key={patient.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors group cursor-pointer">
                      <td className="px-6 py-4">
                        <Link href={`/app/patients/${patient.id}`} className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-teal-50 dark:bg-teal-500/10 flex items-center justify-center text-teal-700 dark:text-teal-400 font-bold text-sm border border-teal-100 dark:border-teal-500/20 shadow-sm group-hover:scale-110 transition-transform">
                            {patient.avatar}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-teal-600 transition-colors">{patient.name}</p>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{patient.id}</p>
                          </div>
                        </Link>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-medium">
                            <Phone className="w-3.5 h-3.5 text-slate-400" />
                            <span>{patient.phone}</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs">
                            <Mail className="w-3.5 h-3.5" />
                            <span>{patient.email}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1">
                          <span className="font-bold text-slate-700 dark:text-slate-200">{patient.lastVisit}</span>
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                            <CalendarDays className="w-3 h-3 text-teal-500" />
                            Next: {patient.nextAppointment}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={cn(
                          "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border",
                          isActive 
                            ? "bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-100 dark:border-teal-500/20"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700"
                        )}>
                          {isActive ? "Active" : "Archived"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                           <Link href={`/app/patients/${patient.id}`} className="p-2 text-slate-400 hover:text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-500/10 rounded-xl transition-all">
                              <FileText className="w-4 h-4" />
                           </Link>
                           <button className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl transition-all">
                              <MoreHorizontal className="w-5 h-5" />
                           </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-20 flex flex-col items-center justify-center text-center px-4">
            <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
              <UserX className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">No patients found</h3>
            <p className="text-slate-500 dark:text-slate-400 max-w-xs mt-1">
              We couldn&apos;t find any patients matching your search criteria. Try a different query.
            </p>
            <button 
              onClick={() => { setSearchQuery(""); setActiveTab("all"); }}
              className="mt-6 text-teal-600 dark:text-teal-400 font-semibold hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
          <p className="text-sm text-slate-500 dark:text-slate-400">Showing <span className="font-semibold text-slate-700 dark:text-slate-200">1</span> to <span className="font-semibold text-slate-700 dark:text-slate-200">{filteredPatients.length}</span> of <span className="font-semibold text-slate-700 dark:text-slate-200">{patients.length}</span> entries</p>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors disabled:opacity-50">Previous</button>
            <button className="px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">Next</button>
          </div>
        </div>
      </div>
    </div>
  )
}
