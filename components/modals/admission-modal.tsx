"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { BedDouble, User, Calendar, MapPin, ClipboardList } from "lucide-react";

export default function AdmissionModal() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    patient: "",
    room: "",
    reason: "",
    date: new Date().toISOString().split('T')[0],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`Patient Admitted!`, {
      description: `${form.patient} has been assigned to Room ${form.room}.`,
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="px-6 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg hover:scale-105 transition-all">
          New Admission
        </button>
      </DialogTrigger>
      <DialogContent className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-black flex items-center gap-2">
             <BedDouble className="w-6 h-6 text-teal-600" /> Patient Admission
          </DialogTitle>
          <DialogDescription>
            Allocate a bed and confirm the admission details.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
           <div>
              <label className="block text-[10px] font-black uppercase text-slate-500 mb-1.5 ml-1">Patient *</label>
              <div className="relative">
                 <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                 <input 
                    required
                    placeholder="Search patient..."
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:border-teal-500 transition-all"
                    value={form.patient}
                    onChange={(e) => setForm({...form, patient: e.target.value})}
                 />
              </div>
           </div>

           <div className="grid grid-cols-2 gap-4">
              <div>
                 <label className="block text-[10px] font-black uppercase text-slate-500 mb-1.5 ml-1">Room/Bed *</label>
                 <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <select 
                       required
                       className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:border-teal-500 transition-all"
                       value={form.room}
                       onChange={(e) => setForm({...form, room: e.target.value})}
                    >
                       <option value="">Select Room</option>
                       <option value="101">101 (ICU)</option>
                       <option value="102">102 (ICU)</option>
                       <option value="201">201 (Gen)</option>
                    </select>
                 </div>
              </div>
              <div>
                 <label className="block text-[10px] font-black uppercase text-slate-500 mb-1.5 ml-1">Admission Date</label>
                 <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                       type="date"
                       required
                       className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:border-teal-500 transition-all"
                       value={form.date}
                       onChange={(e) => setForm({...form, date: e.target.value})}
                    />
                 </div>
              </div>
           </div>

           <div>
              <label className="block text-[10px] font-black uppercase text-slate-500 mb-1.5 ml-1">Admission Reason</label>
              <div className="relative">
                 <ClipboardList className="absolute left-3 top-4 w-4 h-4 text-slate-400" />
                 <textarea 
                    rows={3}
                    placeholder="E.g. Post-operative recovery, Observation..."
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:border-teal-500 transition-all resize-none"
                    value={form.reason}
                    onChange={(e) => setForm({...form, reason: e.target.value})}
                 />
              </div>
           </div>

           <DialogFooter className="pt-4 gap-2">
              <button type="button" onClick={() => setOpen(false)} className="px-6 py-2.5 text-[10px] font-black uppercase tracking-widest text-slate-500">Cancel</button>
              <button type="submit" className="px-8 py-2.5 bg-teal-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-teal-500/20">Confirm Admission</button>
           </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
