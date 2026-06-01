"use client";

import { 
  ArrowLeft, Download, Printer, 
  CheckCircle2, Clock, AlertCircle,
  Mail, Phone, MapPin, Building2,
  FileText, CreditCard
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { cn } from "@/lib/utils";

export default function InvoiceDetailsPage() {
  const params = useParams();
  const id = params.id as string;

  // Mock data for the detailed invoice
  const invoice = {
    id: id || "INV-2024-002",
    date: "May 03, 2024",
    dueDate: "May 10, 2024",
    status: "Pending",
    patient: {
      name: "Sarah Miller",
      email: "sarah.m@example.com",
      phone: "+1 (555) 123-4567",
      address: "123 Healthcare Ave, Suite 405, NY 10001"
    },
    items: [
      { description: "General Consultation", qty: 1, price: 150.00 },
      { description: "Cardiac Surgery", qty: 1, price: 2200.00 },
      { description: "Post-op Care Package", qty: 1, price: 100.00 }
    ],
    tax: 0,
    total: 2450.00
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <Link 
          href="/app/billing" 
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-teal-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Invoices
        </Link>
        <div className="flex items-center gap-3">
          <button className="p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-50 transition-all shadow-sm">
            <Printer className="w-5 h-5" />
          </button>
          <button className="flex items-center gap-2 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-teal-500/25">
            <Download className="w-4 h-4" />
            Download PDF
          </button>
        </div>
      </div>

      {/* Invoice Document */}
      <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
        {/* Status Banner */}
        <div className={cn(
          "px-8 py-4 flex items-center justify-between",
          invoice.status === "Paid" ? "bg-emerald-500 text-white" : 
          invoice.status === "Pending" ? "bg-amber-500 text-white" : 
          "bg-rose-500 text-white"
        )}>
          <div className="flex items-center gap-2 font-bold text-sm">
            {invoice.status === "Paid" ? <CheckCircle2 className="w-4 h-4" /> : 
             invoice.status === "Pending" ? <Clock className="w-4 h-4" /> : 
             <AlertCircle className="w-4 h-4" />}
            Status: {invoice.status.toUpperCase()}
          </div>
          <span className="text-xs opacity-80 font-medium tracking-wider">REF: {invoice.id}</span>
        </div>

        <div className="p-12 space-y-12">
          {/* Top Section */}
          <div className="flex justify-between items-start">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-teal-500/20">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Hopify Clinic</h1>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Medical Excellence</p>
                </div>
              </div>
              <div className="text-sm text-slate-500 space-y-1 ml-1">
                <p className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5" /> 789 Healthcare Blvd, Medical District</p>
                <p className="flex items-center gap-2"><Phone className="w-3.5 h-3.5" /> +1 (800) HOPIFY-ME</p>
                <p className="flex items-center gap-2"><Mail className="w-3.5 h-3.5" /> billing@hopify.com</p>
              </div>
            </div>

            <div className="text-right">
              <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-2">INVOICE</h2>
              <div className="text-sm text-slate-500 space-y-1">
                <p>Number: <span className="font-bold text-slate-900 dark:text-white">{invoice.id}</span></p>
                <p>Date: <span className="font-bold text-slate-900 dark:text-white">{invoice.date}</span></p>
                <p>Due Date: <span className="font-bold text-rose-500">{invoice.dueDate}</span></p>
              </div>
            </div>
          </div>

          {/* Billing Info */}
          <div className="grid grid-cols-2 gap-12 pt-12 border-t border-slate-100 dark:border-slate-800">
            <div className="space-y-4">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Bill To</h3>
              <div>
                <p className="text-lg font-black text-slate-900 dark:text-white">{invoice.patient.name}</p>
                <div className="text-sm text-slate-500 space-y-1 mt-2">
                  <p>{invoice.patient.address}</p>
                  <p>{invoice.patient.phone}</p>
                  <p>{invoice.patient.email}</p>
                </div>
              </div>
            </div>
            <div className="space-y-4 text-right">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Payment Method</h3>
              <div className="flex items-center justify-end gap-3 text-slate-700 dark:text-slate-300">
                <span className="text-sm font-bold">Direct Bank Transfer</span>
                <CreditCard className="w-5 h-5 text-teal-500" />
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="space-y-6">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <th className="px-6 py-3 rounded-l-xl">Description</th>
                  <th className="px-6 py-3">Qty</th>
                  <th className="px-6 py-3">Unit Price</th>
                  <th className="px-6 py-3 text-right rounded-r-xl">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800 text-sm">
                {invoice.items.map((item, idx) => (
                  <tr key={idx}>
                    <td className="px-6 py-6 font-bold text-slate-800 dark:text-slate-200">{item.description}</td>
                    <td className="px-6 py-6 text-slate-500">{item.qty}</td>
                    <td className="px-6 py-6 text-slate-500">${item.price.toFixed(2)}</td>
                    <td className="px-6 py-6 text-right font-black text-slate-900 dark:text-white">${(item.qty * item.price).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary */}
          <div className="flex justify-end pt-8 border-t border-slate-100 dark:border-slate-800">
            <div className="w-64 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Subtotal</span>
                <span className="font-bold text-slate-700 dark:text-slate-300">${invoice.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Tax (0%)</span>
                <span className="font-bold text-slate-700 dark:text-slate-300">$0.00</span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t-2 border-slate-900 dark:border-white">
                <span className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest">Total Amount</span>
                <span className="text-2xl font-black text-teal-600">${invoice.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="p-8 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
            <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest mb-2 flex items-center gap-2">
              <FileText className="w-4 h-4 text-teal-500" />
              Notes / Payment Instructions
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Please include the invoice number <strong>{invoice.id}</strong> as a reference in your bank transfer. 
              Payments are due within 7 days of the invoice date. Thank you for choosing Hopify Clinic for your medical needs.
            </p>
          </div>
        </div>
      </div>

      {/* Pay Now Button (if pending) */}
      {invoice.status === "Pending" && (
        <button className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-6 rounded-3xl font-black text-lg shadow-2xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3">
          <CreditCard className="w-6 h-6" />
          PROCEED TO PAYMENT
        </button>
      )}
    </div>
  );
}
