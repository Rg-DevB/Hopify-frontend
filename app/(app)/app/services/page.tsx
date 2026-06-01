"use client";

import AddServiceModal from "@/components/modals/add-service-modal"
import { 
  Plus, 
  Search, 
  MoreHorizontal, 
  Clock, 
  Banknote,
  Stethoscope,
  Syringe,
  Activity,
  HeartPulse,
  Brain,
  Eye,
  Briefcase
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"

const services = [
  {
    id: "SRV-01",
    name: "General Consultation",
    description: "Standard checkup, physical examination, and basic medical advice for common symptoms.",
    duration: "30 min",
    price: "$100",
    icon: Stethoscope,
    status: "active",
    category: "General",
  },
  {
    id: "SRV-02",
    name: "Cardiology Screening",
    description: "Complete heart health evaluation including ECG, blood pressure, and risk assessment.",
    duration: "45 min",
    price: "$250",
    icon: HeartPulse,
    status: "active",
    category: "Specialist",
  },
  {
    id: "SRV-03",
    name: "Vaccination & Immunization",
    description: "Administration of routine seasonal vaccines and travel immunizations.",
    duration: "15 min",
    price: "$45",
    icon: Syringe,
    status: "active",
    category: "Preventive",
  },
  {
    id: "SRV-04",
    name: "Neurological Exam",
    description: "Assessment of motor and sensory skills, balance, coordination, and mental status.",
    duration: "60 min",
    price: "$300",
    icon: Brain,
    status: "active",
    category: "Specialist",
  },
  {
    id: "SRV-05",
    name: "Complete Blood Count (CBC)",
    description: "Standard laboratory blood test evaluating overall health and detecting disorders.",
    duration: "15 min",
    price: "$80",
    icon: Activity,
    status: "inactive",
    category: "Laboratory",
  },
  {
    id: "SRV-06",
    name: "Vision Therapy",
    description: "Customized program of visual activities designed to correct vision problems.",
    duration: "45 min",
    price: "$120",
    icon: Eye,
    status: "active",
    category: "Specialist",
  },
];

export default function ServicesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filteredServices = services.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         s.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === "all") return matchesSearch;
    return matchesSearch && s.category === activeTab;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
            Dashboard / Services
          </p>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Services & Treatments</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage the medical services and procedures offered at your clinic.</p>
        </div>
        <AddServiceModal />
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row gap-4 justify-between items-center transition-colors">
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <button 
            onClick={() => setActiveTab("all")}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-semibold transition-all",
              activeTab === "all" 
                ? "bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-md shadow-teal-500/20" 
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50"
            )}
          >
            All Services
          </button>
          <button 
            onClick={() => setActiveTab("General")}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-all",
              activeTab === "General" 
                ? "bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-md shadow-teal-500/20" 
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50"
            )}
          >
            General
          </button>
          <button 
            onClick={() => setActiveTab("Specialist")}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-all",
              activeTab === "Specialist" 
                ? "bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-md shadow-teal-500/20" 
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50"
            )}
          >
            Specialist
          </button>
          <button 
            onClick={() => setActiveTab("Laboratory")}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-all",
              activeTab === "Laboratory" 
                ? "bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-md shadow-teal-500/20" 
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50"
            )}
          >
            Laboratory
          </button>
        </div>
        
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search services..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:bg-white dark:focus:bg-slate-800 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 dark:focus:ring-teal-900 outline-none transition-all dark:text-slate-200 dark:placeholder-slate-400"
          />
        </div>
      </div>

      {/* Services Grid */}
      {filteredServices.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => {
            const isActive = service.status === "active";
            return (
              <div key={service.id} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all group flex flex-col">
                <div className="p-6 flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center shadow-sm border transition-colors",
                      isActive 
                        ? "bg-teal-50 dark:bg-teal-500/10 border-teal-100 dark:border-teal-500/20 text-teal-600 dark:text-teal-400" 
                        : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500"
                    )}>
                      <service.icon className="w-6 h-6" />
                    </div>
                    <button className="p-2 text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 opacity-0 group-hover:opacity-100">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="mb-2">
                    <span className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider mb-1 block">
                      {service.category}
                    </span>
                    <h3 className={cn(
                      "font-bold text-lg",
                      isActive ? "text-slate-900 dark:text-white" : "text-slate-500 dark:text-slate-400"
                    )}>{service.name}</h3>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {service.description}
                  </p>
                </div>
                
                <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 rounded-b-2xl flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-300">
                      <Clock className="w-4 h-4 text-slate-400" />
                      {service.duration}
                    </div>
                    <div className="flex items-center gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-300">
                      <Banknote className="w-4 h-4 text-slate-400" />
                      {service.price}
                    </div>
                  </div>
                  
                  <div className={cn(
                    "w-10 h-5 rounded-full relative cursor-pointer transition-colors",
                    isActive ? "bg-teal-600" : "bg-slate-300 dark:bg-slate-700"
                  )}>
                    <div className={cn(
                      "w-4 h-4 bg-white rounded-full absolute top-0.5 transition-all shadow-sm",
                      isActive ? "left-[22px]" : "left-0.5"
                    )}></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="py-20 flex flex-col items-center justify-center text-center px-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
          <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-4">
            <Briefcase className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">No services found</h3>
          <p className="text-slate-500 dark:text-slate-400 max-w-xs mt-1">
            We couldn&apos;t find any services matching your search or category filter.
          </p>
          <button 
            onClick={() => { setSearchQuery(""); setActiveTab("all"); }}
            className="mt-6 text-teal-600 dark:text-teal-400 font-semibold hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  )
}
