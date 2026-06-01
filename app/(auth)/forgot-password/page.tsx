"use client";

import Link from "next/link";
import { Mail, ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { useState } from "react";
import { resetPassword } from "@/app/actions/auth";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const result = await resetPassword(formData);
    
    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success("Reset link sent! Please check your email.");
    }
    setLoading(false);
  };

  return (
    <div className="space-y-8">
      <div>
        <Link 
          href="/login" 
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-teal-600 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to login
        </Link>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Reset password</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2">
          Enter your email and we&apos;ll send you instructions to reset your password.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
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

        <button 
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white py-3.5 rounded-xl font-bold text-sm transition-all shadow-md shadow-teal-500/25 flex items-center justify-center gap-2 group disabled:opacity-70"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              Send Reset Link
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </form>

      <div className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-center">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Remembered your password?{" "}
          <Link href="/login" className="text-teal-600 dark:text-teal-400 font-bold hover:underline">
            Try signing in
          </Link>
        </p>
      </div>
    </div>
  );
}
