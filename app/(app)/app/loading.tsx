"use client";

import { HeartPulse } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-white dark:bg-slate-950 z-[100] flex flex-col items-center justify-center space-y-6">
      <div className="relative">
        <div className="w-20 h-20 rounded-[2rem] bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center shadow-2xl shadow-teal-500/30 animate-bounce">
          <HeartPulse className="w-10 h-10 text-white" />
        </div>
        <div className="absolute inset-0 rounded-[2rem] bg-teal-500/20 blur-xl animate-pulse" />
      </div>
      <div className="flex flex-col items-center space-y-2">
         <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tighter">Hopify.</h2>
         <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Clinical Intelligence Loading</span>
         </div>
      </div>
      <div className="w-48 h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
         <div className="h-full bg-gradient-to-r from-teal-500 to-cyan-500 w-1/2 animate-[loading_2s_infinite_ease-in-out]" />
      </div>
      <style jsx>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  );
}
