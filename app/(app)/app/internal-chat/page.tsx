"use client";

import { useState } from "react";
import { 
  Send, Paperclip, MoreVertical, Search, 
  Phone, Video, Info, CheckCheck, User, 
  Smile, Shield, Hash, Users, Plus,
  FileText, Image as ImageIcon, Pin,
  Mic, HeartPulse, Stethoscope, Microscope
} from "lucide-react";
import { cn } from "@/lib/utils";

const channels = [
  { id: 1, name: "General Staff", type: "channel", icon: <Users className="w-4 h-4" /> },
  { id: 2, name: "Cardiology Unit", type: "channel", icon: <HeartPulse className="w-4 h-4" /> },
  { id: 3, name: "Emergency Response", type: "channel", icon: <Stethoscope className="w-4 h-4" /> },
  { id: 4, name: "Laboratory Team", type: "channel", icon: <Microscope className="w-4 h-4" /> },
];

const directMessages = [
  { id: 101, name: "Dr. Sarah Miller", status: "online", lastMsg: "Did you check the ECG for PAT-202?", time: "2m", unread: 2 },
  { id: 102, name: "Nurse Jessica", status: "busy", lastMsg: "I've updated the shift logs.", time: "1h", unread: 0 },
  { id: 103, name: "Dr. James Wilson", status: "offline", lastMsg: "See you at the conference.", time: "4h", unread: 0 },
];

export default function InternalChatPage() {
  const [activeTab, setActiveTab] = useState(101);
  const [message, setMessage] = useState("");

  return (
    <div className="max-w-7xl mx-auto h-[calc(100vh-140px)] flex bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
      {/* SIDEBAR: Channels & DMs (300px) */}
      <div className="w-80 border-r border-slate-100 dark:border-slate-800 flex flex-col shrink-0">
         <div className="p-8 border-b border-slate-50 dark:border-slate-800">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Staff Chat</h2>
            <div className="relative mt-6">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
               <input placeholder="Search chat..." className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 rounded-xl text-xs outline-none focus:ring-2 focus:ring-teal-500/20" />
            </div>
         </div>

         <div className="flex-1 overflow-y-auto p-4 space-y-8">
            {/* Channels */}
            <div className="space-y-4">
               <div className="px-4 flex items-center justify-between text-[10px] font-black uppercase text-slate-400 tracking-widest">
                  <span>Medical Units</span>
                  <button className="hover:text-teal-600"><Plus className="w-4 h-4" /></button>
               </div>
               <div className="space-y-1">
                  {channels.map(ch => (
                    <button key={ch.id} className="w-full px-4 py-2.5 rounded-xl flex items-center gap-3 text-sm font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                       <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                          {ch.icon}
                       </div>
                       {ch.name}
                    </button>
                  ))}
               </div>
            </div>

            {/* Direct Messages */}
            <div className="space-y-4">
               <div className="px-4 flex items-center justify-between text-[10px] font-black uppercase text-slate-400 tracking-widest">
                  <span>Direct Messages</span>
                  <button className="hover:text-teal-600"><Plus className="w-4 h-4" /></button>
               </div>
               <div className="space-y-1">
                  {directMessages.map(dm => (
                    <button 
                      key={dm.id} 
                      onClick={() => setActiveTab(dm.id)}
                      className={cn(
                        "w-full px-4 py-3 rounded-2xl flex items-center gap-3 transition-all",
                        activeTab === dm.id ? "bg-teal-50 dark:bg-teal-500/10 text-teal-700 dark:text-teal-400" : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                      )}
                    >
                       <div className="relative">
                          <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-[10px] font-black">
                             {dm.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div className={cn(
                            "absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 border-2 border-white dark:border-slate-900 rounded-full",
                            dm.status === "online" ? "bg-emerald-500" : dm.status === "busy" ? "bg-rose-500" : "bg-slate-400"
                          )} />
                       </div>
                       <div className="flex-1 text-left min-w-0">
                          <p className="text-xs font-black truncate">{dm.name}</p>
                          <p className="text-[10px] opacity-60 truncate font-medium">{dm.lastMsg}</p>
                       </div>
                       {dm.unread > 0 && (
                         <div className="w-5 h-5 bg-teal-600 text-white text-[10px] font-black rounded-lg flex items-center justify-center">
                            {dm.unread}
                         </div>
                       )}
                    </button>
                  ))}
               </div>
            </div>
         </div>

         {/* System Info */}
         <div className="p-6 border-t border-slate-50 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
            <div className="flex items-center gap-3">
               <Shield className="w-4 h-4 text-teal-600" />
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Medical Compliance Active</span>
            </div>
         </div>
      </div>

      {/* CHAT AREA (Flex-1) */}
      <div className="flex-1 flex flex-col min-w-0">
         {/* Chat Header */}
         <div className="p-6 border-b border-slate-50 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center text-sm font-black shadow-lg shadow-teal-500/20">
                  SM
               </div>
               <div>
                  <h3 className="text-sm font-black text-slate-900 dark:text-white">Dr. Sarah Miller</h3>
                  <div className="flex items-center gap-2">
                     <span className="text-[10px] font-black text-teal-600 uppercase tracking-widest">Cardiologist</span>
                     <span className="w-1 h-1 rounded-full bg-slate-300" />
                     <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Online</span>
                  </div>
               </div>
            </div>
            <div className="flex items-center gap-3">
               <button className="p-3 text-slate-400 hover:text-teal-600 transition-colors bg-slate-50 dark:bg-slate-800 rounded-xl">
                  <Phone className="w-4 h-4" />
               </button>
               <button className="p-3 text-slate-400 hover:text-teal-600 transition-colors bg-slate-50 dark:bg-slate-800 rounded-xl">
                  <Video className="w-4 h-4" />
               </button>
               <button className="p-3 text-slate-400 hover:text-slate-900 transition-colors bg-slate-50 dark:bg-slate-800 rounded-xl">
                  <MoreVertical className="w-4 h-4" />
               </button>
            </div>
         </div>

         {/* Chat Content */}
         <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-slate-50/20 dark:bg-slate-900/20">
            <div className="flex flex-col items-center justify-center opacity-40">
               <div className="px-4 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-full text-[10px] font-black uppercase tracking-widest">Medical Log: Apr 25, 2026</div>
            </div>

            <div className="flex flex-col items-start max-w-[70%] space-y-2 group">
               <div className="p-4 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-[2rem] rounded-tl-none text-xs font-medium leading-relaxed shadow-sm border border-slate-100 dark:border-slate-700">
                  I&apos;ve just reviewed the labs for the patient in Room 402. We need to adjust their medication.
               </div>
               <div className="flex items-center gap-2 ml-1">
                  <span className="text-[9px] font-black text-slate-400 uppercase">Dr. Sarah • 10:20 AM</span>
               </div>
            </div>

            {/* Document Shared */}
            <div className="flex flex-col items-start max-w-[70%] space-y-2">
               <div className="p-4 bg-teal-50 dark:bg-teal-500/10 border border-teal-500/20 rounded-[2rem] rounded-tl-none flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 flex items-center justify-center text-teal-600">
                     <FileText className="w-6 h-6" />
                  </div>
                  <div>
                     <p className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-tight">Lab_Report_402.pdf</p>
                     <p className="text-[9px] font-bold text-teal-600 uppercase">2.4 MB • View Document</p>
                  </div>
               </div>
            </div>

            <div className="flex flex-col items-end ml-auto max-w-[70%] space-y-2">
               <div className="p-4 bg-teal-600 text-white rounded-[2rem] rounded-tr-none text-xs font-medium leading-relaxed shadow-xl shadow-teal-500/20">
                  Understood. I&apos;ll check the bedside monitor now and update the dosage in the system.
               </div>
               <div className="flex items-center gap-1.5 mr-1">
                  <span className="text-[9px] font-black text-slate-400 uppercase">10:25 AM</span>
                  <CheckCheck className="w-3.5 h-3.5 text-teal-600" />
               </div>
            </div>
         </div>

         {/* Chat Input */}
         <div className="p-6 border-t border-slate-50 dark:border-slate-800">
            <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800/50 rounded-[2.5rem] p-3 border border-slate-100 dark:border-slate-800">
               <div className="flex items-center gap-1 px-2 border-r border-slate-200 dark:border-slate-700">
                  <button className="p-2 text-slate-400 hover:text-teal-600 transition-colors"><Smile className="w-5 h-5" /></button>
                  <button className="p-2 text-slate-400 hover:text-teal-600 transition-colors"><Paperclip className="w-5 h-5" /></button>
                  <button className="p-2 text-slate-400 hover:text-teal-600 transition-colors"><ImageIcon className="w-5 h-5" /></button>
               </div>
               <input 
                 placeholder="Type your clinical update..." 
                 value={message}
                 onChange={(e) => setMessage(e.target.value)}
                 className="flex-1 bg-transparent border-none text-xs font-bold outline-none px-4"
               />
               <div className="flex items-center gap-2">
                  <button className="p-2 text-slate-400 hover:text-rose-500 transition-colors"><Mic className="w-5 h-5" /></button>
                  <button className="w-12 h-12 bg-teal-600 text-white rounded-2xl flex items-center justify-center hover:scale-105 transition-all shadow-lg shadow-teal-500/20">
                     <Send className="w-5 h-5" />
                  </button>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
