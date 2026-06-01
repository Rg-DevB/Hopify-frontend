"use client";

import { use, useState } from "react";
import { 
  User, 
  Stethoscope, 
  Pill, 
  FileText, 
  Activity, 
  ClipboardList, 
  Save, 
  Printer, 
  History,
  AlertCircle,
  Plus,
  Trash2,
  ChevronRight,
  PenTool,
  Download,
  CheckCircle2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import Link from "next/link";

// Mock data for the patient being consulted
const activePatient = {
  id: "PAT-0012",
  name: "Md Tajuddin",
  age: 34,
  gender: "Male",
  bloodGroup: "O+",
  allergies: ["Penicillin", "Peanuts"],
  antecedents: ["Type 2 Diabetes", "Hypertension"],
  vitals: {
    temp: "37.2°C",
    bp: "135/85",
    weight: "78kg",
    pulse: "72 bpm"
  }
};

export default function ConsultationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [currentSymptom, setCurrentSymptom] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [notes, setNotes] = useState("");
  const [prescriptions, setPrescriptions] = useState<{ med: string; dose: string; freq: string }[]>([]);
  const [exams, setExams] = useState<string[]>([]);

  const handleAddSymptom = () => {
    if (currentSymptom) {
      setSymptoms([...symptoms, currentSymptom]);
      setCurrentSymptom("");
    }
  };

  const handleAddPrescription = () => {
    setPrescriptions([...prescriptions, { med: "", dose: "", freq: "" }]);
  };

  const handleSave = () => {
    toast.success("Consultation saved successfully!", {
      description: "Medical record and prescription have been updated.",
    });
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-20">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
           <div className="w-14 h-14 rounded-2xl bg-teal-600 flex items-center justify-center text-white shadow-lg shadow-teal-500/20">
              <Stethoscope className="w-7 h-7" />
           </div>
           <div>
              <h1 className="text-2xl font-black text-slate-900 dark:text-white">Active Consultation</h1>
              <p className="text-sm font-medium text-slate-500 flex items-center gap-2">
                 Session #CS-2026-992 <span className="w-1 h-1 rounded-full bg-slate-300" /> Live Session
              </p>
           </div>
        </div>
        <div className="flex items-center gap-3">
           <button className="flex items-center gap-2 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-rose-600 transition-colors">
              Cancel
           </button>
           <button onClick={handleSave} className="flex items-center gap-2 px-6 py-2.5 bg-teal-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg hover:scale-105 transition-all">
              <Save className="w-4 h-4" /> Save & Close
           </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: Patient Context (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
           {/* Patient Quick Card */}
           <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                 <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-600">
                    MT
                 </div>
                 <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">{activePatient.name}</h3>
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{activePatient.id} • {activePatient.age}Y • {activePatient.gender}</p>
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6">
                 <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
                    <p className="text-[9px] font-black uppercase text-slate-400 mb-1">Blood Group</p>
                    <p className="text-xs font-black text-rose-600">{activePatient.bloodGroup}</p>
                 </div>
                 <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
                    <p className="text-[9px] font-black uppercase text-slate-400 mb-1">Status</p>
                    <p className="text-xs font-black text-teal-600 uppercase">Consulting</p>
                 </div>
              </div>

              <div className="space-y-4">
                 <div>
                    <h4 className="text-[10px] font-black uppercase text-slate-500 mb-2 flex items-center gap-2">
                       <AlertCircle className="w-3 h-3 text-rose-500" /> Allergies
                    </h4>
                    <div className="flex flex-wrap gap-2">
                       {activePatient.allergies.map(a => (
                         <span key={a} className="px-2 py-1 bg-rose-500/10 text-rose-600 rounded-lg text-[10px] font-bold border border-rose-500/10">{a}</span>
                       ))}
                    </div>
                 </div>
                 <div>
                    <h4 className="text-[10px] font-black uppercase text-slate-500 mb-2">History Highlights</h4>
                    <div className="space-y-2">
                       {activePatient.antecedents.map(a => (
                         <div key={a} className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300">
                            <ChevronRight className="w-3 h-3 text-teal-500" /> {a}
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
           </div>

           {/* Vitals Entry */}
           <div className="bg-slate-900 dark:bg-slate-950 p-6 rounded-[2rem] border border-white/5 text-white shadow-xl space-y-6">
              <div className="flex items-center justify-between">
                 <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">Current Vitals</h3>
                 <Activity className="w-4 h-4 text-teal-400" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-1">
                    <p className="text-[9px] font-black text-white/40 uppercase">BP (mmHg)</p>
                    <input defaultValue={activePatient.vitals.bp} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm font-bold focus:border-teal-500 outline-none" />
                 </div>
                 <div className="space-y-1">
                    <p className="text-[9px] font-black text-white/40 uppercase">Temp (°C)</p>
                    <input defaultValue={activePatient.vitals.temp} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm font-bold focus:border-teal-500 outline-none" />
                 </div>
                 <div className="space-y-1">
                    <p className="text-[9px] font-black text-white/40 uppercase">Pulse (bpm)</p>
                    <input defaultValue={activePatient.vitals.pulse} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm font-bold focus:border-teal-500 outline-none" />
                 </div>
                 <div className="space-y-1">
                    <p className="text-[9px] font-black text-white/40 uppercase">Weight (kg)</p>
                    <input defaultValue={activePatient.vitals.weight} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm font-bold focus:border-teal-500 outline-none" />
                 </div>
              </div>
           </div>
        </div>

        {/* RIGHT COLUMN: Consultation Flow (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
           <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
              <Tabs defaultValue="clinical" className="w-full">
                 <TabsList className="w-full justify-start bg-slate-50 dark:bg-slate-800/50 p-2 h-auto border-b border-slate-100 dark:border-slate-800">
                    <TabsTrigger value="clinical" className="rounded-xl px-6 py-2.5 font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:shadow-sm">
                       Clinical Notes
                    </TabsTrigger>
                    <TabsTrigger value="prescription" className="rounded-xl px-6 py-2.5 font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:shadow-sm">
                       Prescription
                    </TabsTrigger>
                    <TabsTrigger value="exams" className="rounded-xl px-6 py-2.5 font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:shadow-sm">
                       Requested Exams
                    </TabsTrigger>
                    <TabsTrigger value="documents" className="rounded-xl px-6 py-2.5 font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:shadow-sm">
                       Certificates
                    </TabsTrigger>
                 </TabsList>

                 <div className="p-8">
                    {/* Clinical Notes Tab */}
                    <TabsContent value="clinical" className="mt-0 space-y-8">
                       <div className="space-y-4">
                          <h4 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
                             <ClipboardList className="w-4 h-4 text-teal-600" /> Symptoms & Observation
                          </h4>
                          <div className="flex gap-2">
                             <input 
                                value={currentSymptom}
                                onChange={(e) => setCurrentSymptom(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleAddSymptom()}
                                placeholder="E.g. Persistent cough, headache..." 
                                className="flex-1 px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:border-teal-500 outline-none transition-all"
                             />
                             <button onClick={handleAddSymptom} className="px-4 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl text-[10px] font-black uppercase tracking-widest">
                                Add
                             </button>
                          </div>
                          <div className="flex flex-wrap gap-2">
                             {symptoms.map((s, i) => (
                               <div key={i} className="flex items-center gap-2 px-3 py-1.5 bg-teal-50 dark:bg-teal-500/10 text-teal-700 dark:text-teal-400 rounded-lg text-xs font-bold border border-teal-200 dark:border-teal-500/20 group">
                                  {s}
                                  <button onClick={() => setSymptoms(symptoms.filter((_, idx) => idx !== i))} className="hover:text-rose-600">
                                     <Trash2 className="w-3 h-3" />
                                  </button>
                               </div>
                             ))}
                          </div>
                       </div>

                       <div className="space-y-4">
                          <h4 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
                             <CheckCircle2 className="w-4 h-4 text-teal-600" /> Final Diagnosis
                          </h4>
                          <textarea 
                             value={diagnosis}
                             onChange={(e) => setDiagnosis(e.target.value)}
                             rows={4}
                             placeholder="Provide the clinical diagnosis..." 
                             className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm focus:border-teal-500 outline-none transition-all resize-none"
                          />
                       </div>

                       <div className="space-y-4">
                          <h4 className="text-[10px] font-black uppercase text-slate-500 flex items-center gap-2">
                             Additional Notes
                          </h4>
                          <textarea 
                             value={notes}
                             onChange={(e) => setNotes(e.target.value)}
                             rows={3}
                             placeholder="Any internal notes or follow-up plans..." 
                             className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm focus:border-teal-500 outline-none transition-all resize-none border-dashed"
                          />
                       </div>
                    </TabsContent>

                    {/* Prescription Tab */}
                    <TabsContent value="prescription" className="mt-0 space-y-6">
                       <div className="flex items-center justify-between">
                          <h4 className="text-sm font-black text-slate-900 dark:text-white">Medical Prescription</h4>
                          <button onClick={handleAddPrescription} className="flex items-center gap-2 text-teal-600 text-[10px] font-black uppercase tracking-widest hover:bg-teal-50 dark:hover:bg-teal-500/10 px-3 py-1.5 rounded-lg transition-all">
                             <Plus className="w-4 h-4" /> Add Medication
                          </button>
                       </div>

                       <div className="space-y-3">
                          {prescriptions.map((p, i) => (
                            <div key={i} className="grid grid-cols-12 gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                               <div className="col-span-5">
                                  <input 
                                     placeholder="Medication Name" 
                                     className="w-full bg-transparent border-none text-sm font-bold focus:ring-0" 
                                     value={p.med}
                                     onChange={(e) => {
                                        const newP = [...prescriptions];
                                        newP[i].med = e.target.value;
                                        setPrescriptions(newP);
                                     }}
                                  />
                               </div>
                               <div className="col-span-3 border-l border-slate-200 dark:border-slate-700 pl-3">
                                  <input 
                                     placeholder="Dosage" 
                                     className="w-full bg-transparent border-none text-xs focus:ring-0" 
                                     value={p.dose}
                                     onChange={(e) => {
                                        const newP = [...prescriptions];
                                        newP[i].dose = e.target.value;
                                        setPrescriptions(newP);
                                     }}
                                  />
                               </div>
                               <div className="col-span-3 border-l border-slate-200 dark:border-slate-700 pl-3">
                                  <input 
                                     placeholder="Frequency" 
                                     className="w-full bg-transparent border-none text-xs focus:ring-0" 
                                     value={p.freq}
                                     onChange={(e) => {
                                        const newP = [...prescriptions];
                                        newP[i].freq = e.target.value;
                                        setPrescriptions(newP);
                                     }}
                                  />
                               </div>
                               <div className="col-span-1 flex items-center justify-center">
                                  <button onClick={() => setPrescriptions(prescriptions.filter((_, idx) => idx !== i))} className="text-slate-400 hover:text-rose-600">
                                     <Trash2 className="w-4 h-4" />
                                  </button>
                               </div>
                            </div>
                          ))}
                          {prescriptions.length === 0 && (
                             <div className="py-10 text-center border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-[2rem]">
                                <Pill className="w-10 h-10 text-slate-200 mx-auto mb-3" />
                                <p className="text-sm text-slate-400 font-medium">No medications added yet.</p>
                             </div>
                          )}
                       </div>

                       <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                             <div className="w-10 h-10 rounded-full bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600">
                                <PenTool className="w-4 h-4" />
                             </div>
                             <p className="text-xs font-bold text-slate-600 dark:text-slate-400">Electronic Signature Enabled</p>
                          </div>
                          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all">
                             <Printer className="w-4 h-4" /> Print Ordonnance
                          </button>
                       </div>
                    </TabsContent>

                    {/* Exams Tab */}
                    <TabsContent value="exams" className="mt-0 space-y-6">
                       <h4 className="text-sm font-black text-slate-900 dark:text-white">Laboratory & Radiology Exams</h4>
                       <div className="grid grid-cols-2 gap-4">
                          {[
                            "Complete Blood Count (CBC)",
                            "Urinalysis",
                            "Chest X-Ray",
                            "Blood Glucose Test",
                            "Lipid Profile",
                            "MRI Scan",
                            "CT Scan",
                            "ECG / EKG"
                          ].map(exam => (
                            <label key={exam} className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 cursor-pointer hover:border-teal-500/30 transition-all">
                               <input type="checkbox" className="w-4 h-4 accent-teal-600" />
                               <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{exam}</span>
                            </label>
                          ))}
                       </div>
                    </TabsContent>

                    {/* Certificates Tab */}
                    <TabsContent value="documents" className="mt-0 space-y-6">
                       <div className="grid grid-cols-2 gap-6">
                          <div className="p-6 bg-gradient-to-br from-teal-600 to-cyan-600 rounded-[2rem] text-white space-y-4 shadow-xl shadow-teal-500/20 group cursor-pointer hover:scale-[1.02] transition-all">
                             <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                                <FileText className="w-6 h-6" />
                             </div>
                             <div>
                                <h4 className="text-lg font-black tracking-tight">Medical Certificate</h4>
                                <p className="text-xs text-white/70">Generate work/school absence certificate.</p>
                             </div>
                             <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest pt-2 opacity-0 group-hover:opacity-100 transition-all">
                                Generate Now <ChevronRight className="w-3 h-3" />
                             </div>
                          </div>
                          
                          <div className="p-6 bg-slate-900 dark:bg-slate-950 rounded-[2rem] text-white space-y-4 shadow-xl group cursor-pointer hover:scale-[1.02] transition-all">
                             <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center">
                                <Download className="w-6 h-6" />
                             </div>
                             <div>
                                <h4 className="text-lg font-black tracking-tight">Referral Letter</h4>
                                <p className="text-xs text-white/50">Refer patient to a specialized practitioner.</p>
                             </div>
                             <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest pt-2 opacity-0 group-hover:opacity-100 transition-all">
                                Draft Letter <ChevronRight className="w-3 h-3" />
                             </div>
                          </div>
                       </div>
                    </TabsContent>
                 </div>
              </Tabs>
           </div>
        </div>
      </div>
    </div>
  );
}
