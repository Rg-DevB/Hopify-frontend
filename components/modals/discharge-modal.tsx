"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { LogOut, FileText, CheckCircle2, User } from "lucide-react";

interface DischargeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  patientName: string;
  roomId: string;
}

export default function DischargeModal({ open, onOpenChange, patientName, roomId }: DischargeModalProps) {
  const [report, setReport] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`Patient Discharged!`, {
      description: `${patientName} has been discharged from Room ${roomId}. Discharge report generated.`,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-black flex items-center gap-2">
             <LogOut className="w-6 h-6 text-rose-600" /> Patient Discharge
          </DialogTitle>
          <DialogDescription>
            Complete the discharge process and generate the final medical report.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
           <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                    <User className="w-5 h-5 text-slate-500" />
                 </div>
                 <div>
                    <p className="text-sm font-black text-slate-900 dark:text-white">{patientName}</p>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Room {roomId}</p>
                 </div>
              </div>
           </div>

           <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-500 ml-1">Discharge Summary / Report *</label>
              <div className="relative">
                 <FileText className="absolute left-3 top-4 w-4 h-4 text-slate-400" />
                 <textarea 
                    required
                    rows={5}
                    placeholder="Provide summary of treatment, final diagnosis, and follow-up instructions..."
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm outline-none focus:border-rose-500 transition-all resize-none"
                    value={report}
                    onChange={(e) => setReport(e.target.value)}
                 />
              </div>
           </div>

           <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-500/5 border border-green-500/10 rounded-xl">
                 <CheckCircle2 className="w-4 h-4 text-green-600" />
                 <span className="text-[10px] font-black uppercase text-green-700">Billing Cleared</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-500/5 border border-green-500/10 rounded-xl">
                 <CheckCircle2 className="w-4 h-4 text-green-600" />
                 <span className="text-[10px] font-black uppercase text-green-700">Pharmacy Signed</span>
              </div>
           </div>

           <DialogFooter className="pt-4 gap-2">
              <button type="button" onClick={() => onOpenChange(false)} className="px-6 py-2.5 text-[10px] font-black uppercase tracking-widest text-slate-500">Cancel</button>
              <button type="submit" className="px-8 py-2.5 bg-rose-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-rose-500/20">Finalize Discharge</button>
           </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
