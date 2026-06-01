"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { 
  CreditCard, 
  Banknote, 
  Smartphone, 
  CheckCircle2, 
  ShieldCheck,
  ChevronRight,
  Wallet,
  Globe
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  invoiceId: string;
  amount: number;
}

export default function PaymentModal({ open, onOpenChange, invoiceId, amount }: PaymentModalProps) {
  const [method, setMethod] = useState<"card" | "cash" | "mobile" | "stripe" | "paypal">("card");
  const [partial, setPartial] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState(amount);

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`Payment Successful!`, {
      description: `$${paymentAmount} paid via ${method.toUpperCase()} for Invoice ${invoiceId}.`,
    });
    onOpenChange(false);
  };

  const paymentMethods = [
    { id: "card", label: "Credit Card", icon: <CreditCard className="w-5 h-5" /> },
    { id: "stripe", label: "Stripe", icon: <Globe className="w-5 h-5 text-indigo-500" /> },
    { id: "paypal", label: "PayPal", icon: <Wallet className="w-5 h-5 text-blue-500" /> },
    { id: "mobile", label: "Mobile Money", icon: <Smartphone className="w-5 h-5 text-teal-500" /> },
    { id: "cash", label: "Cash", icon: <Banknote className="w-5 h-5 text-emerald-500" /> },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-black flex items-center gap-2">
             <CreditCard className="w-6 h-6 text-teal-600" /> Process Payment
          </DialogTitle>
          <DialogDescription>
            Securely process payment for invoice <span className="font-bold">{invoiceId}</span>.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handlePayment} className="space-y-6 mt-4">
           {/* Summary Box */}
           <div className="p-6 bg-slate-900 dark:bg-slate-950 rounded-[2rem] text-white">
              <div className="flex justify-between items-center mb-6">
                 <div>
                    <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Total Due</p>
                    <p className="text-3xl font-black">${amount.toFixed(2)}</p>
                 </div>
                 <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6 text-teal-400" />
                 </div>
              </div>

              <div className="flex items-center gap-4">
                 <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 accent-teal-500" 
                      checked={partial} 
                      onChange={(e) => setPartial(e.target.checked)} 
                    />
                    <span className="text-xs font-bold text-white/70">Partial Payment</span>
                 </label>
                 {partial && (
                    <input 
                      type="number"
                      className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm font-bold outline-none focus:border-teal-500"
                      value={paymentAmount}
                      onChange={(e) => setPaymentAmount(Number(e.target.value))}
                    />
                 )}
              </div>
           </div>

           {/* Methods Grid */}
           <div className="space-y-3">
              <h4 className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1">Select Payment Method</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                 {paymentMethods.map(m => (
                   <button
                     key={m.id}
                     type="button"
                     onClick={() => setMethod(m.id as any)}
                     className={cn(
                       "flex flex-col items-center gap-3 p-4 rounded-2xl border transition-all",
                       method === m.id 
                         ? "bg-teal-600 border-teal-600 text-white shadow-lg shadow-teal-500/20" 
                         : "bg-slate-50 dark:bg-slate-800/50 border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-teal-500/30"
                     )}
                   >
                      {m.icon}
                      <span className="text-[10px] font-black uppercase tracking-widest">{m.label}</span>
                   </button>
                 ))}
              </div>
           </div>

           {/* Insurance Section */}
           <div className="p-4 bg-blue-50 dark:bg-blue-500/5 border border-blue-100 dark:border-blue-500/10 rounded-2xl flex items-center justify-between group cursor-pointer">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-500/10 flex items-center justify-center text-blue-600">
                    <ShieldCheck className="w-5 h-5" />
                 </div>
                 <div>
                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Insurance Applied</p>
                    <p className="text-xs font-bold text-slate-700 dark:text-slate-300">AXA Health Care - 80% Coverage</p>
                 </div>
              </div>
              <ChevronRight className="w-4 h-4 text-blue-400 group-hover:translate-x-1 transition-transform" />
           </div>

           <DialogFooter className="pt-4 gap-2">
              <button type="button" onClick={() => onOpenChange(false)} className="px-6 py-2.5 text-[10px] font-black uppercase tracking-widest text-slate-500">Cancel</button>
              <button type="submit" className="px-8 py-2.5 bg-teal-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-teal-500/20">
                 Pay ${paymentAmount.toFixed(2)} Now
              </button>
           </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
