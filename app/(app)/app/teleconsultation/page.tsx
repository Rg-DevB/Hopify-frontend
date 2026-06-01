"use client";

import { useState, useEffect } from "react";
import { 
  Video, Mic, MicOff, VideoOff, PhoneOff, MessageSquare, 
  FileText, Share2, MoreVertical, User, Send, 
  Shield, Clock, Star, Sparkles, X, Paperclip,
  Activity, HeartPulse, Microscope
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function TeleconsultationPage() {
  const [inCall, setInCall] = useState(false);
  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);
  const [messages, setMessages] = useState([
    { role: "patient", text: "Hello Doctor, I've been feeling some chest pain since morning.", time: "10:05 AM" },
    { role: "doctor", text: "I see. Can you describe the intensity on a scale of 1-10?", time: "10:06 AM" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: "doctor", text: input, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    setInput("");
  };

  return (
    <div className="max-w-7xl mx-auto h-[calc(100vh-120px)] flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 shrink-0">
        <div>
           <div className="flex items-center gap-2 mb-1">
              <div className="px-2 py-0.5 bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 text-[9px] font-black uppercase tracking-wider rounded-full flex items-center gap-1">
                 <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" /> Live Tele-Clinic
              </div>
           </div>
           <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Virtual Session</h1>
           <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Secure end-to-end encrypted medical consultation.</p>
        </div>
        
        <div className="flex items-center gap-4">
           <div className="flex items-center gap-3 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
              <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-white text-[10px] font-bold">SM</div>
              <div className="text-left">
                 <p className="text-xs font-black text-slate-900 dark:text-white">Md Tajuddin</p>
                 <p className="text-[9px] font-bold text-teal-600 uppercase">Patient ID: #PAT-882</p>
              </div>
           </div>
        </div>
      </div>

      {/* Main Call Interface */}
      <div className="flex-1 min-h-0 grid lg:grid-cols-12 gap-8">
         {/* VIDEO AREA (8 cols) */}
         <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="flex-1 bg-slate-900 dark:bg-slate-950 rounded-[3rem] relative overflow-hidden shadow-2xl border border-white/5 group">
               {/* Patient Main View (Mock) */}
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 flex flex-col items-center justify-center space-y-6">
                     <div className="w-32 h-32 rounded-full bg-white/5 border border-white/10 flex items-center justify-center relative">
                        <User className="w-16 h-16 text-white/20" />
                        <div className="absolute inset-0 rounded-full border-2 border-teal-500/30 animate-ping" />
                     </div>
                     <p className="text-white/40 text-xs font-black uppercase tracking-[0.3em]">Patient: Md Tajuddin</p>
                  </div>
               </div>

               {/* Doctor Mini View (Self) */}
               <div className="absolute top-8 right-8 w-48 h-64 bg-slate-800 rounded-[2rem] shadow-2xl border-2 border-white/10 overflow-hidden group/mini">
                  <div className="w-full h-full bg-gradient-to-tr from-teal-900/20 to-indigo-900/20 flex flex-col items-center justify-center">
                     <HeartPulse className="w-8 h-8 text-teal-500/40 floating" />
                     <p className="text-[9px] text-white/30 uppercase mt-4 font-black">You (Dr. Sarah)</p>
                  </div>
                  <div className="absolute bottom-4 right-4 p-2 bg-black/40 backdrop-blur-md rounded-xl">
                     <Sparkles className="w-3 h-3 text-teal-400" />
                  </div>
               </div>

               {/* Call Status Overlay */}
               <div className="absolute top-8 left-8 flex items-center gap-3">
                  <div className="px-3 py-1.5 bg-black/40 backdrop-blur-md rounded-full border border-white/10 flex items-center gap-2">
                     <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                     <span className="text-[10px] font-black text-white uppercase tracking-widest">00:12:45</span>
                  </div>
                  <div className="px-3 py-1.5 bg-black/40 backdrop-blur-md rounded-full border border-white/10 flex items-center gap-2">
                     <Shield className="w-3 h-3 text-teal-400" />
                     <span className="text-[10px] font-black text-white uppercase tracking-widest">Secure</span>
                  </div>
               </div>

               {/* Controls */}
               <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-6 p-4 bg-white/10 backdrop-blur-2xl rounded-[2.5rem] border border-white/10 shadow-2xl transition-all group-hover:bottom-12">
                  <button 
                    onClick={() => setMicOn(!micOn)}
                    className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center transition-all",
                      micOn ? "bg-white/10 text-white hover:bg-white/20" : "bg-rose-500 text-white"
                    )}
                  >
                    {micOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                  </button>
                  <button 
                    onClick={() => setVideoOn(!videoOn)}
                    className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center transition-all",
                      videoOn ? "bg-white/10 text-white hover:bg-white/20" : "bg-rose-500 text-white"
                    )}
                  >
                    {videoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
                  </button>
                  <button className="w-16 h-16 bg-rose-600 hover:bg-rose-700 text-white rounded-full flex items-center justify-center shadow-xl shadow-rose-600/30 transition-all hover:scale-110">
                     <PhoneOff className="w-7 h-7" />
                  </button>
                  <button className="w-12 h-12 bg-white/10 text-white hover:bg-white/20 rounded-full flex items-center justify-center transition-all">
                     <Share2 className="w-5 h-5" />
                  </button>
                  <button className="w-12 h-12 bg-white/10 text-white hover:bg-white/20 rounded-full flex items-center justify-center transition-all">
                     <MoreVertical className="w-5 h-5" />
                  </button>
               </div>
            </div>

            {/* Quick Prescribe / AI Scribe Toolbar */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
               <div className="flex items-center gap-6">
                  <div className="flex flex-col">
                     <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">AI Scribe</span>
                     <p className="text-xs font-bold text-slate-700 dark:text-slate-300">Listening and summarizing...</p>
                  </div>
                  <div className="w-px h-10 bg-slate-100 dark:bg-slate-800" />
                  <div className="flex items-center gap-2">
                     <button className="px-4 py-2 bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-teal-100 transition-all">
                        Create Rx
                     </button>
                     <button className="px-4 py-2 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-100 transition-all">
                        Lab Request
                     </button>
                  </div>
               </div>
               <button className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-rose-500 transition-colors">
                  <Activity className="w-4 h-4" /> Emergency Protocol
               </button>
            </div>
         </div>

         {/* CHAT & DOCS (4 cols) */}
         <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="flex-1 flex flex-col bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
               <div className="p-6 border-b border-slate-50 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/50">
                  <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-[0.2em]">Session Chat</h3>
                  <div className="flex items-center gap-2">
                     <div className="w-2 h-2 rounded-full bg-emerald-500" />
                     <span className="text-[10px] font-bold text-slate-400">Online</span>
                  </div>
               </div>
               <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  {messages.map((m, i) => (
                    <div key={i} className={cn(
                      "flex flex-col max-w-[85%]",
                      m.role === "doctor" ? "ml-auto items-end" : "items-start"
                    )}>
                       <div className={cn(
                         "p-4 rounded-2xl text-xs font-medium leading-relaxed shadow-sm",
                         m.role === "doctor" ? "bg-teal-600 text-white rounded-tr-none" : "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none"
                       )}>
                          {m.text}
                       </div>
                       <span className="text-[9px] font-bold text-slate-400 mt-2 uppercase">{m.time}</span>
                    </div>
                  ))}
               </div>
               <div className="p-6 border-t border-slate-50 dark:border-slate-800">
                  <div className="relative flex items-center gap-2">
                     <button className="p-2 text-slate-400 hover:text-teal-600 transition-colors">
                        <Paperclip className="w-5 h-5" />
                     </button>
                     <input 
                        placeholder="Type a message..." 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        className="flex-1 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl px-4 py-3 text-xs font-bold outline-none focus:ring-2 focus:ring-teal-500/20"
                     />
                     <button 
                        onClick={handleSend}
                        className="w-10 h-10 bg-teal-600 text-white rounded-xl flex items-center justify-center hover:scale-105 transition-all shadow-lg shadow-teal-500/20"
                     >
                        <Send className="w-5 h-5" />
                     </button>
                  </div>
               </div>
            </div>

            {/* Shared Documents */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
               <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Shared Files</h3>
               <div className="space-y-4">
                  {[
                    { name: "Blood_Test_Report.pdf", size: "1.2 MB", type: "Lab" },
                    { name: "ECG_Scan_Latest.jpg", size: "4.5 MB", type: "Imaging" }
                  ].map((file, i) => (
                    <div key={i} className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center justify-between group cursor-pointer hover:border-teal-500/50 transition-all">
                       <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400 group-hover:text-teal-500 transition-colors">
                             <FileText className="w-4 h-4" />
                          </div>
                          <div>
                             <p className="text-[10px] font-black text-slate-900 dark:text-white truncate max-w-[120px]">{file.name}</p>
                             <p className="text-[9px] font-bold text-slate-400 uppercase">{file.size}</p>
                          </div>
                       </div>
                       <button className="text-[9px] font-black text-teal-600 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity underline">View</button>
                    </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
