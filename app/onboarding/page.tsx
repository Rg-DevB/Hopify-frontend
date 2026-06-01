"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Building2, 
  User, 
  Globe, 
  Mail, 
  Lock, 
  ArrowRight, 
  CheckCircle2, 
  ChevronLeft,
  Loader2,
  HeartPulse,
  ShieldCheck,
  Zap
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

type Step = 1 | 2 | 3;

export default function OnboardingPage() {
  const [step, setStep] = useState<Step>(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    hospitalName: "",
    subdomain: "",
    hospitalEmail: "",
    adminFname: "",
    adminLname: "",
    adminEmail: "",
    password: "",
    confirmPassword: ""
  });

  const nextStep = () => setStep((s) => (s + 1) as Step);
  const prevStep = () => setStep((s) => (s - 1) as Step);

  const handleSubmit = async () => {
    setLoading(true);
    // Simulation de l'appel API vers Laravel
    setTimeout(() => {
      setStep(3);
      setLoading(false);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col md:flex-row">
      {/* Left Side: Form */}
      <div className="flex-1 flex flex-col p-8 md:p-16 lg:p-24 overflow-y-auto">
        <div className="max-w-md w-full mx-auto">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 mb-12 group">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg shadow-teal-500/20 group-hover:rotate-12 transition-transform duration-500">
              <HeartPulse className="w-6 h-6 text-white" />
            </div>
            <div className="flex items-baseline">
              <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Hopify</span>
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500 ml-1 mb-1"></span>
            </div>
          </Link>

          {/* Progress Bar */}
          <div className="space-y-2 mb-12">
            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
              <span>Step {step} of 3</span>
              <span>{Math.round((step / 3) * 100)}% Complete</span>
            </div>
            <Progress value={(step / 3) * 100} className="h-1.5 bg-slate-100 dark:bg-slate-800" />
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Hospital Profile</h2>
                  <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">Tell us about your healthcare institution.</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-slate-500">Hospital Name</Label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input 
                        placeholder="General Medical Center" 
                        className="pl-10 h-12 rounded-xl border-slate-200 dark:border-slate-800 focus:ring-teal-500/20" 
                        value={formData.hospitalName}
                        onChange={(e) => setFormData({...formData, hospitalName: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-slate-500">Desired Subdomain</Label>
                    <div className="relative flex items-center">
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input 
                        placeholder="myclinic" 
                        className="pl-10 pr-28 h-12 rounded-xl border-slate-200 dark:border-slate-800 focus:ring-teal-500/20" 
                        value={formData.subdomain}
                        onChange={(e) => setFormData({...formData, subdomain: e.target.value.toLowerCase().replace(/\s+/g, '')})}
                      />
                      <span className="absolute right-3 text-xs font-bold text-slate-400">.hopify.com</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-slate-500">Institutional Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input 
                        type="email"
                        placeholder="contact@hospital.com" 
                        className="pl-10 h-12 rounded-xl border-slate-200 dark:border-slate-800 focus:ring-teal-500/20" 
                        value={formData.hospitalEmail}
                        onChange={(e) => setFormData({...formData, hospitalEmail: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={nextStep}
                  disabled={!formData.hospitalName || !formData.subdomain || !formData.hospitalEmail}
                  className="w-full h-12 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black uppercase tracking-widest text-[11px] hover:scale-[1.02] active:scale-95 transition-all"
                >
                  Continue to Admin Setup <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <button onClick={prevStep} className="flex items-center gap-2 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors text-xs font-bold uppercase tracking-widest">
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>

                <div>
                  <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Super Admin Account</h2>
                  <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">Create the primary administrator account.</p>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-xs font-black uppercase tracking-widest text-slate-500">First Name</Label>
                      <Input 
                        placeholder="John" 
                        className="h-12 rounded-xl border-slate-200 dark:border-slate-800" 
                        value={formData.adminFname}
                        onChange={(e) => setFormData({...formData, adminFname: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-black uppercase tracking-widest text-slate-500">Last Name</Label>
                      <Input 
                        placeholder="Doe" 
                        className="h-12 rounded-xl border-slate-200 dark:border-slate-800" 
                        value={formData.adminLname}
                        onChange={(e) => setFormData({...formData, adminLname: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-slate-500">Admin Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input 
                        type="email"
                        placeholder="admin@hospital.com" 
                        className="pl-10 h-12 rounded-xl border-slate-200 dark:border-slate-800" 
                        value={formData.adminEmail}
                        onChange={(e) => setFormData({...formData, adminEmail: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-slate-500">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input 
                        type="password"
                        placeholder="••••••••" 
                        className="pl-10 h-12 rounded-xl border-slate-200 dark:border-slate-800" 
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={handleSubmit}
                  disabled={loading || !formData.adminEmail || !formData.password}
                  className="w-full h-12 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-black uppercase tracking-widest text-[11px] hover:shadow-xl hover:shadow-teal-500/20 active:scale-95 transition-all"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Complete Registration"}
                </Button>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-8 py-12"
              >
                <div className="w-24 h-24 bg-teal-50 dark:bg-teal-500/10 rounded-[2.5rem] flex items-center justify-center text-teal-600 mx-auto">
                   <CheckCircle2 className="w-12 h-12" />
                </div>

                <div className="space-y-2">
                  <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">System Ready!</h2>
                  <p className="text-slate-500 dark:text-slate-400 font-medium">Your hospital infrastructure has been deployed.</p>
                </div>

                <div className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-slate-200 dark:border-slate-800 text-left">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 text-center">Access Credentials</p>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Instance URL:</span>
                      <span className="font-bold text-teal-600">{formData.subdomain}.hopify.com</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Admin Login:</span>
                      <span className="font-bold text-slate-900 dark:text-white">{formData.adminEmail}</span>
                    </div>
                  </div>
                </div>

                <Link href={`/app/dashboard`} className="block">
                  <Button className="w-full h-14 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black uppercase tracking-widest text-[11px] hover:scale-[1.02] active:scale-95 transition-all shadow-xl">
                    Go to Dashboard <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Right Side: Visual/Feature List */}
      <div className="hidden md:flex flex-1 bg-slate-900 dark:bg-slate-900/50 relative overflow-hidden items-center justify-center p-12">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 via-transparent to-cyan-500/10 pointer-events-none" />
        
        {/* Animated Background Circles */}
        <div className="absolute top-1/4 -right-24 w-96 h-96 bg-teal-500/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 -left-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] animate-pulse delay-700" />

        <div className="max-w-md w-full space-y-12 relative z-10">
          <div className="space-y-4">
             <div className="w-16 h-1 bg-teal-500 rounded-full" />
             <h3 className="text-4xl font-black text-white tracking-tight">The future of healthcare management is here.</h3>
          </div>

          <div className="space-y-8">
            <div className="flex gap-4 group">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-teal-400 group-hover:bg-teal-500 group-hover:text-white transition-all">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-bold text-lg">Bank-Grade Security</h4>
                <p className="text-slate-400 text-sm mt-1">Isolated tenant databases with AES-256 encryption for patient data.</p>
              </div>
            </div>

            <div className="flex gap-4 group">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500 group-hover:text-white transition-all">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-bold text-lg">Instant Deployment</h4>
                <p className="text-slate-400 text-sm mt-1">Your entire hospital infrastructure is ready in under 60 seconds.</p>
              </div>
            </div>

            <div className="flex gap-4 group">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-all">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-bold text-lg">Role-Based Control</h4>
                <p className="text-slate-400 text-sm mt-1">Granular permissions for Doctors, Nurses, and Staff pre-configured.</p>
              </div>
            </div>
          </div>

          <div className="p-8 bg-white/5 border border-white/10 rounded-[2.5rem] backdrop-blur-sm">
             <div className="flex items-center gap-3 mb-4">
                <div className="flex -space-x-2">
                   {[1,2,3,4].map(i => <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-800" />)}
                </div>
                <p className="text-xs font-bold text-slate-300 tracking-wide underline underline-offset-4 decoration-teal-500">Joined by 150+ Clinics worldwide</p>
             </div>
             <p className="text-slate-400 text-sm italic italic leading-relaxed font-medium">
               &ldquo;Hopify has transformed how we manage patient records. The speed and security are unmatched.&rdquo;
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}
