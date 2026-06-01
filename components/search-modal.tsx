"use client";

import { useEffect, useState } from "react";
import { 
  Search, Users, Calendar, Activity, 
  FileText, Command, X, ArrowRight,
  Stethoscope, Pill, FlaskConical
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface SearchResult {
  id: string;
  type: "patient" | "appointment" | "doctor" | "report";
  title: string;
  subtitle: string;
  href: string;
  icon: any;
}

const mockResults: SearchResult[] = [
  { id: "1", type: "patient", title: "John Doe", subtitle: "Patient ID: #P-10293", href: "/app/patients", icon: Users },
  { id: "2", type: "appointment", title: "Cardiac Surgery", subtitle: "Dr. Tajuddin • Tomorrow, 10:00 AM", href: "/app/calendar", icon: Activity },
  { id: "3", type: "doctor", title: "Dr. Sarah Smith", subtitle: "Cardiology Specialist", href: "/app/doctors", icon: Stethoscope },
  { id: "4", type: "report", title: "Lab Results - Blood Test", subtitle: "Patient: Emma Wilson • 2 hours ago", href: "/app/laboratory", icon: FlaskConical },
];

export default function SearchModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    if (query.length > 1) {
      setResults(mockResults.filter(r => r.title.toLowerCase().includes(query.toLowerCase())));
    } else {
      setResults([]);
    }
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onClose(); // Toggle logic should be handled by parent, but here we just need to know it's a shortcut
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] px-4">
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={onClose} />
      
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] shadow-2xl shadow-slate-900/50 overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center gap-4">
           <Search className="w-6 h-6 text-slate-400" />
           <input 
             autoFocus
             type="text" 
             placeholder="Search anything... (Patients, doctors, clinical records)"
             className="flex-1 bg-transparent border-none outline-none text-lg font-bold text-slate-900 dark:text-white placeholder:text-slate-400"
             value={query}
             onChange={(e) => setQuery(e.target.value)}
           />
           <button onClick={onClose} className="p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors">
              <X className="w-5 h-5 text-slate-400" />
           </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-2">
           {results.length > 0 ? (
             <div className="space-y-1">
                <p className="px-4 py-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Top Results</p>
                {results.map((result) => (
                  <Link 
                    key={result.id} 
                    href={result.href}
                    onClick={onClose}
                    className="flex items-center gap-4 p-4 hover:bg-teal-50 dark:hover:bg-teal-500/10 rounded-3xl transition-all group"
                  >
                     <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                        <result.icon className="w-6 h-6" />
                     </div>
                     <div className="flex-1">
                        <p className="font-black text-slate-900 dark:text-white">{result.title}</p>
                        <p className="text-xs text-slate-500 font-bold">{result.subtitle}</p>
                     </div>
                     <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-teal-500 transition-colors" />
                  </Link>
                ))}
             </div>
           ) : query.length > 1 ? (
             <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto">
                   <AlertCircle className="w-8 h-8 text-slate-300" />
                </div>
                <div>
                   <p className="font-black text-slate-900 dark:text-white uppercase tracking-widest text-xs">No results found</p>
                   <p className="text-xs text-slate-500 mt-1">Try searching for a different name or ID.</p>
                </div>
             </div>
           ) : (
             <div className="grid grid-cols-2 gap-4 p-4">
                {[
                  { label: "Patients", icon: Users, color: "text-indigo-600", bg: "bg-indigo-50" },
                  { label: "Doctors", icon: Stethoscope, color: "text-rose-600", bg: "bg-rose-50" },
                  { label: "Pharmacy", icon: Pill, color: "text-teal-600", bg: "bg-teal-50" },
                  { label: "Lab Reports", icon: FlaskConical, color: "text-amber-600", bg: "bg-amber-50" },
                ].map((cat, i) => (
                  <button key={i} className="flex items-center gap-4 p-6 bg-slate-50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 rounded-[2rem] transition-all text-left group shadow-sm">
                     <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform", cat.bg)}>
                        <cat.icon className={cn("w-5 h-5", cat.color)} />
                     </div>
                     <span className="font-black text-slate-700 dark:text-slate-300 text-xs uppercase tracking-widest">{cat.label}</span>
                  </button>
                ))}
             </div>
           )}
        </div>

        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
           <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 px-2 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md shadow-sm">
                 <Command className="w-3 h-3 text-slate-400" />
                 <span className="text-[10px] font-black text-slate-500">K</span>
              </div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Search</span>
           </div>
           <p className="text-[10px] font-bold text-slate-400">Press Esc to close</p>
        </div>
      </div>
    </div>
  );
}
