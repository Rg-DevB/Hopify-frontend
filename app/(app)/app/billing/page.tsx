"use client";

import { 
  CreditCard, Search, Plus, Filter, 
  ArrowUpRight, ArrowDownRight, Clock, CheckCircle2, 
  FileText, MoreVertical, Download, Printer,
  TrendingUp, Wallet, Banknote, Landmark,
  BarChart3, PieChart
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import CreateInvoiceModal from "@/components/modals/create-invoice-modal";
import PaymentModal from "@/components/modals/payment-modal";

const invoices = [
  { id: "INV-2024-001", patient: "Md Tajuddin", date: "May 02, 2024", amount: 150.00, status: "Paid", service: "General Consultation" },
  { id: "INV-2024-002", patient: "Sarah Miller", date: "May 03, 2024", amount: 2450.00, status: "Pending", service: "Cardiac Surgery" },
  { id: "INV-2024-003", patient: "Asif Khan", date: "May 04, 2024", amount: 85.00, status: "Overdue", service: "Lab Test" },
  { id: "INV-2024-004", patient: "Elena Rodriguez", date: "May 05, 2024", amount: 120.00, status: "Paid", service: "Pediatric Checkup" },
];

export default function BillingPage() {
  const [filter, setFilter] = useState("All");
  const [paymentModal, setPaymentModal] = useState({ open: false, id: "", amount: 0 });

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
           <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-1">Financial Management / Accounting</p>
           <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Revenue & Billing</h1>
           <p className="text-slate-500 dark:text-slate-400 mt-1">Monitor clinical income, pending invoices, and financial reports.</p>
        </div>
        
        <div className="flex items-center gap-3">
           <button className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-300 hover:bg-slate-50 transition-all shadow-sm">
              <BarChart3 className="w-4 h-4" /> Reports
           </button>
           <CreateInvoiceModal />
        </div>
      </div>

      {/* Accounting Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 transition-all hover:border-teal-500/30 group">
            <div className="w-12 h-12 bg-teal-50 dark:bg-teal-500/10 rounded-2xl flex items-center justify-center text-teal-600 group-hover:scale-110 transition-transform">
               <TrendingUp className="w-6 h-6" />
            </div>
            <div>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Revenue (MTD)</p>
               <h3 className="text-3xl font-black text-slate-900 dark:text-white mt-1">$42,850</h3>
               <div className="flex items-center gap-1.5 text-emerald-600 text-[10px] font-black mt-2">
                  <ArrowUpRight className="w-3 h-3" /> +18% from last month
               </div>
            </div>
         </div>

         <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 transition-all hover:border-amber-500/30 group">
            <div className="w-12 h-12 bg-amber-50 dark:bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-600 group-hover:scale-110 transition-transform">
               <Clock className="w-6 h-6" />
            </div>
            <div>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pending Invoices</p>
               <h3 className="text-3xl font-black text-slate-900 dark:text-white mt-1">$8,240</h3>
               <p className="text-[10px] text-amber-600 font-bold mt-2">12 Payments awaited</p>
            </div>
         </div>

         <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 transition-all hover:border-rose-500/30 group">
            <div className="w-12 h-12 bg-rose-50 dark:bg-rose-500/10 rounded-2xl flex items-center justify-center text-rose-600 group-hover:scale-110 transition-transform">
               <ArrowDownRight className="w-6 h-6" />
            </div>
            <div>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Clinical Expenses</p>
               <h3 className="text-3xl font-black text-slate-900 dark:text-white mt-1">$15,400</h3>
               <p className="text-[10px] text-rose-600 font-bold mt-2">Inventory & Maintenance</p>
            </div>
         </div>

         <div className="bg-slate-900 dark:bg-slate-100 p-8 rounded-[2rem] shadow-xl space-y-6">
            <div className="w-12 h-12 bg-white/10 dark:bg-black/5 rounded-2xl flex items-center justify-center text-white dark:text-black">
               <Wallet className="w-6 h-6" />
            </div>
            <div>
               <p className="text-[10px] font-black text-white/50 dark:text-slate-400 uppercase tracking-widest">Net Profit</p>
               <h3 className="text-3xl font-black text-white dark:text-slate-900 mt-1">$27,450</h3>
               <p className="text-[10px] text-teal-400 dark:text-teal-600 font-bold mt-2">Optimized this month</p>
            </div>
         </div>
      </div>

      {/* Main Billing Interface */}
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-colors">
        <div className="p-8 border-b border-slate-50 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
           <div className="flex items-center gap-4">
              <h2 className="text-xl font-black text-slate-900 dark:text-white">Recent Transactions</h2>
              <div className="flex bg-slate-50 dark:bg-slate-800 rounded-xl p-1 border border-slate-100 dark:border-slate-700">
                 {["All", "Paid", "Pending", "Overdue"].map((f) => (
                   <button
                     key={f}
                     onClick={() => setFilter(f)}
                     className={cn(
                       "px-5 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all",
                       filter === f ? "bg-white dark:bg-slate-900 text-teal-600 shadow-sm" : "text-slate-500"
                     )}
                   >
                     {f}
                   </button>
                 ))}
              </div>
           </div>
           <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input placeholder="Search invoice or patient..." className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-xs outline-none focus:border-teal-500 transition-all" />
           </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left whitespace-nowrap">
            <thead className="bg-slate-50/50 dark:bg-slate-800/50 text-[9px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50 dark:border-slate-800">
              <tr>
                <th className="px-8 py-5">Invoice ID</th>
                <th className="px-8 py-5">Patient / Insurance</th>
                <th className="px-8 py-5">Service Rendered</th>
                <th className="px-8 py-5">Amount</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {invoices.filter(inv => filter === "All" || inv.status === filter).map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors group">
                  <td className="px-8 py-6">
                    <Link href={`/app/billing/${inv.id}`} className="font-black text-teal-600 hover:underline text-sm">
                      {inv.id}
                    </Link>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{inv.date}</p>
                  </td>
                  <td className="px-8 py-6">
                    <div>
                       <p className="text-sm font-black text-slate-900 dark:text-white">{inv.patient}</p>
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                          <Landmark className="w-3 h-3" /> AXA Health Care
                       </p>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-400">{inv.service}</span>
                  </td>
                  <td className="px-8 py-6">
                     <p className="text-sm font-black text-slate-900 dark:text-white">${inv.amount.toFixed(2)}</p>
                     {inv.status === "Pending" && <p className="text-[9px] text-amber-600 font-black uppercase">Partial payment allowed</p>}
                  </td>
                  <td className="px-8 py-6">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border",
                      inv.status === "Paid" ? "text-emerald-600 border-emerald-100 bg-emerald-50" : 
                      inv.status === "Pending" ? "text-amber-600 border-amber-100 bg-amber-50" : 
                      "text-rose-600 border-rose-100 bg-rose-50"
                    )}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {inv.status !== "Paid" && (
                        <button 
                          onClick={() => setPaymentModal({ open: true, id: inv.id, amount: inv.amount })}
                          className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg"
                        >
                          Collect Payment
                        </button>
                      )}
                      <button className="p-2 text-slate-400 hover:text-teal-600 transition-colors">
                        <Printer className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-8 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 flex items-center justify-between">
           <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-emerald-500" />
                 <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Revenue: $42.8k</span>
              </div>
              <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-rose-500" />
                 <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Expenses: $15.4k</span>
              </div>
           </div>
           <div className="flex gap-2">
              <button className="px-5 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-slate-50 transition-all shadow-sm">Previous</button>
              <button className="px-5 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-white hover:bg-slate-50 transition-all shadow-sm">Next</button>
           </div>
        </div>
      </div>

      <PaymentModal 
        open={paymentModal.open}
        onOpenChange={(open) => setPaymentModal({ ...paymentModal, open })}
        invoiceId={paymentModal.id}
        amount={paymentModal.amount}
      />
    </div>
  );
}
