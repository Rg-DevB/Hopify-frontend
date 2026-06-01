"use client";

import { HeartPulse } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white dark:bg-slate-950">
      {/* Left Side: Illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-50 dark:bg-slate-900/50 p-12 flex-col justify-between relative overflow-hidden">
        {/* Subtle background patterns */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5 dark:opacity-10 pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-teal-500 rounded-full blur-[100px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-cyan-500 rounded-full blur-[100px]" />
        </div>

        <Link href="/" className="flex items-center gap-2.5 relative z-10">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-teal-500/20">
            <HeartPulse className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">Hopify</span>
        </Link>

        <div className="relative z-10 flex flex-col items-center text-center max-w-lg mx-auto">
          <div className="relative w-full aspect-square mb-8 animate-float">
             <Image 
              src="/auth_illustration_1778140362476.png" 
              alt="Medical Illustration" 
              fill
              className="object-contain"
              priority
            />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
            Transforming Healthcare with Intelligence
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed">
            Manage your clinic, automate bookings, and provide superior care with Hopify&apos;s all-in-one AI platform.
          </p>
        </div>

        <div className="relative z-10 text-sm text-slate-400 dark:text-slate-500 flex justify-between items-center">
          <span>&copy; 2026 Hopify. All rights reserved.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-teal-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-teal-600 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-20 xl:px-32 relative">
        <div className="lg:hidden absolute top-8 left-8">
           <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center">
              <HeartPulse className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">Hopify</span>
          </Link>
        </div>
        
        <div className="mx-auto w-full max-w-sm lg:max-w-md">
          {children}
        </div>
      </div>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
