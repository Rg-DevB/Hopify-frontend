"use client";

import Link from "next/link";
import { User, Mail, Lock, ArrowRight, Chrome, ShieldCheck, Loader2 } from "lucide-react";
import { useState } from "react";
import { signup } from "@/app/actions/auth";
import { toast } from "sonner";

export default function SignupPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const result = await signup(formData);
    
    if (result?.error) {
      toast.error(result.error);
      setLoading(false);
    } else {
      toast.success("Account created successfully! Please check your email for verification.");
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Join Hopify</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2">
          Start managing your clinic with AI-powered efficiency
        </p>
      </div>

      <div className="space-y-4">
        <button className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm">
          <Chrome className="w-5 h-5 text-red-500" />
          Sign up with Google
        </button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-slate-200 dark:border-slate-800" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white dark:bg-slate-950 px-2 text-slate-500">Or use your email</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Full Name</label>
          <div className="relative">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              name="fullName"
              type="text" 
              required
              placeholder="Dr. John Doe" 
              className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:bg-white dark:focus:bg-slate-900 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all dark:text-slate-200"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Email address</label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              name="email"
              type="email" 
              required
              placeholder="name@example.com" 
              className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:bg-white dark:focus:bg-slate-900 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all dark:text-slate-200"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Password</label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              name="password"
              type="password" 
              required
              placeholder="••••••••" 
              className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:bg-white dark:focus:bg-slate-900 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all dark:text-slate-200"
            />
          </div>
        </div>

        <div className="p-4 bg-teal-50 dark:bg-teal-500/5 border border-teal-100 dark:border-teal-500/20 rounded-xl flex gap-3">
          <ShieldCheck className="w-5 h-5 text-teal-600 dark:text-teal-400 shrink-0" />
          <p className="text-xs text-teal-700 dark:text-teal-300 leading-relaxed">
            By creating an account, you agree to our Terms of Service and Privacy Policy regarding HIPAA-compliant data handling.
          </p>
        </div>

        <button 
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white py-3.5 rounded-xl font-bold text-sm transition-all shadow-md shadow-teal-500/25 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              Create My Account
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </form>

      <p className="text-center text-sm text-slate-500 dark:text-slate-400 pt-2">
        Already have an account?{" "}
        <Link href="/login" className="text-teal-600 dark:text-teal-400 font-bold hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
