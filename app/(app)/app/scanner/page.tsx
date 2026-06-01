"use client";

import { useState } from "react";
import { 
  Scan, Camera, Zap, ShieldCheck, 
  History, Settings, Pill, User,
  FileText, DoorOpen, Search, X,
  Maximize2
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function QRScannerPage() {
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState<null | { type: string; id: string; data: string }>(null);

  const startScan = () => {
    setScanning(true);
    setScanResult(null);
    // Simulate scan success after 2 seconds
    setTimeout(() => {
      setScanning(false);
      setScanResult({
        type: "Patient Bracelet",
        id: "PAT-2026-9921",
        data: "John Wick • Type O+ • No Allergies"
      });
    }, 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
         <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Clinical Scanner</h1>
         <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium">Scan patient bracelets, medications, or lab samples instantly.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Scanner Viewport */}
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden p-8 space-y-6">
           <div className="aspect-[4/3] bg-slate-100 dark:bg-slate-950 rounded-[2rem] relative overflow-hidden flex items-center justify-center group">
              {scanning ? (
                <>
                  <div className="absolute inset-0 bg-teal-500/10 animate-pulse" />
                  <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-teal-500 shadow-[0_0_15px_rgba(20,184,166,0.8)] animate-scan" />
                  <Camera className="w-12 h-12 text-teal-500 animate-bounce" />
                </>
              ) : scanResult ? (
                <div className="text-center space-y-4 p-8 animate-in zoom-in-95 duration-300">
                   <div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto border border-emerald-100 dark:border-emerald-500/20">
                      <ShieldCheck className="w-10 h-10 text-emerald-500" />
                   </div>
                   <div>
                      <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Successfully Scanned</p>
                      <h3 className="text-xl font-black mt-1">{scanResult.type}</h3>
                      <p className="text-xs text-slate-500 font-bold mt-1">ID: {scanResult.id}</p>
                   </div>
                   <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl text-sm font-medium">
                      {scanResult.data}
                   </div>
                   <button onClick={() => setScanResult(null)} className="text-xs font-black text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors">
                      Clear & Scan Again
                   </button>
                </div>
              ) : (
                <div className="text-center space-y-4">
                   <div className="w-24 h-24 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[2rem] flex items-center justify-center mx-auto group-hover:border-teal-500 transition-colors">
                      <Scan className="w-10 h-10 text-slate-300 group-hover:text-teal-500 transition-colors" />
                   </div>
                   <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Camera Ready</p>
                </div>
              )}
              
              <button className="absolute top-6 right-6 p-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur rounded-2xl border border-white/20">
                 <Maximize2 className="w-4 h-4 text-slate-400" />
              </button>
           </div>

           <button 
             disabled={scanning}
             onClick={startScan}
             className={cn(
               "w-full py-5 rounded-[2rem] font-black text-sm uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3",
               scanning ? "bg-slate-100 text-slate-400" : "bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:scale-[1.02] shadow-xl"
             )}
           >
              {scanning ? <Zap className="w-5 h-5 animate-spin" /> : <Camera className="w-5 h-5" />}
              {scanning ? "Processing..." : "Launch Scanner"}
           </button>
        </div>

        {/* Quick Actions & Tips */}
        <div className="space-y-8">
           <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Medicine", icon: Pill, color: "text-rose-500", bg: "bg-rose-50" },
                { label: "Patient", icon: User, color: "text-indigo-500", bg: "bg-indigo-50" },
                { label: "Report", icon: FileText, color: "text-teal-500", bg: "bg-teal-50" },
                { label: "Room", icon: DoorOpen, color: "text-amber-500", bg: "bg-amber-50" },
              ].map((item, i) => (
                <button key={i} className="p-8 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm hover:border-teal-500 transition-all text-left group">
                   <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110", item.bg)}>
                      <item.icon className={cn("w-6 h-6", item.color)} />
                   </div>
                   <p className="text-xs font-black uppercase tracking-widest text-slate-400">{item.label}</p>
                   <p className="font-bold text-slate-900 dark:text-white mt-1">Quick Scan</p>
                </button>
              ))}
           </div>

           <div className="bg-indigo-900 text-white rounded-[2.5rem] p-8 space-y-6">
              <h3 className="text-lg font-black tracking-tight">Scanner Tips</h3>
              <ul className="space-y-4">
                 {[
                   "Ensure patient barcode is clean and visible",
                   "Scan medication during dosage preparation",
                   "Samples must be scanned before lab entry"
                 ].map((tip, i) => (
                   <li key={i} className="flex items-start gap-3 text-xs opacity-70 leading-relaxed font-medium">
                      <span className="mt-1 w-1.5 h-1.5 rounded-full bg-teal-400 shrink-0" />
                      {tip}
                   </li>
                 ))}
              </ul>
           </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        .animate-scan {
          animation: scan 2s linear infinite;
        }
      `}</style>
    </div>
  );
}
