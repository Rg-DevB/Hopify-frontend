"use client";

import { HeartPulse, User, Bell, LogOut, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";
import LanguageSwitcher from "@/components/language-switcher";

export default function PatientPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans selection:bg-teal-500/30">
      {/* Navigation */}
      <nav className="sticky top-0 z-[100] bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center gap-3">
              <Link href="/portal" className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-teal-500/20 group-hover:scale-105 transition-transform">
                  <HeartPulse className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Hopify</span>
                  <span className="block text-[10px] font-black text-teal-600 uppercase tracking-widest">Patient Portal</span>
                </div>
              </Link>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <Link href="/portal" className="text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-teal-600 transition-colors">Find a Doctor</Link>
              <Link href="/portal/appointments" className="text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-teal-600 transition-colors">My Appointments</Link>
              <Link href="/portal/records" className="text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-teal-600 transition-colors">Medical Records</Link>
              
              <div className="h-6 w-px bg-slate-200 dark:bg-slate-800" />
              
              <div className="flex items-center gap-4">
                <LanguageSwitcher />
                <button className="relative p-2 text-slate-400 hover:text-teal-600 transition-colors">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white dark:border-slate-900" />
                </button>
                <div className="flex items-center gap-3 pl-2">
                  <div className="text-right hidden sm:block">
                    <p className="text-xs font-black text-slate-900 dark:text-white">Md Tajuddin</p>
                    <p className="text-[10px] text-slate-500 font-bold">Patient ID: PAT-0012</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-white dark:border-slate-800 flex items-center justify-center overflow-hidden">
                    <User className="w-5 h-5 text-slate-400" />
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-slate-600 dark:text-slate-400"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4 animate-in slide-in-from-top duration-300">
            <div className="space-y-4">
              <Link href="/portal" className="block text-sm font-bold p-2">Find a Doctor</Link>
              <Link href="/portal/appointments" className="block text-sm font-bold p-2">My Appointments</Link>
              <Link href="/portal/records" className="block text-sm font-bold p-2">Medical Records</Link>
            </div>
          </div>
        )}
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-4">
          <div className="flex items-center justify-center gap-2 mb-6">
            <HeartPulse className="w-6 h-6 text-teal-600" />
            <span className="text-xl font-black text-slate-900 dark:text-white">Hopify</span>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Secure, HIPAA compliant healthcare portal. © 2024 Hopify Medical Group.
          </p>
          <div className="flex justify-center gap-6 text-xs font-bold text-slate-400 uppercase tracking-widest">
            <Link href="#" className="hover:text-teal-600 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-teal-600 transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-teal-600 transition-colors">Support</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
