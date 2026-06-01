"use client";

import { useState } from "react";
import { 
  Bell, 
  MessageSquare, 
  Mail, 
  Smartphone, 
  Calendar, 
  AlertCircle, 
  CheckCircle2, 
  Pill, 
  CreditCard,
  Settings2,
  Filter,
  Search,
  MoreVertical,
  Check,
  ChevronRight,
  Send,
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";

const notificationsLog = [
  { id: 1, type: "Appointment", title: "New Appointment Booked", desc: "Md Tajuddin scheduled a Cardiology visit", time: "2 min ago", channel: ["Push", "Email"], status: "Sent", icon: <Calendar className="w-4 h-4" />, color: "bg-teal-500" },
  { id: 2, type: "Pharmacy", title: "Low Stock Alert", desc: "Amoxicillin is below 15% threshold", time: "15 min ago", channel: ["Push", "SMS"], status: "Sent", icon: <Pill className="w-4 h-4" />, color: "bg-rose-500" },
  { id: 3, type: "Lab", title: "Lab Result Available", desc: "Blood test for Sarah Miller is ready", time: "1h ago", channel: ["Push", "WhatsApp"], status: "Sent", icon: <CheckCircle2 className="w-4 h-4" />, color: "bg-indigo-500" },
  { id: 4, type: "Billing", title: "Payment Received", desc: "Invoice INV-8821 paid by card", time: "3h ago", channel: ["Email"], status: "Sent", icon: <CreditCard className="w-4 h-4" />, color: "bg-emerald-500" },
  { id: 5, type: "Emergency", title: "Emergency Admission", desc: "Critical patient in Room 402", time: "5h ago", channel: ["Push", "SMS", "WhatsApp"], status: "Critical", icon: <AlertCircle className="w-4 h-4" />, color: "bg-rose-600" },
];

export default function NotificationsPage() {
  const [filter, setFilter] = useState("All");

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
           <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-1">Communication / System</p>
           <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Notification Center</h1>
           <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium">Configure automated alerts and monitor multi-channel delivery.</p>
        </div>
        
        <div className="flex items-center gap-3">
           <button className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-300 hover:bg-slate-50 transition-all shadow-sm">
              <Settings2 className="w-4 h-4" /> Global Settings
           </button>
           <button className="flex items-center gap-2 px-6 py-2.5 bg-teal-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-teal-500/20 hover:scale-105 transition-all">
              <Send className="w-4 h-4" /> Send Broadcast
           </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
         {/* LEFT: Channel Configuration (4 cols) */}
         <div className="lg:col-span-4 space-y-8">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm space-y-8">
               <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Active Channels</h3>
               
               <div className="space-y-6">
                  {[
                    { id: "push", name: "Push Notifications", icon: <Bell className="w-5 h-5" />, desc: "Browser & Mobile app", status: "Active", color: "text-teal-600 bg-teal-50" },
                    { id: "sms", name: "SMS Alerts", icon: <Smartphone className="w-5 h-5" />, desc: "Direct phone messages", status: "Active", color: "text-blue-600 bg-blue-50" },
                    { id: "email", name: "Email Reports", icon: <Mail className="w-5 h-5" />, desc: "Reports & Invoices", status: "Active", color: "text-indigo-600 bg-indigo-50" },
                    { id: "whatsapp", name: "WhatsApp Business", icon: <MessageSquare className="w-5 h-5" />, desc: "Automated chat bot", status: "Beta", color: "text-emerald-600 bg-emerald-50" },
                  ].map(channel => (
                    <div key={channel.id} className="flex items-center justify-between group">
                       <div className="flex items-center gap-4">
                          <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm", channel.color)}>
                             {channel.icon}
                          </div>
                          <div>
                             <p className="text-sm font-black text-slate-900 dark:text-white">{channel.name}</p>
                             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{channel.desc}</p>
                          </div>
                       </div>
                       <Switch defaultChecked />
                    </div>
                  ))}
               </div>

               <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                  <div className="p-5 bg-teal-50 dark:bg-teal-500/5 rounded-2xl border border-teal-500/20 space-y-3">
                     <div className="flex items-center gap-2 text-teal-600">
                        <Zap className="w-4 h-4" />
                        <span className="text-[10px] font-black uppercase tracking-widest">AI Delivery Logic</span>
                     </div>
                     <p className="text-[11px] text-slate-600 dark:text-slate-400 font-medium leading-relaxed">Hopify AI automatically chooses the best channel based on urgency and patient preference.</p>
                  </div>
               </div>
            </div>

            {/* Notification Rules */}
            <div className="bg-slate-900 dark:bg-slate-950 p-8 rounded-[2.5rem] text-white shadow-xl space-y-6">
               <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Automation Rules</h3>
               <div className="space-y-4">
                  {[
                    "New appointment confirmation",
                    "Stock levels < 15%",
                    "Lab results validation",
                    "Emergency bedside alerts",
                    "Payment overdue reminders"
                  ].map((rule, i) => (
                    <div key={i} className="flex items-center gap-3">
                       <div className="w-5 h-5 rounded-full bg-teal-500 flex items-center justify-center text-white shrink-0">
                          <Check className="w-3 h-3" />
                       </div>
                       <span className="text-xs font-bold opacity-80">{rule}</span>
                    </div>
                  ))}
               </div>
               <button className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">Edit Rules</button>
            </div>
         </div>

         {/* RIGHT: Notifications Log (8 cols) */}
         <div className="lg:col-span-8 space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
               <div className="p-8 border-b border-slate-50 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <h3 className="text-xl font-black text-slate-900 dark:text-white">Delivery Log</h3>
                  <div className="flex items-center gap-4">
                     <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input placeholder="Search logs..." className="pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-[10px] font-black uppercase tracking-widest outline-none focus:border-teal-500 transition-all" />
                     </div>
                     <div className="flex bg-slate-50 dark:bg-slate-800 rounded-xl p-1 border border-slate-100 dark:border-slate-700">
                       {["All", "Sent", "Failed"].map((f) => (
                         <button
                           key={f}
                           onClick={() => setFilter(f)}
                           className={cn(
                             "px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all",
                             filter === f ? "bg-white dark:bg-slate-900 text-teal-600 shadow-sm" : "text-slate-500"
                           )}
                         >
                           {f}
                         </button>
                       ))}
                     </div>
                  </div>
               </div>

               <div className="divide-y divide-slate-50 dark:divide-slate-800">
                  {notificationsLog.map((log) => (
                    <div key={log.id} className="p-6 flex items-start gap-6 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-all group">
                       <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg shrink-0", log.color)}>
                          {log.icon}
                       </div>
                       <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-1">
                             <h4 className="text-sm font-black text-slate-900 dark:text-white truncate">{log.title}</h4>
                             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{log.time}</span>
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{log.desc}</p>
                          <div className="flex items-center gap-4 mt-3">
                             <div className="flex items-center gap-1.5">
                                {log.channel.map(c => (
                                   <span key={c} className="text-[8px] font-black px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 uppercase tracking-widest">{c}</span>
                                ))}
                             </div>
                             <div className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-emerald-600">
                                <CheckCircle2 className="w-3.5 h-3.5" /> {log.status}
                             </div>
                          </div>
                       </div>
                       <button className="p-2 text-slate-400 hover:text-teal-600 transition-colors opacity-0 group-hover:opacity-100">
                          <ChevronRight className="w-5 h-5" />
                       </button>
                    </div>
                  ))}
               </div>

               <div className="p-8 border-t border-slate-50 dark:border-slate-800 text-center">
                  <button className="text-[10px] font-black text-slate-400 hover:text-teal-600 uppercase tracking-[0.2em] transition-colors">Load More History</button>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
