"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { ShoppingCart, Pill, User, CreditCard, Scan, Plus, Minus } from "lucide-react";

export default function SaleModal() {
  const [open, setOpen] = useState(false);
  const [cart, setCart] = useState<{ id: string; name: string; qty: number; price: number }[]>([
    { id: "MED-001", name: "Amoxicillin", qty: 2, price: 12.50 },
  ]);

  const total = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);

  const handleProcess = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`Sale Processed!`, {
      description: `Total $${total.toFixed(2)} charged. Inventory updated.`,
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-5 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 transition-all shadow-lg active:scale-95">
          <ShoppingCart className="w-4 h-4" />
          Point of Sale
        </button>
      </DialogTrigger>
      <DialogContent className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-black flex items-center gap-2">
             <CreditCard className="w-6 h-6 text-teal-600" /> Pharmacy Sale
          </DialogTitle>
          <DialogDescription>
            Process drug sales and link to patient prescriptions.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-6">
           {/* Patient Search & Scan */}
           <div className="flex gap-3">
              <div className="flex-1 relative">
                 <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                 <input placeholder="Search Patient or Order ID..." className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:border-teal-500 transition-all" />
              </div>
              <button className="px-4 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
                 <Scan className="w-4 h-4" /> Scan Barcode
              </button>
           </div>

           {/* Cart Items */}
           <div className="space-y-3">
              <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Current Order</h4>
              {cart.map(item => (
                <div key={item.id} className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 flex items-center justify-center text-teal-600 border border-slate-100 dark:border-slate-800">
                         <Pill className="w-5 h-5" />
                      </div>
                      <div>
                         <p className="text-sm font-black text-slate-900 dark:text-white">{item.name}</p>
                         <p className="text-[10px] font-bold text-slate-400 uppercase">${item.price.toFixed(2)} / unit</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-3">
                      <button className="p-1.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 hover:text-rose-600 transition-colors"><Minus className="w-3.5 h-3.5" /></button>
                      <span className="text-sm font-black w-6 text-center">{item.qty}</span>
                      <button className="p-1.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 hover:text-teal-600 transition-colors"><Plus className="w-3.5 h-3.5" /></button>
                   </div>
                </div>
              ))}
           </div>

           {/* Summary */}
           <div className="p-6 bg-slate-900 dark:bg-slate-950 rounded-[2rem] text-white">
              <div className="flex items-center justify-between mb-4">
                 <span className="text-xs font-bold text-white/50 uppercase tracking-widest">Subtotal</span>
                 <span className="text-sm font-bold">${total.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between mb-6 pt-4 border-t border-white/10">
                 <span className="text-sm font-black uppercase tracking-widest text-teal-400">Total Amount</span>
                 <span className="text-2xl font-black">${total.toFixed(2)}</span>
              </div>
              <button onClick={handleProcess} className="w-full py-4 bg-teal-600 hover:bg-teal-700 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all shadow-xl shadow-teal-500/20">
                 Complete Payment
              </button>
           </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
