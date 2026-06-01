"use client";

import { 
  Search, 
  Bell, 
  Moon, 
  Sun, 
  X, 
  CalendarPlus, 
  UserPlus, 
  AlertCircle, 
  CreditCard,
  MessageSquare,
  Clock,
  Calendar,
  ChevronDown,
  Menu,
  Activity
} from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import LanguageSwitcher from "@/components/language-switcher";
import SearchModal from "@/components/search-modal";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

const sampleNotifications = [
  { id: 1, title: "New appointment booked", desc: "Md Tajuddin — Tomorrow at 9:30 AM", time: "2m ago", icon: CalendarPlus, read: false, color: "text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-500/10" },
  { id: 2, title: "Patient registered", desc: "Nadia Rahman joined the clinic", time: "18m ago", icon: UserPlus, read: false, color: "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10" },
  { id: 3, title: "Invoice overdue", desc: "INV-2026-092 — Rakib Ahmed ($300)", time: "1h ago", icon: AlertCircle, read: true, color: "text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10" },
  { id: 4, title: "Payment received", desc: "INV-2026-089 — $150.00", time: "3h ago", icon: CreditCard, read: true, color: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10" },
];

export default function Topbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notifications, setNotifications] = useState(sampleNotifications);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [period, setPeriod] = useState("Today");

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => { 
    setMounted(true); 
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSearchOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const markAllRead = () => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

  return (
    <header className="h-20 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl flex items-center justify-between px-8 shrink-0 transition-all relative z-30">
      
      {/* 1. LEFT: TIME & RESPONSIVE MENU */}
      <div className="flex items-center gap-6">
        {/* Mobile Menu Button (Placeholder for triggering sidebar on mobile) */}
        <button className="lg:hidden p-2.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
          <Menu className="w-6 h-6" />
        </button>

        {/* Real-time Clock */}
        <div className="flex flex-col">
           <div className="flex items-center gap-2 text-slate-900 dark:text-white font-black text-xs uppercase tracking-widest leading-none">
              <Clock className="w-3.5 h-3.5 text-teal-500" />
              {mounted ? format(currentTime, "HH:mm:ss") : "--:--:--"}
           </div>
           <div className="text-[10px] font-bold text-slate-400 mt-1.5 uppercase tracking-[0.1em]">
              {mounted ? format(currentTime, "EEEE, MMMM do, yyyy") : "Loading date..."}
           </div>
        </div>
      </div>

      {/* 2. CENTER: SEARCH & PERIOD SELECTOR */}
      <div className="hidden md:flex flex-1 max-w-2xl mx-10 items-center gap-4">
        {/* Omni-Search Bar */}
        <div className="flex-1 relative group cursor-pointer" onClick={() => setSearchOpen(true)}>
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-hover:text-teal-500 transition-colors" />
          <div className="w-full pl-12 pr-4 py-2.5 bg-slate-100/50 dark:bg-slate-800/40 border-transparent rounded-2xl text-sm text-slate-500 dark:text-slate-400 transition-all border group-hover:border-slate-200 dark:group-hover:border-slate-700 group-hover:bg-white dark:group-hover:bg-slate-800 flex items-center justify-between">
             <span className="font-medium">Search anything...</span>
             <div className="flex items-center gap-1.5 bg-white dark:bg-slate-900 px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
                <span className="text-[10px] font-black opacity-40">⌘K</span>
             </div>
          </div>
        </div>

        {/* Period Selector */}
        <button className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-teal-500/50 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm group">
           <Calendar className="w-4 h-4 text-teal-500" />
           <span className="text-xs font-black text-slate-700 dark:text-slate-300 uppercase tracking-widest">{period}</span>
           <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:translate-y-0.5 transition-transform" />
        </button>
      </div>
      
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* 3. RIGHT: ACTIONS & PROFILE */}
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-1 mr-2">
           <LanguageSwitcher />
           {mounted && (
             <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="p-2.5 text-slate-400 hover:text-teal-600 transition-all rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800">
               {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
             </button>
           )}
        </div>

        {/* Notification Bell */}
        <div className="relative">
          <button onClick={() => setNotifOpen(!notifOpen)} className="relative p-2.5 text-slate-400 hover:text-teal-600 transition-all rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 border border-transparent hover:border-slate-100 dark:hover:border-slate-700">
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 w-4 h-4 bg-rose-500 rounded-full border-2 border-white dark:border-slate-900 text-[10px] text-white font-black flex items-center justify-center shadow-lg shadow-rose-500/20">{unreadCount}</span>
            )}
          </button>

          {/* Notification dropdown */}
          {notifOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setNotifOpen(false)} />
              <div className="absolute right-0 top-full mt-4 w-80 sm:w-96 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="p-6 border-b border-slate-50 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
                  <h3 className="font-black text-slate-900 dark:text-white uppercase tracking-widest text-xs">Clinical Alerts</h3>
                  <div className="flex items-center gap-3">
                    {unreadCount > 0 && (
                      <button onClick={markAllRead} className="text-[10px] font-black text-teal-600 uppercase tracking-widest hover:underline">Clear all</button>
                    )}
                    <button onClick={() => setNotifOpen(false)} className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded-lg">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="max-h-[400px] overflow-y-auto divide-y divide-slate-50 dark:divide-slate-800">
                  {notifications.map((n) => (
                    <div key={n.id} className={cn(
                      "p-5 flex items-start gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all cursor-pointer group",
                      !n.read ? "bg-teal-500/[0.02]" : ""
                    )}>
                      <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform", n.color)}>
                        <n.icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-1">
                          <p className="text-sm font-black text-slate-900 dark:text-white truncate pr-4">{n.title}</p>
                          {!n.read && <div className="w-2 h-2 rounded-full bg-teal-500 shadow-lg shadow-teal-500/40 mt-1.5" />}
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">{n.desc}</p>
                        <p className="text-[10px] font-black text-slate-400 mt-2 uppercase tracking-widest">{n.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-900/50 text-center text-xs font-black uppercase tracking-widest text-slate-400">
                  Real-time Monitoring Active
                </div>
              </div>
            </>
          )}
        </div>

        {/* Profile */}
        <div className="flex items-center gap-4 pl-4 border-l border-slate-100 dark:border-slate-800 group cursor-pointer">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-black text-slate-900 dark:text-white leading-none">Dr. Tajuddin</p>
            <p className="text-[10px] font-bold text-teal-600 uppercase tracking-widest mt-1.5">Chief Surgeon</p>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-white font-black border-2 border-white dark:border-slate-800 shadow-xl shadow-teal-500/20 group-hover:scale-110 transition-transform">
            DT
          </div>
        </div>
      </div>
    </header>
  );
}
