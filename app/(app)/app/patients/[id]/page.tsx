"use client";

import { use, useState } from "react";
import { 
  ArrowLeft, 
  Calendar, 
  FileText, 
  Activity, 
  Shield, 
  Phone, 
  Mail, 
  MapPin, 
  Download, 
  Printer,
  History,
  AlertCircle,
  Stethoscope,
  Pill,
  Clock,
  MoreVertical,
  QrCode,
  CreditCard,
  Plus
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for a single patient
const patientData = {
  id: "PAT-0012",
  name: "Md Tajuddin",
  avatar: "MT",
  email: "tajuddin@example.com",
  phone: "+880 1711-223344",
  dob: "1992-05-15",
  age: 34,
  gender: "Male",
  bloodGroup: "O+",
  insurance: "MetLife Medical #882299",
  address: "Dhaka, Bangladesh",
  status: "Active",
  emergencyContact: {
    name: "Farhana Ahmed",
    phone: "+880 1722-998877",
    relation: "Spouse"
  },
  allergies: ["Penicillin", "Peanuts"],
  antecedents: ["Type 2 Diabetes", "Mild Hypertension"],
  history: [
    {
      id: "VIS-102",
      date: "Apr 15, 2026",
      doctor: "Dr. Sarah Miller",
      reason: "General Checkup",
      diagnosis: "Stable. Blood pressure slightly elevated.",
      prescription: ["Metformin 500mg", "Lisinopril 10mg"],
      type: "Consultation"
    },
    {
      id: "LAB-405",
      date: "Mar 20, 2026",
      doctor: "Dr. James Chen",
      reason: "Blood Test",
      diagnosis: "HbA1c: 6.8% (Borderline)",
      prescription: [],
      type: "Laboratory"
    },
    {
      id: "VIS-089",
      date: "Jan 05, 2026",
      doctor: "Dr. Sarah Miller",
      reason: "Flu Symptoms",
      diagnosis: "Common Cold",
      prescription: ["Paracetamol 500mg"],
      type: "Urgency"
    }
  ],
  documents: [
    { name: "Blood_Analysis_March.pdf", size: "1.2 MB", date: "Mar 20, 2026" },
    { name: "Chest_XRay_Results.pdf", size: "4.5 MB", date: "Jan 10, 2026" }
  ]
};

export default function PatientDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-20">
      {/* Back Button & Actions */}
      <div className="flex items-center justify-between">
        <Link 
          href="/app/patients" 
          className="flex items-center gap-2 text-slate-500 hover:text-teal-600 transition-colors font-bold text-xs uppercase tracking-widest"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Directory
        </Link>
        <div className="flex items-center gap-3">
          <Link 
            href={`/app/consultations/${id}`}
            className="flex items-center gap-2 px-6 py-2.5 bg-teal-600 text-white rounded-xl text-xs font-black hover:scale-105 transition-all uppercase tracking-widest shadow-lg shadow-teal-500/20"
          >
            <Stethoscope className="w-4 h-4" /> Start Consultation
          </Link>
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all uppercase tracking-widest">
            <Printer className="w-3.5 h-3.5" /> Print Record
          </button>
        </div>
      </div>

      {/* Profile Header Card */}
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-colors">
        <div className="p-8 lg:p-10 flex flex-col lg:flex-row gap-10 items-start lg:items-center">
          <div className="relative group">
            <div className="w-32 h-32 rounded-[2rem] bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-white text-4xl font-black shadow-2xl shadow-teal-500/20">
              {patientData.avatar}
            </div>
            <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full flex items-center justify-center text-slate-500 shadow-lg hover:text-teal-600 transition-colors">
              <QrCode className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex-1 space-y-4">
             <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <h1 className="text-3xl font-black text-slate-900 dark:text-white">{patientData.name}</h1>
                <span className="px-3 py-1 bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 border border-green-100 dark:border-green-500/20 rounded-full text-[10px] font-black uppercase tracking-widest">
                  {patientData.status}
                </span>
             </div>
             <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
                   <div className="w-8 h-8 rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center justify-center">
                      <CreditCard className="w-4 h-4" />
                   </div>
                   <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">ID Patient</p>
                      <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{patientData.id}</p>
                   </div>
                </div>
                <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
                   <div className="w-8 h-8 rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center justify-center">
                      <Calendar className="w-4 h-4" />
                   </div>
                   <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Birth Date</p>
                      <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{patientData.dob} ({patientData.age}y)</p>
                   </div>
                </div>
                <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
                   <div className="w-8 h-8 rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center justify-center">
                      <Activity className="w-4 h-4 text-teal-500" />
                   </div>
                   <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Blood Group</p>
                      <p className="text-sm font-black text-teal-600">{patientData.bloodGroup}</p>
                   </div>
                </div>
             </div>
          </div>

          <div className="w-full lg:w-auto p-6 bg-slate-50 dark:bg-slate-800/50 rounded-[2rem] border border-slate-100 dark:border-slate-800 space-y-4">
             <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-teal-600" />
                <p className="text-sm font-bold text-slate-900 dark:text-white">Insurance Policy</p>
             </div>
             <p className="text-xs font-medium text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700">
                {patientData.insurance}
             </p>
             <button className="w-full py-2 bg-teal-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-teal-700 transition-colors">
                Digital Health Card
             </button>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column: Summary & Info */}
        <div className="space-y-6">
           {/* Contact Card */}
           <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                 Contact Information
              </h3>
              <div className="space-y-4">
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-500/10 flex items-center justify-center text-teal-600">
                       <Phone className="w-4 h-4" />
                    </div>
                    <div>
                       <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Phone</p>
                       <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{patientData.phone}</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600">
                       <Mail className="w-4 h-4" />
                    </div>
                    <div>
                       <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Email</p>
                       <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{patientData.email}</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center text-amber-600">
                       <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                       <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Address</p>
                       <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{patientData.address}</p>
                    </div>
                 </div>
              </div>
           </div>

           {/* Emergency Card */}
           <div className="bg-rose-50 dark:bg-rose-500/5 p-8 rounded-[2.5rem] border border-rose-100 dark:border-rose-500/10 space-y-6">
              <h3 className="text-lg font-black text-rose-900 dark:text-rose-400 flex items-center gap-2">
                 <AlertCircle className="w-5 h-5" /> Emergency
              </h3>
              <div className="space-y-2">
                 <p className="text-sm font-black text-slate-900 dark:text-white">{patientData.emergencyContact.name}</p>
                 <p className="text-xs font-bold text-rose-600/70 uppercase tracking-widest">{patientData.emergencyContact.relation}</p>
                 <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-bold pt-2">
                    <Phone className="w-4 h-4" />
                    {patientData.emergencyContact.phone}
                 </div>
              </div>
           </div>

           {/* Allergies & Antecedents */}
           <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              <div className="space-y-6">
                 <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Allergies</h4>
                    <div className="flex flex-wrap gap-2">
                       {patientData.allergies.map(a => (
                         <span key={a} className="px-3 py-1 bg-rose-500/10 text-rose-600 rounded-lg text-[10px] font-black border border-rose-500/20">{a}</span>
                       ))}
                    </div>
                 </div>
                 <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Medical Antecedents</h4>
                    <div className="space-y-2">
                       {patientData.antecedents.map(a => (
                         <div key={a} className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300">
                            <div className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                            {a}
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Right Column: History & Tabs */}
        <div className="lg:col-span-2 space-y-6">
           <Tabs defaultValue="history" className="w-full">
              <TabsList className="bg-white dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 mb-6">
                 <TabsTrigger value="history" className="rounded-xl px-8 font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-teal-600 data-[state=active]:text-white">
                    <History className="w-3.5 h-3.5 mr-2" /> Medical History
                 </TabsTrigger>
                 <TabsTrigger value="documents" className="rounded-xl px-8 font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-teal-600 data-[state=active]:text-white">
                    <FileText className="w-3.5 h-3.5 mr-2" /> Documents
                 </TabsTrigger>
              </TabsList>

              <TabsContent value="history" className="space-y-6">
                 <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Activity History</h3>
                    <button className="p-2 bg-teal-600 text-white rounded-xl shadow-lg hover:scale-105 transition-all">
                       <Plus className="w-5 h-5" />
                    </button>
                 </div>

                 <div className="space-y-6 relative before:absolute before:left-6 before:top-2 before:bottom-0 before:w-0.5 before:bg-slate-100 dark:before:bg-slate-800">
                    {patientData.history.map((item, i) => (
                      <div key={item.id} className="relative pl-14">
                         <div className={cn(
                           "absolute left-0 w-12 h-12 rounded-2xl flex items-center justify-center border-4 border-white dark:border-slate-950 shadow-sm z-10",
                           item.type === "Consultation" ? "bg-teal-500 text-white" :
                           item.type === "Laboratory" ? "bg-indigo-500 text-white" : "bg-rose-500 text-white"
                         )}>
                            {item.type === "Consultation" ? <Stethoscope className="w-5 h-5" /> :
                             item.type === "Laboratory" ? <Activity className="w-5 h-5" /> : <Shield className="w-5 h-5" />}
                         </div>
                         
                         <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm hover:border-teal-500/30 transition-all group">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                               <div>
                                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{item.date}</p>
                                  <h4 className="text-lg font-black text-slate-900 dark:text-white">{item.reason}</h4>
                               </div>
                               <div className="flex items-center gap-3">
                                  <div className="text-right">
                                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Practitioner</p>
                                     <p className="text-xs font-bold text-slate-700 dark:text-slate-300">{item.doctor}</p>
                                  </div>
                                  <button className="p-2 text-slate-400 hover:text-teal-600 transition-colors">
                                     <MoreVertical className="w-5 h-5" />
                                  </button>
                               </div>
                            </div>
                            
                            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl mb-4 border border-slate-100 dark:border-slate-700">
                               <p className="text-sm font-medium text-slate-600 dark:text-slate-300 leading-relaxed italic">
                                  &quot;{item.diagnosis}&quot;
                               </p>
                            </div>

                            {item.prescription.length > 0 && (
                              <div className="flex flex-wrap gap-3 pt-2">
                                 {item.prescription.map(p => (
                                   <div key={p} className="flex items-center gap-2 px-3 py-1.5 bg-teal-50 dark:bg-teal-500/10 text-teal-700 dark:text-teal-400 rounded-lg text-[10px] font-black border border-teal-200 dark:border-teal-500/20">
                                      <Pill className="w-3 h-3" /> {p}
                                   </div>
                                 ))}
                              </div>
                            )}
                         </div>
                      </div>
                    ))}
                 </div>
              </TabsContent>

              <TabsContent value="documents" className="space-y-6">
                 <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Clinical Documents</h3>
                    <button className="px-4 py-2 bg-teal-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                       <Plus className="w-4 h-4" /> Upload Document
                    </button>
                 </div>
                 
                 <div className="grid sm:grid-cols-2 gap-4">
                    {patientData.documents.map(doc => (
                      <div key={doc.name} className="p-6 bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 flex items-center gap-4 hover:border-teal-500/30 transition-all cursor-pointer group">
                         <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 group-hover:text-teal-600 transition-colors">
                            <FileText className="w-6 h-6" />
                         </div>
                         <div className="flex-1 overflow-hidden">
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">{doc.name}</h4>
                            <p className="text-[10px] font-medium text-slate-500">{doc.size} • {doc.date}</p>
                         </div>
                         <button className="w-8 h-8 rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-teal-600">
                            <Download className="w-4 h-4" />
                         </button>
                      </div>
                    ))}
                 </div>
              </TabsContent>
           </Tabs>
        </div>
      </div>
    </div>
  );
}
