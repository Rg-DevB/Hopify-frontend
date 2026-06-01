"use client";

import { useState } from "react";
import { 
  Send, Paperclip, MoreVertical, Search, 
  ArrowLeft, Phone, Video, Info, Check, 
  CheckCheck, User, Smile, Shield
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const chatList = [
  { id: 1, name: "Dr. Sarah Miller", role: "Cardiologist", lastMsg: "Please take the medication after dinner.", time: "10:20 AM", online: true, unread: 2 },
  { id: 2, name: "Dr. James Wilson", role: "Neurologist", lastMsg: "Your test results look normal.", time: "Yesterday", online: false, unread: 0 },
  { id: 3, name: "Jessica White", role: "Head Nurse", lastMsg: "See you on Monday for the checkup.", time: "Monday", online: true, unread: 0 }
];

export default function PatientMessagesPage() {
  const [activeChat, setActiveChat] = useState(chatList[0]);
  const [message, setMessage] = useState("");

  return (
    <div className="max-w-7xl mx-auto h-[calc(100vh-120px)] flex flex-col gap-6">
      {/* Top Nav */}
      <div className="flex items-center justify-between shrink-0">
         <Link href="/portal" className="flex items-center gap-2 text-slate-500 hover:text-teal-600 transition-colors font-bold text-sm">
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
         </Link>
         <div className="flex items-center gap-2 px-3 py-1 bg-teal-50 dark:bg-teal-500/10 text-teal-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-teal-500/20">
            <Shield className="w-3.5 h-3.5" /> Encrypted Chat
         </div>
      </div>

      <div className="flex-1 min-h-0 grid lg:grid-cols-12 gap-8">
         {/* LEFT: Chat List (4 cols) */}
         <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
            <div className="p-8 border-b border-slate-50 dark:border-slate-800 space-y-6">
               <h2 className="text-2xl font-black text-slate-900 dark:text-white">Messages</h2>
               <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input placeholder="Search conversations..." className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-xs outline-none focus:ring-2 focus:ring-teal-500/20 transition-all" />
               </div>
            </div>
            <div className="flex-1 overflow-y-auto divide-y divide-slate-50 dark:divide-slate-800">
               {chatList.map(chat => (
                 <button 
                   key={chat.id} 
                   onClick={() => setActiveChat(chat)}
                   className={cn(
                     "w-full p-6 flex items-start gap-4 transition-all hover:bg-slate-50 dark:hover:bg-slate-800/50",
                     activeChat.id === chat.id ? "bg-teal-50/50 dark:bg-teal-500/5 border-l-4 border-teal-600" : "border-l-4 border-transparent"
                   )}
                 >
                    <div className="relative">
                       <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 font-bold text-sm">
                          {chat.name.split(' ').map(n => n[0]).join('')}
                       </div>
                       {chat.online && <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-4 border-white dark:border-slate-900 rounded-full" />}
                    </div>
                    <div className="flex-1 text-left min-w-0">
                       <div className="flex justify-between items-start mb-1">
                          <p className="text-sm font-black text-slate-900 dark:text-white truncate">{chat.name}</p>
                          <span className="text-[10px] font-bold text-slate-400 uppercase">{chat.time}</span>
                       </div>
                       <p className="text-xs text-slate-500 truncate">{chat.lastMsg}</p>
                    </div>
                    {chat.unread > 0 && (
                      <div className="w-5 h-5 bg-teal-600 text-white text-[10px] font-black rounded-lg flex items-center justify-center">
                         {chat.unread}
                      </div>
                    )}
                 </button>
               ))}
            </div>
         </div>

         {/* RIGHT: Active Chat (8 cols) */}
         <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
            {/* Chat Header */}
            <div className="p-6 border-b border-slate-50 dark:border-slate-800 flex items-center justify-between bg-slate-50/30 dark:bg-slate-800/30">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center text-sm font-black shadow-lg shadow-teal-500/20">
                     {activeChat.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                     <h3 className="text-sm font-black text-slate-900 dark:text-white">{activeChat.name}</h3>
                     <p className="text-[10px] font-black text-teal-600 uppercase tracking-widest">{activeChat.role}</p>
                  </div>
               </div>
               <div className="flex items-center gap-2">
                  <button className="p-3 text-slate-400 hover:text-teal-600 transition-colors bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                     <Phone className="w-4 h-4" />
                  </button>
                  <button className="p-3 text-slate-400 hover:text-teal-600 transition-colors bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                     <Video className="w-4 h-4" />
                  </button>
                  <button className="p-3 text-slate-400 hover:text-slate-900 transition-colors bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                     <Info className="w-4 h-4" />
                  </button>
               </div>
            </div>

            {/* Chat Content */}
            <div className="flex-1 overflow-y-auto p-8 space-y-8">
               <div className="flex flex-col items-center justify-center py-8 opacity-40">
                  <div className="px-4 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-full text-[10px] font-black uppercase tracking-widest">Today, April 25</div>
               </div>

               <div className="flex flex-col items-start max-w-[80%] space-y-2">
                  <div className="p-4 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-2xl rounded-tl-none text-xs font-medium leading-relaxed">
                     Hello! I&apos;ve reviewed your recent blood tests. Everything looks great except your Vitamin D levels are slightly low.
                  </div>
                  <span className="text-[9px] font-black text-slate-400 uppercase ml-1">10:05 AM</span>
               </div>

               <div className="flex flex-col items-end ml-auto max-w-[80%] space-y-2">
                  <div className="p-4 bg-teal-600 text-white rounded-2xl rounded-tr-none text-xs font-medium leading-relaxed shadow-lg shadow-teal-500/20">
                     Thank you Doctor. Should I start taking supplements?
                  </div>
                  <div className="flex items-center gap-1.5 mr-1">
                     <span className="text-[9px] font-black text-slate-400 uppercase">10:12 AM</span>
                     <CheckCheck className="w-3 h-3 text-teal-600" />
                  </div>
               </div>

               <div className="flex flex-col items-start max-w-[80%] space-y-2">
                  <div className="p-4 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-2xl rounded-tl-none text-xs font-medium leading-relaxed">
                     Yes, I&apos;ve sent a prescription for Vitamin D3 (2000 IU daily). You can view it in your &quot;Prescriptions&quot; tab.
                  </div>
                  <span className="text-[9px] font-black text-slate-400 uppercase ml-1">10:15 AM</span>
               </div>
            </div>

            {/* Chat Input */}
            <div className="p-6 border-t border-slate-50 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-800/30">
               <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-2 flex items-center gap-2 shadow-sm">
                  <button className="p-2 text-slate-400 hover:text-teal-600 transition-colors">
                     <Smile className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-slate-400 hover:text-teal-600 transition-colors">
                     <Paperclip className="w-5 h-5" />
                  </button>
                  <input 
                    placeholder="Message your healthcare provider..." 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-1 bg-transparent border-none text-xs font-bold outline-none py-2 px-2"
                  />
                  <button className="bg-teal-600 text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-teal-500/20 hover:scale-105 transition-all">
                     <Send className="w-4 h-4" />
                  </button>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
