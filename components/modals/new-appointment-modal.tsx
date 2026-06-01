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
import { CalendarPlus, Video, AlertTriangle, Building2, User, Bell } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const doctors = [
  { id: "1", name: "Dr. Sarah Miller", specialty: "General Medicine" },
  { id: "2", name: "Dr. James Chen", specialty: "Cardiology" },
  { id: "3", name: "Dr. Elena Rodriguez", specialty: "Neurology" },
];

const rooms = ["Room 101", "Room 102", "Room 205 (OR)", "Consultation A", "Telehealth Hub"];

export default function NewAppointmentModal() {
  const [open, setOpen] = useState(false);
  const [isUrgent, setIsUrgent] = useState(false);
  const [form, setForm] = useState({
    patient: "",
    doctor: "",
    service: "",
    date: "",
    time: "",
    room: "",
    type: "in-person",
    reminders: { email: true, sms: true },
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`Appointment scheduled!`, {
      description: `${form.patient} — ${form.service} with ${doctors.find(d => d.id === form.doctor)?.name || "Doctor"} at ${form.time}. ${form.reminders.sms ? "SMS Sent." : ""}`,
    });
    setForm({ 
      patient: "", doctor: "", service: "", date: "", time: "", 
      room: "", type: "in-person", reminders: { email: true, sms: true }, notes: "" 
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white px-5 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2 transition-all shadow-sm shadow-teal-500/20">
          <CalendarPlus className="w-4 h-4" />
          New Appointment
        </button>
      </DialogTrigger>
      <DialogContent className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-slate-900 dark:text-white text-xl flex items-center gap-2">
            <CalendarPlus className="w-5 h-5 text-teal-600" />
            Book Medical Visit
          </DialogTitle>
          <DialogDescription className="text-slate-500 dark:text-slate-400">
            Select a slot, assign a practitioner and a room for this session.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-4 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-black uppercase text-slate-500 mb-1.5 ml-1">Patient Name *</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    required
                    value={form.patient}
                    onChange={(e) => setForm({ ...form, patient: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:border-teal-500 outline-none transition-all dark:text-slate-200"
                    placeholder="Search patient..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-slate-500 mb-1.5 ml-1">Practitioner *</label>
                <select
                  required
                  value={form.doctor}
                  onChange={(e) => setForm({ ...form, doctor: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:border-teal-500 outline-none transition-all dark:text-slate-200"
                >
                  <option value="">Select Doctor</option>
                  {doctors.map(d => (
                    <option key={d.id} value={d.id}>{d.name} ({d.specialty})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-500 mb-1.5 ml-1">Date</label>
                  <input
                    type="date"
                    required
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:border-teal-500 outline-none transition-all dark:text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-500 mb-1.5 ml-1">Time</label>
                  <input
                    type="time"
                    required
                    value={form.time}
                    onChange={(e) => setForm({ ...form, time: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:border-teal-500 outline-none transition-all dark:text-slate-200"
                  />
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
               <div>
                  <label className="block text-[10px] font-black uppercase text-slate-500 mb-1.5 ml-1">Assigned Room</label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <select
                      value={form.room}
                      onChange={(e) => setForm({ ...form, room: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:border-teal-500 outline-none transition-all dark:text-slate-200"
                    >
                      <option value="">Select Room</option>
                      {rooms.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>
               </div>

               <div>
                  <label className="block text-[10px] font-black uppercase text-slate-500 mb-1.5 ml-1">Visit Type</label>
                  <div className="flex gap-2">
                    <button 
                      type="button"
                      onClick={() => setForm({ ...form, type: "in-person" })}
                      className={cn(
                        "flex-1 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest border transition-all",
                        form.type === "in-person" ? "bg-teal-600 text-white border-teal-600" : "bg-white dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700"
                      )}
                    >
                      In-Person
                    </button>
                    <button 
                      type="button"
                      onClick={() => setForm({ ...form, type: "video" })}
                      className={cn(
                        "flex-1 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest border flex items-center justify-center gap-2 transition-all",
                        form.type === "video" ? "bg-indigo-600 text-white border-indigo-600" : "bg-white dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700"
                      )}
                    >
                      <Video className="w-3 h-3" /> Video Call
                    </button>
                  </div>
               </div>

               <div className="p-4 bg-amber-50 dark:bg-amber-500/5 rounded-2xl border border-amber-500/10">
                  <div className="flex items-center justify-between">
                     <div className="flex items-center gap-2">
                        <AlertTriangle className={cn("w-4 h-4", isUrgent ? "text-rose-600" : "text-amber-600")} />
                        <span className="text-xs font-bold text-slate-900 dark:text-white">Emergency Booking</span>
                     </div>
                     <input 
                        type="checkbox" 
                        checked={isUrgent} 
                        onChange={(e) => setIsUrgent(e.target.checked)}
                        className="w-4 h-4 accent-teal-600"
                     />
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1">Bypasses queue and notifies practitioner immediately.</p>
               </div>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
             <div className="flex items-center gap-3">
                <Bell className="w-4 h-4 text-teal-600" />
                <span className="text-xs font-bold">Patient Notifications</span>
             </div>
             <div className="flex gap-4">
                <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-500">
                   <input type="checkbox" checked={form.reminders.email} onChange={(e) => setForm({...form, reminders: {...form.reminders, email: e.target.checked}})} className="accent-teal-600" /> Email
                </label>
                <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-500">
                   <input type="checkbox" checked={form.reminders.sms} onChange={(e) => setForm({...form, reminders: {...form.reminders, sms: e.target.checked}})} className="accent-teal-600" /> SMS
                </label>
             </div>
          </div>

          <DialogFooter className="gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button type="button" onClick={() => setOpen(false)} className="px-6 py-2.5 text-[10px] font-black uppercase tracking-widest text-slate-500">
              Cancel
            </button>
            <button type="submit" className="px-8 py-2.5 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-teal-500/20">
              Schedule Appointment
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
