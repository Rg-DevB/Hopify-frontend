import { 
  Sparkles, 
  MessageSquare, 
  Clock, 
  Globe, 
  Shield, 
  Zap,
  Bot,
  BrainCircuit,
  CheckCircle2
} from "lucide-react"
import { cn } from "@/lib/utils"

const aiFeatures = [
  {
    title: "Smart Booking Assistant",
    description: "Let patients book, reschedule, or cancel appointments through natural conversation powered by Claude AI.",
    icon: MessageSquare,
    enabled: true,
  },
  {
    title: "Auto-Reply & Triage",
    description: "AI automatically responds to common patient inquiries and triages urgent requests to staff.",
    icon: Zap,
    enabled: true,
  },
  {
    title: "Appointment Reminders",
    description: "Automatically send intelligent appointment reminders via email or chat before scheduled visits.",
    icon: Clock,
    enabled: false,
  },
  {
    title: "Multi-language Support",
    description: "AI assistant communicates with patients in their preferred language for a seamless experience.",
    icon: Globe,
    enabled: false,
  },
];

export default function AISettingsPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
            Config / AI Settings
          </p>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">AI Agent Configuration</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Customize how your AI booking assistant behaves and interacts with patients.</p>
        </div>
      </div>

      {/* AI Status Card */}
      <div className="bg-gradient-to-r from-teal-600 to-cyan-600 p-6 rounded-2xl shadow-lg text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
          <BrainCircuit className="w-full h-full" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-bold text-lg">Claude AI Agent</h2>
              <p className="text-teal-100 text-sm">Powered by Anthropic</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 mt-4">
            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
              <span className="text-sm font-medium">Agent Active</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span className="text-sm font-medium">42 conversations today</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl flex items-center gap-2">
              <Shield className="w-4 h-4 text-blue-300" />
              <span className="text-sm font-medium">HIPAA Compliant</span>
            </div>
          </div>
        </div>
      </div>

      {/* AI Features Toggle */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm divide-y divide-slate-200 dark:divide-slate-800 overflow-hidden transition-colors">
        <div className="p-5">
          <h2 className="font-bold text-lg text-slate-800 dark:text-slate-100">AI Features</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Enable or disable specific AI capabilities for your clinic.</p>
        </div>
        {aiFeatures.map((feature) => (
          <div key={feature.title} className="p-5 flex items-center justify-between gap-6 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
            <div className="flex items-start gap-4">
              <div className={cn(
                "w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border transition-colors",
                feature.enabled 
                  ? "bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-100 dark:border-teal-500/20" 
                  : "bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border-slate-200 dark:border-slate-700"
              )}>
                <feature.icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white">{feature.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{feature.description}</p>
              </div>
            </div>
            <div className={cn(
              "w-11 h-6 rounded-full relative cursor-pointer transition-colors shrink-0",
              feature.enabled ? "bg-teal-600" : "bg-slate-300 dark:bg-slate-700"
            )}>
              <div className={cn(
                "w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all shadow-sm",
                feature.enabled ? "left-[22px]" : "left-0.5"
              )}></div>
            </div>
          </div>
        ))}
      </div>

      {/* Prompt Configuration */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
        <div className="p-5 border-b border-slate-200 dark:border-slate-800">
          <h2 className="font-bold text-lg text-slate-800 dark:text-slate-100">System Prompt</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Customize the AI's base instructions and personality.</p>
        </div>
        <div className="p-5">
          <textarea
            rows={6}
            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-mono focus:border-teal-500 focus:ring-2 focus:ring-teal-200 dark:focus:ring-teal-900 outline-none transition-all dark:text-slate-200"
            defaultValue={`You are a medical booking assistant for Hopify clinic. Help patients book, reschedule, or cancel appointments. Be professional, empathetic, and concise. Always confirm patient details before making changes. Never provide medical advice — direct patients to schedule a consultation instead.`}
          />
          <div className="flex justify-end mt-4">
            <button className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-xl font-medium text-sm transition-colors shadow-sm">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
