"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { 
  LayoutDashboard, Calendar, Users, Briefcase, Sparkles, Settings, 
  CreditCard, User, LogOut, Activity, HeartPulse, PanelLeftClose, PanelLeft, Menu,
  Stethoscope, Bed, Pill, TrendingUp, Truck, FlaskConical, Bell, Video, BrainCircuit, Monitor, MessageCircle, Siren, ShieldCheck, Scissors, Crown, History
} from "lucide-react";
import { cn } from "@/lib/utils";
import { logout } from "@/app/actions/auth";
import { useTranslation } from "@/context/language-context";
import { TranslationKeys } from "@/lib/translations";

const mainNavItems: { title: TranslationKeys; href: string; icon: any }[] = [
  { title: "dashboard", href: "/app/dashboard", icon: LayoutDashboard },
  { title: "analytics", href: "/app/analytics", icon: TrendingUp },
  { title: "calendar", href: "/app/calendar", icon: Calendar },
  { title: "appointments", href: "/app/appointments", icon: Activity },
  { title: "patients", href: "/app/patients", icon: Users },
  { title: "doctors", href: "/app/doctors", icon: Stethoscope },
  { title: "teleconsultation", href: "/app/teleconsultation", icon: Video },
  { title: "aiIntelligence", href: "/app/ai-intelligence", icon: BrainCircuit },
  { title: "queue", href: "/app/queue", icon: Monitor },
  { title: "surgeries", href: "/app/surgeries", icon: Scissors },
  { title: "emergency", href: "/app/emergency", icon: Siren },
  { title: "ambulances", href: "/app/ambulances", icon: Truck },
  { title: "internalChat", href: "/app/internal-chat", icon: MessageCircle },
  { title: "hr", href: "/app/hr", icon: Briefcase },
  { title: "laboratory", href: "/app/laboratory", icon: FlaskConical },
  { title: "notifications", href: "/app/notifications", icon: Bell },
  { title: "audit", href: "/app/audit", icon: History },
  { title: "rooms", href: "/app/rooms", icon: Bed },
  { title: "aiPrescription", href: "/app/ai-prescription", icon: Sparkles },
  { title: "pharmacy", href: "/app/pharmacy", icon: Pill },
  { title: "services", href: "/app/services", icon: Briefcase },
  { title: "publicPortal", href: "/portal", icon: HeartPulse },
];

const configNavItems: { title: TranslationKeys; href: string; icon: any }[] = [
  { title: "subscriptions", href: "/app/subscriptions", icon: Crown },
  { title: "aiSettings", href: "/app/ai-settings", icon: Sparkles },
  { title: "security", href: "/app/security", icon: ShieldCheck },
  { title: "settings", href: "/app/settings", icon: Settings },
  { title: "billing", href: "/app/billing", icon: CreditCard },
  { title: "myProfile", href: "/app/profile", icon: User },
];

export default function Sidebar() {
  const { t } = useTranslation();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const NavContent = () => (
    <>
      {/* Logo */}
      <Link href="/" className={cn("p-6 flex items-center gap-3 hover:opacity-90 transition-all group", collapsed ? "justify-center px-2" : "px-8")}>
        <div className="w-10 h-10 rounded-[14px] bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center shadow-xl shadow-teal-500/20 shrink-0 floating group-hover:rotate-12 transition-transform duration-500">
          <HeartPulse className="w-6 h-6 text-white" />
        </div>
        {!collapsed && (
          <div className="flex flex-col min-w-0">
            <div className="flex items-baseline">
              <span className="text-xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">Hopify</span>
              <span className="w-1 h-1 rounded-full bg-teal-500 ml-0.5"></span>
            </div>
            <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1.5 truncate">Saint-Joseph Medical</span>
          </div>
        )}
      </Link>

      <div className="flex-1 overflow-y-auto px-3 py-2 flex flex-col gap-6">
        <nav className="flex flex-col gap-1">
          {mainNavItems.map((item) => {
            const isActive = pathname === item.href || (pathname === "/" && item.href === "/app/dashboard");
            return (
              <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)}>
                <div className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group relative",
                  collapsed && "justify-center px-2",
                  isActive
                    ? "bg-teal-50 dark:bg-teal-500/10 text-teal-700 dark:text-teal-400"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200"
                )}>
                  <item.icon className={cn("w-5 h-5 shrink-0", isActive ? "text-teal-600 dark:text-teal-400" : "text-slate-400")} />
                  {!collapsed && t(item.title)}
                  {collapsed && (
                    <div className="absolute left-full ml-2 px-2.5 py-1.5 bg-slate-900 dark:bg-slate-700 text-white text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-lg">
                      {t(item.title)}
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </nav>

        <div>
          {!collapsed && <h4 className="px-3 text-xs font-semibold text-slate-400 dark:text-slate-500 tracking-wider mb-2 uppercase">Config</h4>}
          <nav className="flex flex-col gap-1">
            {configNavItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)}>
                  <div className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group relative",
                    collapsed && "justify-center px-2",
                    isActive
                      ? "bg-teal-50 dark:bg-teal-500/10 text-teal-700 dark:text-teal-400"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200"
                  )}>
                    <item.icon className={cn("w-5 h-5 shrink-0", isActive ? "text-teal-600 dark:text-teal-400" : "text-slate-400")} />
                    {!collapsed && t(item.title)}
                    {collapsed && (
                      <div className="absolute left-full ml-2 px-2.5 py-1.5 bg-slate-900 dark:bg-slate-700 text-white text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-lg">
                        {t(item.title)}
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      <div className="p-3 mt-auto border-t border-slate-200 dark:border-slate-800 flex flex-col gap-1">
        <button 
          onClick={() => logout()}
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 w-full rounded-xl text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200 transition-colors",
            collapsed && "justify-center px-2"
          )}
        >
          <LogOut className="w-5 h-5 text-slate-400 shrink-0" />
          {!collapsed && t("logout")}
        </button>
        {/* Collapse toggle — desktop only */}
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "hidden lg:flex items-center gap-3 px-3 py-2 w-full rounded-xl text-xs font-medium text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-600 dark:hover:text-slate-300 transition-colors",
            collapsed && "justify-center px-2"
          )}
        >
          {collapsed ? <PanelLeft className="w-4 h-4 shrink-0" /> : <><PanelLeftClose className="w-4 h-4 shrink-0" /> Collapse</>}
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-lg"
      >
        <Menu className="w-5 h-5 text-slate-600 dark:text-slate-300" />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
      )}

      {/* Mobile sidebar */}
      <div className={cn(
        "lg:hidden fixed top-0 left-0 z-50 h-full w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col transition-transform duration-300 ease-in-out",
        mobileOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <NavContent />
      </div>

      {/* Desktop sidebar */}
      <div className={cn(
        "hidden lg:flex flex-col h-full bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 shrink-0 transition-all duration-300",
        collapsed ? "w-[68px]" : "w-64"
      )}>
        <NavContent />
      </div>
    </>
  );
}
