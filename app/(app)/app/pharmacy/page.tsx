"use client";

import { 
  Pill, Search, Plus, Filter, 
  AlertTriangle, CheckCircle2, Calendar, 
  ArrowUpRight, Package, Truck, MoreVertical,
  History, Settings2, Download,
  ShoppingCart, Barcode, ClipboardList,
  AlertCircle, TrendingUp
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import SaleModal from "@/components/modals/sale-modal";

const inventory = [
  { id: "MED-001", name: "Amoxicillin", category: "Antibiotics", stock: 850, unit: "Capsules", expiry: "2025-12-15", status: "In Stock", price: 12.50, supplier: "PharmaCorp" },
  { id: "MED-002", name: "Paracetamol", category: "Analgesics", stock: 45, unit: "Tablets", expiry: "2024-08-20", status: "Low Stock", price: 5.00, supplier: "MediSupply" },
  { id: "MED-003", name: "Insulin Glargine", category: "Antidiabetic", stock: 120, unit: "Vials", expiry: "2025-01-10", status: "In Stock", price: 45.00, supplier: "BioLife" },
  { id: "MED-004", name: "Atorvastatin", category: "Statins", stock: 0, unit: "Tablets", expiry: "2024-10-30", status: "Out of Stock", price: 18.00, supplier: "PharmaCorp" },
  { id: "MED-005", name: "Diazepam", category: "Sedatives", stock: 15, unit: "Tablets", expiry: "2024-05-15", status: "Expiring Soon", price: 22.00, supplier: "MediSupply" },
];

const pendingOrders = [
  { id: "ORD-992", patient: "Md Tajuddin", med: "Amoxicillin", date: "Today", status: "Pending" },
  { id: "ORD-991", patient: "Sarah Miller", med: "Lisinopril", date: "2h ago", status: "Ready" },
];

export default function PharmacyPage() {
  const [filter, setFilter] = useState("All");

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
           <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-1">Clinic / Logistics</p>
           <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Pharmacy Control Center</h1>
           <p className="text-slate-500 dark:text-slate-400 mt-1">Drug inventory, sales tracking, and prescription fulfillment.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 border border-slate-200 dark:border-slate-800 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-300 hover:bg-slate-50 transition-all shadow-sm">
            <Barcode className="w-4 h-4" /> Scanner
          </button>
          <SaleModal />
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 transition-all hover:border-teal-500/30">
          <div className="w-12 h-12 bg-teal-50 dark:bg-teal-500/10 rounded-2xl flex items-center justify-center text-teal-600">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Inventory</p>
            <h3 className="text-3xl font-black text-slate-900 dark:text-white mt-1">1,248 <span className="text-xs font-bold text-slate-400">SKUs</span></h3>
            <div className="flex items-center gap-1.5 text-emerald-600 text-[10px] font-black mt-2">
               <TrendingUp className="w-3 h-3" /> +12% this month
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 transition-all hover:border-rose-500/30">
          <div className="w-12 h-12 bg-rose-50 dark:bg-rose-500/10 rounded-2xl flex items-center justify-center text-rose-600">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Stock Alerts</p>
            <h3 className="text-3xl font-black text-slate-900 dark:text-white mt-1">12 <span className="text-xs font-bold text-slate-400">Critical</span></h3>
            <p className="text-[10px] text-rose-600 font-bold mt-2">Requires immediate reorder</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 transition-all hover:border-amber-500/30">
          <div className="w-12 h-12 bg-amber-50 dark:bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-600">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Expiring 30d</p>
            <h3 className="text-3xl font-black text-slate-900 dark:text-white mt-1">08 <span className="text-xs font-bold text-slate-400">Items</span></h3>
            <p className="text-[10px] text-amber-600 font-bold mt-2">Check batch #8822</p>
          </div>
        </div>

        <div className="bg-slate-900 dark:bg-slate-100 p-8 rounded-[2rem] shadow-xl space-y-6">
          <div className="w-12 h-12 bg-white/10 dark:bg-black/5 rounded-2xl flex items-center justify-center text-white dark:text-black">
            <ShoppingCart className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] font-black text-white/50 dark:text-slate-400 uppercase tracking-widest">Today&apos;s Revenue</p>
            <h3 className="text-3xl font-black text-white dark:text-slate-900 mt-1">$4,120</h3>
            <p className="text-[10px] text-teal-400 dark:text-teal-600 font-bold mt-2">124 Transactions</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
         {/* Main Inventory (2/3) */}
         <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
               <div className="p-8 border-b border-slate-50 dark:border-slate-800 space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                     <h3 className="text-xl font-black text-slate-900 dark:text-white">Drug Inventory</h3>
                     <div className="flex items-center gap-2">
                        <button className="p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl text-slate-400 hover:text-teal-600 transition-all">
                           <Download className="w-4 h-4" />
                        </button>
                        <button className="bg-teal-600 text-white px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-teal-500/20">
                           <Plus className="w-4 h-4" /> Add Item
                        </button>
                     </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                     <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input placeholder="Search medicine, category..." className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-xs outline-none" />
                     </div>
                     <div className="flex bg-slate-50 dark:bg-slate-800 rounded-xl p-1 border border-slate-100 dark:border-slate-700 overflow-x-auto">
                       {["All", "Low Stock", "Expiring"].map((f) => (
                         <button
                           key={f}
                           onClick={() => setFilter(f)}
                           className={cn(
                             "px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap",
                             filter === f ? "bg-white dark:bg-slate-900 text-teal-600 shadow-sm" : "text-slate-500"
                           )}
                         >
                           {f}
                         </button>
                       ))}
                     </div>
                  </div>
               </div>

               <div className="overflow-x-auto">
                  <table className="w-full text-left whitespace-nowrap">
                     <thead className="bg-slate-50/50 dark:bg-slate-800/50 text-[9px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50 dark:border-slate-800">
                        <tr>
                           <th className="px-8 py-4">Medicine Info</th>
                           <th className="px-8 py-4">Stock Status</th>
                           <th className="px-8 py-4">Price</th>
                           <th className="px-8 py-4 text-right">Actions</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                        {inventory.map((med) => (
                          <tr key={med.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors group">
                             <td className="px-8 py-6">
                                <div className="flex items-center gap-4">
                                   <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-500/10 flex items-center justify-center text-teal-600 border border-teal-100 dark:border-teal-500/20">
                                      <Pill className="w-5 h-5" />
                                   </div>
                                   <div>
                                      <p className="text-sm font-black text-slate-900 dark:text-white">{med.name}</p>
                                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{med.category} • {med.supplier}</p>
                                   </div>
                                </div>
                             </td>
                             <td className="px-8 py-6">
                                <div className="space-y-1.5">
                                   <div className="flex items-center justify-between w-32">
                                      <span className={cn(
                                         "text-xs font-black",
                                         med.stock < 50 ? "text-rose-600" : "text-slate-700 dark:text-slate-200"
                                      )}>{med.stock} <span className="text-[9px] font-bold text-slate-400 uppercase">{med.unit}</span></span>
                                      <span className="text-[9px] font-black text-slate-400 uppercase">Expiry: {med.expiry.split('-')[0]}</span>
                                   </div>
                                   <div className="w-32 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                      <div className={cn(
                                         "h-full transition-all",
                                         med.status === "Low Stock" ? "bg-amber-500" : 
                                         med.status === "Out of Stock" ? "bg-rose-500" : 
                                         med.status === "Expiring Soon" ? "bg-rose-600" : "bg-teal-500"
                                      )} style={{ width: `${Math.min((med.stock / 1000) * 100, 100)}%` }} />
                                   </div>
                                </div>
                             </td>
                             <td className="px-8 py-6 font-black text-slate-900 dark:text-white text-sm">${med.price.toFixed(2)}</td>
                             <td className="px-8 py-6 text-right">
                                <button className="p-2 text-slate-400 hover:text-teal-600 transition-colors">
                                   <ArrowUpRight className="w-5 h-5" />
                                </button>
                             </td>
                          </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>
         </div>

         {/* Sidebar: Pending Prescriptions & Suppliers (1/3) */}
         <div className="space-y-8">
            {/* Linked Prescriptions */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
               <div className="flex items-center justify-between">
                  <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                     <ClipboardList className="w-4 h-4" /> Rx Orders
                  </h3>
                  <span className="px-2 py-0.5 bg-teal-500/10 text-teal-600 text-[10px] font-black rounded-lg uppercase">Today</span>
               </div>
               <div className="space-y-4">
                  {pendingOrders.map(order => (
                    <div key={order.id} className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 group cursor-pointer hover:border-teal-500/30 transition-all">
                       <div className="flex items-center justify-between mb-2">
                          <p className="text-xs font-black text-slate-900 dark:text-white">{order.patient}</p>
                          <span className={cn(
                             "text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border",
                             order.status === "Ready" ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" : "bg-amber-500/10 text-amber-600 border-amber-500/20"
                          )}>{order.status}</span>
                       </div>
                       <p className="text-[10px] font-medium text-slate-500 flex items-center gap-2 italic">
                          <Pill className="w-3 h-3" /> {order.med}
                       </p>
                       <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100 dark:border-slate-700/50">
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{order.id}</span>
                          <button className="text-[9px] font-black text-teal-600 uppercase hover:underline">Fulfill Now</button>
                       </div>
                    </div>
                  ))}
               </div>
               <button className="w-full py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg">View All Orders</button>
            </div>

            {/* Supplier Alert */}
            <div className="bg-rose-50 dark:bg-rose-500/5 p-8 rounded-[2.5rem] border border-rose-500/10 space-y-4">
               <div className="flex items-center gap-3 text-rose-600">
                  <Truck className="w-6 h-6" />
                  <h3 className="text-sm font-black uppercase tracking-widest">Supplier Sync</h3>
               </div>
               <p className="text-xs font-bold text-slate-600 dark:text-slate-400 leading-relaxed">
                  2 shipments from <span className="text-rose-600 font-black">MediSupply</span> are delayed. Check logs for details.
               </p>
               <button className="w-full py-2 bg-rose-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest">Open Logistics</button>
            </div>
         </div>
      </div>
    </div>
  );
}
