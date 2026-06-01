"use client";

import NewAppointmentModal from "@/components/modals/new-appointment-modal"
import { 
  Activity, 
  CalendarPlus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Clock, 
  CheckCircle2, 
  XCircle,
  AlertCircle,
  CalendarX
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"

const appointments = [
  {
    id: "APT-2026-001",
    patient: { name: "Md Tajuddin", avatar: "MT", email: "tajuddin@example.com" },
    service: "General Consultation",
    datetime: "Apr 26, 2026 • 9:30 AM - 10:00 AM",
    status: "scheduled",
  },
  {
    id: "APT-2026-002",
    patient: { name: "Shakib", avatar: "S", email: "shakib.h@example.com" },
    service: "Follow Up Visit",
    datetime: "Apr 26, 2026 • 10:30 AM - 11:00 AM",
    status: "scheduled",
  },
  {
    id: "APT-2026-003",
    patient: { name: "Asif Khan", avatar: "AK", email: "asif.k@example.com" },
    service: "Routine Checkup",
    datetime: "Apr 27, 2026 • 9:00 AM - 9:45 AM",
    status: "completed",
  },
  {
    id: "APT-2026-004",
    patient: { name: "Rakib", avatar: "R", email: "rakib99@example.com" },
    service: "Dermatology Review",
    datetime: "Apr 27, 2026 • 11:30 AM - 12:00 PM",
    status: "cancelled",
  },
  {
    id: "APT-2026-005",
    patient: { name: "Hasan Mahmud", avatar: "HM", email: "hasan.m@example.com" },
    service: "General Consultation",
    datetime: "Apr 28, 2026 • 14:00 PM - 14:30 PM",
    status: "no_show",
  },
];

const statusStyles = {
  scheduled: "bg-teal-50 dark:bg-teal-500/10 text-teal-700 dark:text-teal-400 border-teal-100 dark:border-teal-500/20",
  completed: "bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400 border-green-100 dark:border-green-500/20",
  cancelled: "bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-100 dark:border-rose-500/20",
  no_show: "bg-slate-100 dark:bg-slate-500/10 text-slate-700 dark:text-slate-400 border-slate-200 dark:border-slate-500/20",
};

const statusIcons = {
  scheduled: Clock,
  completed: CheckCircle2,
  cancelled: XCircle,
  no_show: AlertCircle,
};

export default function AppointmentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filteredAppointments = appointments.filter((apt) => {
    const matchesSearch = apt.patient.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         apt.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         apt.service.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "scheduled") return matchesSearch && apt.status === "scheduled";
    if (activeTab === "past") return matchesSearch && (apt.status === "completed" || apt.status === "cancelled" || apt.status === "no_show");
    return matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
            Dashboard / Appointments
          </p>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Appointments</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage and track all patient appointments.</p>
        </div>
        <NewAppointmentModal />
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
            All
          </button>
          <button 
            onClick={() => setActiveTab("scheduled")}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-all",
              activeTab === "scheduled" 
                ? "bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-md shadow-teal-500/20" 
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50"
            )}
          >
            Upcoming
          </button>
          <button 
            onClick={() => setActiveTab("past")}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-all",
              activeTab === "past" 
                ? "bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-md shadow-teal-500/20" 
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50"
            )}
          >
            Past
          </button>
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search appointments..." 
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

      {/* Appointments Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-colors">
        {filteredAppointments.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left whitespace-nowrap">
              <thead className="text-xs text-slate-500 dark:text-slate-400 uppercase bg-slate-50/80 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="px-6 py-4 font-semibold tracking-wider">Patient</th>
                  <th className="px-6 py-4 font-semibold tracking-wider">Service</th>
                  <th className="px-6 py-4 font-semibold tracking-wider">Date & Time</th>
                  <th className="px-6 py-4 font-semibold tracking-wider">Status</th>
                  <th className="px-6 py-4 font-semibold tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-600 dark:text-slate-300">
                {filteredAppointments.map((apt) => {
                  const StatusIcon = statusIcons[apt.status as keyof typeof statusIcons];
                  return (
                    <tr key={apt.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 font-bold text-sm border border-slate-200 dark:border-slate-700 shadow-sm">
                            {apt.patient.avatar}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900 dark:text-slate-100">{apt.patient.name}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">{apt.patient.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-medium text-slate-700 dark:text-slate-200">{apt.service}</span>
                          <span className="text-xs text-slate-500 dark:text-slate-500">{apt.id}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-700 dark:text-slate-300">
                        {apt.datetime}
                      </td>
                      <td className="px-6 py-4">
                        <span className={cn(
                          "px-3 py-1.5 rounded-full text-xs font-semibold border flex items-center gap-1.5 w-fit",
                          statusStyles[apt.status as keyof typeof statusStyles]
                        )}>
                          <StatusIcon className="w-3.5 h-3.5" />
                          <span className="capitalize">{apt.status.replace("_", " ")}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-2 text-slate-400 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
                          <MoreHorizontal className="w-5 h-5" />
                        </button>
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
              <CalendarX className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">No appointments found</h3>
            <p className="text-slate-500 dark:text-slate-400 max-w-xs mt-1">
              There are no appointments matching your search or filter.
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
          <p className="text-sm text-slate-500 dark:text-slate-400">Showing <span className="font-semibold text-slate-700 dark:text-slate-200">1</span> to <span className="font-semibold text-slate-700 dark:text-slate-200">{filteredAppointments.length}</span> of <span className="font-semibold text-slate-700 dark:text-slate-200">{appointments.length}</span> entries</p>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors disabled:opacity-50">Previous</button>
            <button className="px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">Next</button>
          </div>
        </div>
      </div>
    </div>
  )
}
