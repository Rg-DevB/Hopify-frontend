"use client";

import Link from "next/link";
import Image from "next/image";
import { 
  HeartPulse, Sparkles, BrainCircuit, Activity, 
  Users, BarChart3, Pill, ArrowRight, ShieldCheck,
  CheckCircle2, Globe, Moon, Sun, Menu, X, Play,
  MessageSquare, Calendar, ChevronRight, Target,
  Stethoscope, Clock, CreditCard, ChevronDown, MoreVertical,
  Star, TrendingUp, Zap, UserPlus, FileText, CalendarPlus, Bot, Bell, Search,
  AlertCircle, Shield, Award, Lock, HelpCircle, LayoutDashboard, Database, ClipboardList, Send,
  Bed, Check, Mail, Facebook, Instagram, Twitter, Rocket, Settings, Cpu, Layers, Laptop, Smartphone,
  Quote, Calculator, Minus, Plus
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/context/language-context";

// DASHBOARD MOCKUP
const DashboardMockup = () => (
  <div className="w-full h-full bg-white dark:bg-slate-900 flex flex-col font-sans overflow-hidden">
    <div className="h-14 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between px-6 shrink-0">
      <div className="flex items-center gap-4">
        <div className="w-8 h-8 rounded-lg bg-teal-500 flex items-center justify-center text-white">
          <HeartPulse className="w-4 h-4" />
        </div>
        <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-slate-50 dark:bg-slate-800 rounded-full border border-slate-100 dark:border-slate-700">
          <Search className="w-3 h-3 text-slate-400" />
          <div className="h-2 w-24 bg-slate-200 dark:bg-slate-600 rounded-full" />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800" />
        <div className="w-6 h-6 rounded-full bg-teal-500" />
      </div>
    </div>
    <div className="flex-1 flex overflow-hidden">
      <div className="w-16 lg:w-48 border-r border-slate-100 dark:border-slate-800 p-3 space-y-6 shrink-0 text-left">
        <div className="space-y-1">
          {[
            { icon: BarChart3, label: "Dashboard", active: true },
            { icon: Users, label: "Patients" },
            { icon: Stethoscope, label: "Doctors" },
            { icon: Calendar, label: "Schedule" },
          ].map((item, i) => (
            <div key={i} className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-lg transition-all",
              item.active ? "bg-teal-50 dark:bg-teal-500/10 text-teal-600" : "text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
            )}>
              <item.icon className="w-4 h-4" />
              <span className="text-[10px] font-bold hidden lg:block">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50 dark:bg-slate-950/20">
        <div className="grid grid-cols-4 gap-4">
           {[
             { label: "Patients", val: "48", color: "text-teal-600", icon: Users },
             { label: "Doctors", val: "14", color: "text-indigo-600", icon: Stethoscope },
             { label: "Beds", val: "84%", color: "text-rose-600", icon: Bed },
             { label: "Alerts", val: "03", color: "text-amber-600", icon: Activity },
           ].map((s, i) => (
             <div key={i} className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm space-y-2 text-left transition-all hover:border-teal-500/20">
                <s.icon className={cn("w-4 h-4", s.color)} />
                <h4 className="text-lg font-black text-slate-900 dark:text-white">{s.val}</h4>
                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{s.label}</p>
             </div>
           ))}
        </div>
      </div>
    </div>
  </div>
);

// ACTIVITY FEED MOCKUP
const ActivityMockup = () => (
  <div className="w-full h-full bg-slate-900 dark:bg-slate-950 p-6 flex flex-col font-sans overflow-hidden text-left border border-white/5 shadow-2xl">
     <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
           <BrainCircuit className="w-5 h-5 text-teal-400" />
           <h3 className="text-sm font-black text-white">Live AI Agents</h3>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-0.5 bg-teal-400/10 border border-teal-400/20 rounded-full">
           <span className="w-1 h-1 bg-teal-400 rounded-full animate-pulse" />
           <span className="text-[8px] font-black text-teal-400 uppercase tracking-widest">Monitoring</span>
        </div>
     </div>
     <div className="space-y-4">
        {[
          { patient: "Sarah Miller", msg: "Checking heart records...", status: "Analysis" },
          { patient: "John Davis", msg: "Rescheduling at 10AM", status: "Task" },
        ].map((conv, i) => (
          <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors">
             <p className="text-[10px] font-bold text-white mb-1">{conv.patient}</p>
             <p className="text-[9px] text-slate-400 italic mb-2">&quot;{conv.msg}&quot;</p>
             <span className="px-2 py-0.5 bg-teal-500/20 text-teal-400 rounded-full text-[7px] font-black uppercase tracking-widest">{conv.status}</span>
          </div>
        ))}
     </div>
  </div>
);

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={cn(
      "mb-4 transition-all duration-300 rounded-[2rem] border",
      open ? "bg-teal-50/50 dark:bg-teal-500/5 border-teal-500/30" : "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800"
    )}>
      <button onClick={() => setOpen(!open)} className="w-full px-8 py-6 flex items-center justify-between text-left group">
        <span className={cn("text-base font-bold transition-colors", open ? "text-teal-600" : "text-slate-900 dark:text-white")}>{question}</span>
        <div className={cn("w-8 h-8 rounded-full flex items-center justify-center transition-all", open ? "bg-teal-500 text-white rotate-180" : "bg-slate-100 dark:bg-slate-800 text-slate-400")}>
           {open ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </div>
      </button>
      <div className={cn("overflow-hidden transition-all duration-300", open ? "max-h-48 px-8 pb-8 opacity-100" : "max-h-0 opacity-0")}>
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{answer}</p>
      </div>
    </div>
  );
};

// ROI CALCULATOR COMPONENT
const ROICalculator = () => {
  const [patients, setPatients] = useState(20);
  const hoursSaved = Math.round(patients * 0.5 * 5); // 30 mins saved per patient per week
  const moneySaved = hoursSaved * 150; // $150/hr doctor time

  return (
    <div className="p-10 bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-xl space-y-8 text-left">
       <div className="flex items-center gap-3 mb-4">
          <Calculator className="w-6 h-6 text-teal-600" />
          <h3 className="text-xl font-black">ROI Calculator</h3>
       </div>
       <div className="space-y-6">
          <div>
             <div className="flex justify-between mb-3">
                <label className="text-xs font-black uppercase text-slate-500">Patients per day</label>
                <span className="text-sm font-black text-teal-600">{patients}</span>
             </div>
             <input 
                type="range" min="5" max="100" value={patients} 
                onChange={(e) => setPatients(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-600"
             />
          </div>
          <div className="grid grid-cols-2 gap-6 pt-4">
             <div className="p-6 bg-teal-50 dark:bg-teal-500/10 rounded-2xl border border-teal-500/20">
                <p className="text-[10px] font-black uppercase text-teal-600 mb-2">Time Saved / Wk</p>
                <p className="text-2xl font-black text-teal-900 dark:text-white">{hoursSaved}h</p>
             </div>
             <div className="p-6 bg-indigo-50 dark:bg-indigo-500/10 rounded-2xl border border-indigo-500/20">
                <p className="text-[10px] font-black uppercase text-indigo-600 mb-2">Revenue Gain / Mo</p>
                <p className="text-2xl font-black text-indigo-900 dark:text-white">${moneySaved.toLocaleString()}</p>
             </div>
          </div>
       </div>
    </div>
  );
};

const AIChatDemoSection = () => {
  const { language } = useTranslation();
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([
    { role: 'ai', text: language === 'en' ? 'Hello! How can I help you today?' : 'Bonjour ! Comment puis-je vous aider ?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { role: 'user', text: input }]);
    setInput('');
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'ai', text: language === 'en' ? "I've logged that. Want to see a full demo?" : "C'est noté. Voulez-vous voir une démo complète ?" }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="max-w-5xl mx-auto relative">
       {/* SLEEK CONTAINER */}
       <div className="bg-slate-900 rounded-[3rem] p-1 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden">
          <div className="flex flex-col md:flex-row h-[600px]">
             {/* LEFT SIDE: AI INTERFACE */}
             <div className="md:w-[40%] bg-slate-950 p-10 flex flex-col justify-between border-r border-white/5">
                <div className="space-y-8">
                   <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-500/10 border border-teal-500/20 rounded-full text-[9px] font-black text-teal-400 uppercase tracking-widest">
                      <Zap className="w-3 h-3" /> Real-time Triage
                   </div>
                   <h3 className="text-4xl font-black text-white leading-tight">Interact <br /> with AI.</h3>
                   <p className="text-xs text-slate-500 leading-relaxed font-medium">Experience the next generation of medical intelligence. Our agents handle triage, bookings, and records with zero latency.</p>
                </div>
                <div className="space-y-4">
                   {[
                     { label: "Instant Response", icon: Sparkles },
                     { label: "Clinical Context", icon: BrainCircuit },
                     { label: "Secure Sync", icon: Lock },
                   ].map(item => (
                     <div key={item.label} className="flex items-center gap-3 text-[10px] font-black text-slate-300 uppercase tracking-widest">
                        <item.icon className="w-4 h-4 text-teal-500" />
                        {item.label}
                     </div>
                   ))}
                </div>
             </div>
             
             {/* RIGHT SIDE: CHAT */}
             <div className="flex-1 flex flex-col bg-slate-900/50 relative">
                <div className="h-16 border-b border-white/5 flex items-center justify-between px-8 bg-slate-900">
                   <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[10px] font-black text-white uppercase tracking-widest">Agent Hopify v4.0</span>
                   </div>
                   <MoreVertical className="w-5 h-5 text-slate-600" />
                </div>
                <div className="flex-1 overflow-y-auto p-8 space-y-6">
                   {messages.map((m, i) => (
                     <div key={i} className={cn("flex flex-col max-w-[80%]", m.role === 'user' ? "ml-auto" : "text-left")}>
                        <div className={cn(
                          "p-5 rounded-[2rem] text-xs font-bold leading-relaxed shadow-lg",
                          m.role === 'user' ? "bg-teal-600 text-white rounded-tr-none" : "bg-white/5 border border-white/10 text-white rounded-tl-none"
                        )}>
                           {m.text}
                        </div>
                     </div>
                   ))}
                   {isTyping && <div className="p-3 bg-white/5 w-14 rounded-full flex justify-center gap-1"><span className="w-1 h-1 bg-teal-400 rounded-full animate-bounce" /><span className="w-1 h-1 bg-teal-400 rounded-full animate-bounce delay-100" /></div>}
                   <div ref={chatEndRef} />
                </div>
                <div className="p-6 bg-slate-900/80 backdrop-blur-md border-t border-white/5">
                   <div className="relative flex items-center">
                      <input 
                         type="text" value={input} 
                         onChange={(e) => setInput(e.target.value)} 
                         onKeyDown={(e) => e.key === 'Enter' && handleSend()} 
                         placeholder="Start a conversation..." 
                         className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-xs font-bold text-white focus:ring-2 focus:ring-teal-500/20 outline-none" 
                      />
                      <button onClick={handleSend} className="absolute right-2 w-10 h-10 bg-teal-600 text-white rounded-xl flex items-center justify-center hover:scale-105 transition-transform"><Send className="w-5 h-5" /></button>
                   </div>
                </div>
             </div>
          </div>
       </div>
       {/* DECORATIONS */}
       <div className="absolute -top-10 -right-10 w-32 h-32 bg-teal-500/20 blur-[60px] rounded-full" />
       <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-indigo-500/20 blur-[60px] rounded-full" />
    </div>
  );
};

export default function LandingPage() {
  const { theme, setTheme } = useTheme();
  const { t, language, setLanguage } = useTranslation();
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors font-sans selection:bg-teal-500 overflow-x-hidden relative text-left">
      {/* FLOATING NAVBAR */}
      <div className="fixed top-6 left-0 w-full z-[100] px-6">
        <nav className={cn(
          "max-w-6xl mx-auto rounded-3xl transition-all duration-500 border",
          isScrolled 
            ? "bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-slate-200 dark:border-slate-800 py-3 px-6 shadow-2xl" 
            : "bg-transparent border-transparent py-4 px-0"
        )}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 group cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-500">
                <HeartPulse className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-baseline">
                <span className="text-xl font-black text-slate-900 dark:text-white tracking-tighter">Hopify</span>
                <span className="w-1 h-1 rounded-full bg-teal-500 ml-0.5"></span>
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-8">
              {["Features", "Workflow", "Pricing", "FAQ"].map((item) => (
                <Link key={item} href={`#${item.toLowerCase()}`} className="text-[10px] font-black text-slate-500 dark:text-slate-400 hover:text-teal-600 transition-colors uppercase tracking-[0.2em]">
                  {item}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden sm:flex bg-slate-100 dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
                 <button onClick={() => setLanguage('en')} className={cn("px-3 py-1.5 rounded-lg text-[9px] font-black transition-all", language === 'en' ? "bg-white dark:bg-slate-800 text-teal-600 shadow-sm" : "text-slate-500")}>EN</button>
                 <button onClick={() => setLanguage('fr')} className={cn("px-3 py-1.5 rounded-lg text-[9px] font-black transition-all", language === 'fr' ? "bg-white dark:bg-slate-800 text-teal-600 shadow-sm" : "text-slate-500")}>FR</button>
              </div>
              <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="p-2.5 text-slate-500 hover:text-teal-600 transition-all rounded-xl bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200 dark:border-slate-800">
                {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <Link href="/onboarding" className="px-6 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-xl shadow-slate-900/10">{t("heroCTA")}</Link>
            </div>
          </div>
        </nav>
      </div>

      {/* MODERN SPLIT HERO */}
      <section className="relative pt-48 lg:pt-64 pb-24 z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-500/10 border border-teal-500/20 rounded-full text-[10px] font-black text-teal-600 dark:text-teal-400 uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                Healthcare Intelligence
              </div>
              <h1 className="text-5xl lg:text-7xl font-black text-slate-900 dark:text-white leading-[1.05] tracking-tight">
                Clinic Management <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-500 underline decoration-teal-500/20 underline-offset-8">Perfected with AI.</span>
              </h1>
              <p className="text-base lg:text-xl text-slate-500 dark:text-slate-400 max-w-lg font-medium leading-relaxed mx-auto lg:mx-0">
                Hopify automates the boring stuff so you can focus on patients. 
                Triage, scheduling, and prescriptions — all handled by agents.
              </p>
              <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start pt-4">
                <Link href="/onboarding" className="px-10 py-5 bg-teal-600 text-white rounded-2xl font-black text-sm hover:bg-teal-700 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-teal-500/30">
                  {t("heroCTA")} <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="/portal" className="px-10 py-5 bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 rounded-2xl font-black text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-3 shadow-lg">
                  {t("heroDemo")}
                </Link>
              </div>
            </div>

            <div className="relative h-[500px] lg:h-[700px] flex items-center justify-center perspective-[2000px]">
               <div className="absolute top-0 w-full aspect-video rounded-[3rem] shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden transform -rotate-2 hover:rotate-0 transition-all duration-700 z-10 bg-white group">
                  <DashboardMockup />
               </div>
               <div className="absolute bottom-10 right-[-5%] w-[80%] h-[400px] rounded-[3rem] shadow-[0_40px_80px_rgba(0,0,0,0.4)] border border-white/5 overflow-hidden transform rotate-6 hover:rotate-3 transition-all duration-700 z-20">
                  <ActivityMockup />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* ROI & CALCULATOR */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900/40 border-y border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
           <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8 text-center lg:text-left">
                 <h2 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">The Math of Efficiency.</h2>
                 <p className="text-sm text-slate-500 font-medium leading-relaxed">
                    Stop wasting clinical resources on administrative overhead. Our AI agents handle the noise while you handle the care.
                 </p>
                 <div className="grid grid-cols-2 gap-6">
                    {[
                      { label: t("timeSaved"), val: "15h/wk", color: "text-teal-600", icon: Clock },
                      { label: t("revenueGrowth"), val: "+24%", color: "text-indigo-600", icon: TrendingUp },
                    ].map((m, i) => (
                      <div key={i} className="p-8 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2rem] text-left space-y-3">
                         <m.icon className={cn("w-6 h-6", m.color)} />
                         <h4 className="text-3xl font-black text-slate-900 dark:text-white">{m.val}</h4>
                         <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{m.label}</p>
                      </div>
                    ))}
                 </div>
              </div>
              <ROICalculator />
           </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-32 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 text-center">
           <div className="mb-20 space-y-3">
              <h2 className="text-4xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight">{t("featuresTitle")}</h2>
              <p className="text-slate-400 font-bold uppercase tracking-[0.4em] text-[10px]">Built for the modern clinic</p>
           </div>
           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 text-left">
              {[
                { title: "AI Triage Agent", icon: BrainCircuit, color: "teal", desc: "Automated symptom analysis and diagnosis assistance 24/7." },
                { title: "Clinical Analytics", icon: BarChart3, color: "indigo", desc: "Real-time growth metrics and clinical performance audits." },
                { title: "Inventory Bot", icon: Pill, color: "rose", desc: "Smart stock management with automated medical restocking." },
                { title: "Billing Engine", icon: CreditCard, color: "emerald", desc: "Professional invoicing and secure global payment gateways." },
                { title: "Smart Capacity", icon: Activity, color: "amber", desc: "Live ward tracking and automated room allocation." },
                { title: "EMR Digital Vault", icon: ClipboardList, color: "cyan", desc: "Secure patient records with full digital audit history." },
              ].map((f, i) => (
                <div key={i} className="p-12 bg-slate-50 dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 hover:border-teal-500/50 transition-all group">
                   <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-8", 
                     f.color === "teal" ? "bg-teal-500/10 text-teal-600" :
                     f.color === "indigo" ? "bg-indigo-500/10 text-indigo-600" :
                     f.color === "rose" ? "bg-rose-500/10 text-rose-600" :
                     f.color === "emerald" ? "bg-emerald-500/10 text-emerald-600" :
                     f.color === "amber" ? "bg-amber-500/10 text-amber-600" :
                     "bg-cyan-500/10 text-cyan-600"
                   )}>
                      <f.icon className="w-7 h-7" />
                   </div>
                   <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">{f.title}</h3>
                   <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{f.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* WORKFLOW SECTION */}
      <section id="workflow" className="py-32 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
           <div className="mb-20 space-y-3">
              <h2 className="text-4xl lg:text-6xl font-black tracking-tight text-white">How it works.</h2>
              <p className="text-teal-400 font-bold uppercase tracking-[0.4em] text-[10px]">5 steps to clinic automation</p>
           </div>
           <div className="grid lg:grid-cols-5 gap-8">
              {[
                { step: "01", title: "Onboarding", icon: UserPlus, desc: "Connect your clinic and import records." },
                { step: "02", title: "Configure", icon: Settings, desc: "Define specialties and agent behavior." },
                { step: "03", title: "Deploy", icon: Rocket, desc: "Launch your portal and triage bot." },
                { step: "04", title: "Automate", icon: Cpu, desc: "AI handles bookings and triage 24/7." },
                { step: "05", title: "Scale", icon: TrendingUp, desc: "Monitor efficiency from your hub." },
              ].map((item, i) => (
                <div key={i} className="relative group p-8 bg-white/5 border border-white/10 rounded-[3rem] hover:bg-white/10 transition-all text-left">
                   <div className="w-12 h-12 rounded-2xl bg-teal-500 flex items-center justify-center text-white mb-6"><item.icon className="w-6 h-6" /></div>
                   <h3 className="text-lg font-black text-white mb-2">{item.title}</h3>
                   <p className="text-[10px] text-slate-400 font-medium">{item.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-32 bg-white dark:bg-slate-950 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
           <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8 text-center lg:text-left">
                 <h2 className="text-4xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight">Loved by <br /> clinical leaders.</h2>
                 <p className="text-sm text-slate-500 font-medium max-w-sm mx-auto lg:mx-0">
                    Hopify is the secret weapon for modern healthcare providers. Trusted worldwide.
                 </p>
                 <div className="flex justify-center lg:justify-start gap-4">
                    {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 text-amber-500 fill-amber-500" />)}
                 </div>
              </div>
              <div className="grid gap-6">
                 {[
                   { quote: "Hopify reduced my admin time by 40%. The AI triage is flawless.", author: "Dr. Sarah Miller", role: "Chief of Medicine" },
                   { quote: "The best ROI we've seen on clinical software. Patient satisfaction is at an all-time high.", author: "James Chen", role: "Clinic Director" },
                 ].map((t, i) => (
                   <div key={i} className="p-8 bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 space-y-4">
                      <Quote className="w-10 h-10 text-teal-600/20" />
                      <p className="text-sm font-bold text-slate-900 dark:text-white leading-relaxed italic">&quot;{t.quote}&quot;</p>
                      <div className="pt-2">
                         <p className="text-xs font-black text-teal-600">{t.author}</p>
                         <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t.role}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </section>

      {/* PERSONAS SECTION */}
      <section className="py-32 bg-slate-50 dark:bg-slate-900/30 border-y border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
           <div className="mb-20 space-y-3 text-center">
              <h2 className="text-4xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight">Built for everyone.</h2>
              <p className="text-slate-400 font-bold uppercase tracking-[0.4em] text-[10px]">Better care for every role</p>
           </div>
           <div className="grid md:grid-cols-3 gap-8">
              {[
                { role: "For Doctors", icon: Stethoscope, desc: "Eliminate repetitive tasks and focus on patient care with AI prescription assistance.", color: "bg-teal-500" },
                { role: "For Managers", icon: BarChart3, desc: "Maximize clinic revenue and staff efficiency with real-time operational data.", color: "bg-indigo-500" },
                { role: "For Patients", icon: Globe, desc: "Access 24/7 triage and instant bookings from any device, anywhere.", color: "bg-cyan-500" },
              ].map((p, i) => (
                <div key={i} className="p-12 bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 space-y-6">
                   <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg", p.color)}>
                      <p.icon className="w-7 h-7" />
                   </div>
                   <h3 className="text-2xl font-black text-slate-900 dark:text-white">{p.role}</h3>
                   <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{p.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section id="pricing" className="py-32 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-6">
           <div className="mb-20 space-y-3 text-center">
              <h2 className="text-4xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight">Simple Pricing.</h2>
              <p className="text-slate-400 font-bold uppercase tracking-[0.4em] text-[10px]">No hidden fees, scale as you grow</p>
           </div>
           <div className="grid md:grid-cols-3 gap-8">
              {[
                { plan: "Starter", price: "Free", desc: "Perfect for solo clinics.", features: ["1 Doctor Account", "Basic AI Triage", "Public Portal", "Email Support"], active: false },
                { plan: "Professional", price: "$99", desc: "Best for growing teams.", features: ["Unlimited Doctors", "Advanced AI Agents", "Full Analytics", "Priority Support"], active: true },
                { plan: "Enterprise", price: "Custom", desc: "For large hospital groups.", features: ["Multi-location Hub", "Dedicated AI Training", "White-label Portal", "24/7 Phone Support"], active: false },
              ].map((p, i) => (
                <div key={i} className={cn("p-12 rounded-[3.5rem] border transition-all relative flex flex-col justify-between", p.active ? "bg-slate-900 text-white border-teal-500 scale-105 shadow-2xl z-10" : "bg-white dark:bg-slate-900 text-slate-900 dark:text-white border-slate-200 dark:border-slate-800")}>
                   {p.active && <div className="absolute top-0 right-10 -translate-y-1/2 bg-teal-500 text-white text-[10px] font-black uppercase px-4 py-1 rounded-full">Recommended</div>}
                   <div>
                      <h3 className="text-xl font-black mb-2">{p.plan}</h3>
                      <div className="flex items-baseline gap-1 mb-6">
                         <span className="text-4xl font-black">{p.price}</span>
                         {p.price.includes('$') && <span className="text-sm opacity-50">/mo</span>}
                      </div>
                      <p className="text-sm mb-8 opacity-60 font-medium">{p.desc}</p>
                      <ul className="space-y-4 mb-12">
                         {p.features.map(f => (
                           <li key={f} className="flex items-center gap-3 text-xs font-bold"><CheckCircle2 className="w-4 h-4 text-teal-500" />{f}</li>
                         ))}
                      </ul>
                   </div>
                   <button className={cn("w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all", p.active ? "bg-teal-500 text-white hover:bg-teal-600" : "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-200")}>Choose Plan</button>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* DEMO SECTION */}
      <section id="demo" className="py-32 bg-slate-50 dark:bg-slate-900/10">
        <div className="max-w-7xl mx-auto px-6 text-center">
           <div className="mb-20 space-y-3">
              <h2 className="text-4xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight">Try Hopify AI.</h2>
              <p className="text-slate-400 font-bold uppercase tracking-[0.4em] text-[10px]">Real-time Agent Experience</p>
           </div>
           <AIChatDemoSection />
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-32 bg-white dark:bg-slate-950">
        <div className="max-w-3xl mx-auto px-6 text-left">
           <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-16 text-center">FAQ</h2>
           <div className="space-y-2">
              <FAQItem question="How fast is the setup?" answer="Most clinics are live within 24 hours. Our AI agents import your EMR data automatically." />
              <FAQItem question="Can I use it on multiple clinics?" answer="Yes, Hopify Professional supports multi-location management from a single dashboard." />
              <FAQItem question="Is there a free trial?" answer="Absolutely. You can start for free for 14 days, no credit card required." />
              <FAQItem question="Is data migration included?" answer="Yes, our team handles all your data migration from legacy systems for free on professional plans." />
           </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-32 px-6 bg-white dark:bg-slate-950 text-center">
        <div className="max-w-6xl mx-auto rounded-[4rem] bg-slate-900 dark:bg-white p-20 lg:p-32 text-center space-y-10 relative overflow-hidden shadow-2xl">
           <h2 className="text-5xl lg:text-7xl font-black text-white dark:text-slate-900 leading-tight tracking-tight">
             Modernize your <br /> practice today.
           </h2>
           <div className="flex justify-center pt-6">
              <Link href="/onboarding" className="px-12 py-6 bg-teal-600 text-white rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-2xl flex items-center justify-center gap-4 group">
                 {t("heroCTA")} <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </Link>
           </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-24 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-16">
          <div className="space-y-8 text-left">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center shadow-lg">
                <HeartPulse className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-baseline">
                <span className="text-2xl font-black uppercase tracking-tighter text-slate-900 dark:text-white">Hopify</span>
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500 ml-1"></span>
              </div>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs font-medium leading-relaxed">Intelligence-driven healthcare management.</p>
            <div className="flex gap-6">
               <Twitter className="w-5 h-5 text-slate-400 hover:text-teal-500 cursor-pointer transition-colors" />
               <Facebook className="w-5 h-5 text-slate-400 hover:text-teal-500 cursor-pointer transition-colors" />
               <Instagram className="w-5 h-5 text-slate-400 hover:text-teal-500 cursor-pointer transition-colors" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-20 text-left">
             <div className="space-y-6">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-white">Product</h4>
                <ul className="space-y-4 text-xs font-bold text-slate-500">
                   <li><Link href="#" className="hover:text-teal-600 transition-colors">Features</Link></li>
                   <li><Link href="#" className="hover:text-teal-600 transition-colors">AI Demo</Link></li>
                </ul>
             </div>
             <div className="space-y-6">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-white">Legal</h4>
                <ul className="space-y-4 text-xs font-bold text-slate-500">
                   <li><Link href="#" className="hover:text-teal-600 transition-colors">Privacy Policy</Link></li>
                   <li><Link href="#" className="hover:text-teal-600 transition-colors">Terms of Service</Link></li>
                </ul>
             </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-10 border-t border-slate-100 dark:border-slate-800 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
           © 2026 HOPIFY INC. BUILT WITH AI.
        </div>
      </footer>
    </div>
  );
}
