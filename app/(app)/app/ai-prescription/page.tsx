"use client";

import { useState } from "react";
import { 
  Pill, AlertCircle, CheckCircle2, 
  History, Search, Plus, Info,
  Zap, FlaskConical, User, ShieldAlert,
  ArrowRight, Save
} from "lucide-react";
import { cn } from "@/lib/utils";

const drugs = [
  { name: "Amoxicillin", class: "Antibiotic", interaction: ["Alcohol"], allergies: ["Penicillin"] },
  { name: "Lisinopril", class: "ACE Inhibitor", interaction: ["NSAIDs"], allergies: [] },
  { name: "Metformin", class: "Antidiabetic", interaction: ["Contrast Dye"], allergies: [] },
  { name: "Warfarin", class: "Anticoagulant", interaction: ["Aspirin", "Vitamin K"], allergies: [] },
];

export default function SmartPrescriptionPage() {
  const [selectedDrug, setSelectedDrug] = useState("");
  const [warnings, setWarnings] = useState<string[]>([]);
  const [patientAllergies] = useState(["Penicillin"]);

  const handleDrugSelect = (name: string) => {
    setSelectedDrug(name);
    const drug = drugs.find(d => d.name === name);
    const newWarnings = [];
    
    if (drug?.allergies.some(a => patientAllergies.includes(a))) {
       newWarnings.push(`ALLERGY ALERT: Patient is allergic to ${drug.allergies.join(", ")}`);
    }
    
    if (drug?.interaction.length) {
       newWarnings.push(`INTERACTION: Potential interaction with ${drug.interaction.join(", ")}`);
    }
    
    setWarnings(newWarnings);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
           <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">AI Smart Prescription</h1>
           <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium">Automated drug interaction and allergy detection.</p>
        </div>
        <div className="flex items-center gap-4">
           <div className="px-4 py-2 bg-rose-50 dark:bg-rose-500/10 border border-rose-100 dark:border-rose-500/20 rounded-xl">
              <p className="text-[10px] font-black text-rose-600 uppercase tracking-widest">Patient Allergies</p>
              <p className="text-xs font-bold text-rose-900 dark:text-rose-400">{patientAllergies.join(", ")}</p>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Prescription Builder */}
        <div className="lg:col-span-2 space-y-6">
           <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden p-8 space-y-8">
              <div className="space-y-4">
                 <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Select Medication</label>
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {drugs.map((drug) => (
                      <button 
                        key={drug.name}
                        onClick={() => handleDrugSelect(drug.name)}
                        className={cn(
                          "p-4 rounded-2xl border transition-all text-left space-y-2",
                          selectedDrug === drug.name 
                            ? "bg-teal-50 border-teal-500 dark:bg-teal-500/10" 
                            : "bg-slate-50 dark:bg-slate-800/50 border-transparent hover:border-slate-200"
                        )}
                      >
                         <Pill className={cn("w-5 h-5", selectedDrug === drug.name ? "text-teal-600" : "text-slate-400")} />
                         <p className="font-black text-xs">{drug.name}</p>
                         <p className="text-[9px] text-slate-400 font-bold uppercase">{drug.class}</p>
                      </button>
                    ))}
                 </div>
              </div>

              {selectedDrug && (
                <div className="animate-in fade-in slide-in-from-top-4 duration-300 space-y-6 pt-6 border-t border-slate-50 dark:border-slate-800">
                   {warnings.length > 0 ? (
                     <div className="bg-rose-50 dark:bg-rose-500/10 border border-rose-100 dark:border-rose-500/20 p-6 rounded-2xl space-y-3">
                        <div className="flex items-center gap-2 text-rose-600 font-black text-xs uppercase tracking-widest">
                           <ShieldAlert className="w-4 h-4" /> Safety Warnings
                        </div>
                        <ul className="space-y-2">
                           {warnings.map((w, i) => (
                             <li key={i} className="text-sm font-bold text-rose-900 dark:text-rose-400 flex items-start gap-2">
                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                                {w}
                             </li>
                           ))}
                        </ul>
                     </div>
                   ) : (
                     <div className="bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 p-6 rounded-2xl flex items-center gap-4 text-emerald-600">
                        <CheckCircle2 className="w-6 h-6" />
                        <p className="text-sm font-bold">No interactions or allergies detected for this patient.</p>
                     </div>
                   )}

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Dosage</label>
                         <input type="text" placeholder="e.g. 500mg" className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border-none outline-none focus:ring-2 focus:ring-teal-500 transition-all font-bold text-sm" />
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Frequency</label>
                         <input type="text" placeholder="e.g. 2x Daily" className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border-none outline-none focus:ring-2 focus:ring-teal-500 transition-all font-bold text-sm" />
                      </div>
                   </div>

                   <button className="w-full py-4 bg-teal-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-teal-600 transition-all shadow-lg shadow-teal-500/20 flex items-center justify-center gap-2">
                      <Save className="w-4 h-4" /> Generate Prescription
                   </button>
                </div>
              )}
           </div>
        </div>

        {/* Prescription History */}
        <div className="space-y-8">
           <div className="bg-slate-900 text-white rounded-[2.5rem] p-8 space-y-6">
              <div className="flex items-center justify-between">
                 <h3 className="text-lg font-black tracking-tight">AI Assistant</h3>
                 <Zap className="w-6 h-6 text-amber-400" />
              </div>
              <p className="text-xs opacity-70 leading-relaxed">
                 Based on the latest lab results, patient might benefit from Vitamin D supplements.
              </p>
              <button className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
                 View Evidence
              </button>
           </div>

           <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Recent Prescriptions</h3>
              <div className="space-y-4">
                 {[
                   { drug: "Ibuprofen", date: "Oct 12, 2026", status: "Active" },
                   { drug: "Omeprazole", date: "Sep 28, 2026", status: "Completed" },
                 ].map((p, i) => (
                   <div key={i} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
                      <div>
                        <p className="text-sm font-bold">{p.drug}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">{p.date}</p>
                      </div>
                      <span className={cn(
                        "px-2 py-1 rounded-lg text-[8px] font-black uppercase",
                        p.status === "Active" ? "bg-teal-50 text-teal-600" : "bg-slate-100 text-slate-400"
                      )}>{p.status}</span>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
