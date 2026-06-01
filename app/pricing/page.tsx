import Link from "next/link";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "$49",
    description: "Perfect for solo practitioners starting out.",
    features: ["Up to 50 appointments/mo", "1 AI agent", "Email reminders", "Basic analytics"],
    accent: "teal",
  },
  {
    name: "Professional",
    price: "$99",
    description: "For growing clinics with moderate volume.",
    features: ["Unlimited appointments", "3 AI agents", "SMS + Email reminders", "Advanced analytics", "Priority support"],
    accent: "indigo",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$299",
    description: "For multi-location clinics and hospitals.",
    features: ["Everything in Professional", "Unlimited AI agents", "Custom branding", "API access", "Dedicated account manager", "HIPAA compliant"],
    accent: "violet",
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-20 px-4">
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">Simple, transparent pricing</h1>
        <p className="text-lg text-slate-500 dark:text-slate-400 mt-4">Choose the plan that fits your clinic. Cancel anytime.</p>
      </div>
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div key={plan.name} className={`bg-white dark:bg-slate-900 rounded-2xl border shadow-sm p-8 flex flex-col relative ${plan.popular ? 'border-indigo-500 dark:border-indigo-500 ring-2 ring-indigo-500/20' : 'border-slate-200 dark:border-slate-800'}`}>
            {plan.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full">Most Popular</span>
            )}
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">{plan.name}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">{plan.description}</p>
            <div className="mt-6 mb-6">
              <span className="text-4xl font-extrabold text-slate-900 dark:text-white">{plan.price}</span>
              <span className="text-slate-500 dark:text-slate-400">/month</span>
            </div>
            <ul className="space-y-3 flex-1">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                  <Check className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <Link href="/signup" className="mt-8">
              <button className={`w-full py-2.5 rounded-xl font-medium text-sm transition-colors shadow-sm ${plan.popular ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700'}`}>
                Get Started
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
