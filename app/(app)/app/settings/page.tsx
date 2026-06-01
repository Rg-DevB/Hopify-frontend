import { 
  Building2,
  Clock,
  Mail,
  Globe,
  Bell,
  Shield
} from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <p className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
          Config / Settings
        </p>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Clinic Settings</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Configure your clinic's general settings and preferences.</p>
      </div>

      {/* Clinic Information */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 bg-teal-50 dark:bg-teal-500/10 rounded-xl flex items-center justify-center">
            <Building2 className="w-5 h-5 text-teal-600 dark:text-teal-400" />
          </div>
          <div>
            <h2 className="font-bold text-lg text-slate-800 dark:text-slate-100">Clinic Information</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Basic details about your practice.</p>
          </div>
        </div>
        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Clinic Name</label>
              <input defaultValue="Hopify Clinic" className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-200 dark:focus:ring-teal-900 outline-none transition-all dark:text-slate-200" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Phone Number</label>
              <input defaultValue="+880 1711-000000" className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-200 dark:focus:ring-teal-900 outline-none transition-all dark:text-slate-200" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Address</label>
            <input defaultValue="123 Medical Street, Dhaka 1200" className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-200 dark:focus:ring-teal-900 outline-none transition-all dark:text-slate-200" />
          </div>
        </div>
      </div>

      {/* Business Hours */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-50 dark:bg-blue-500/10 rounded-xl flex items-center justify-center">
            <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h2 className="font-bold text-lg text-slate-800 dark:text-slate-100">Business Hours</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Set your clinic's operating hours.</p>
          </div>
        </div>
        <div className="p-5">
          <div className="space-y-3">
            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day) => (
              <div key={day} className="flex items-center justify-between py-2 px-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300 w-28">{day}</span>
                <div className="flex items-center gap-2">
                  <input type="time" defaultValue="09:00" className="px-3 py-1.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none dark:text-slate-200" />
                  <span className="text-slate-400">—</span>
                  <input type="time" defaultValue="17:00" className="px-3 py-1.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none dark:text-slate-200" />
                </div>
                <div className="w-10 h-5 rounded-full relative cursor-pointer bg-teal-600">
                  <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 left-[22px] shadow-sm"></div>
                </div>
              </div>
            ))}
            {["Saturday", "Sunday"].map((day) => (
              <div key={day} className="flex items-center justify-between py-2 px-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <span className="text-sm font-medium text-slate-500 dark:text-slate-400 w-28">{day}</span>
                <div className="flex items-center gap-2">
                  <input type="time" defaultValue="00:00" disabled className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none dark:text-slate-500 opacity-50" />
                  <span className="text-slate-300 dark:text-slate-600">—</span>
                  <input type="time" defaultValue="00:00" disabled className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none dark:text-slate-500 opacity-50" />
                </div>
                <div className="w-10 h-5 rounded-full relative cursor-pointer bg-slate-300 dark:bg-slate-700">
                  <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 left-0.5 shadow-sm"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-50 dark:bg-amber-500/10 rounded-xl flex items-center justify-center">
            <Bell className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <h2 className="font-bold text-lg text-slate-800 dark:text-slate-100">Notifications</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Configure how you receive alerts and updates.</p>
          </div>
        </div>
        <div className="divide-y divide-slate-200 dark:divide-slate-800">
          {[
            { label: "Email notifications for new appointments", enabled: true },
            { label: "Push notifications for cancellations", enabled: true },
            { label: "Daily summary email", enabled: false },
            { label: "Patient no-show alerts", enabled: true },
          ].map((item) => (
            <div key={item.label} className="p-5 flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{item.label}</span>
              <div className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${item.enabled ? 'bg-teal-600' : 'bg-slate-300 dark:bg-slate-700'}`}>
                <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-all shadow-sm ${item.enabled ? 'left-[22px]' : 'left-0.5'}`}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Save button */}
      <div className="flex justify-end">
        <button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2.5 rounded-xl font-medium text-sm transition-colors shadow-sm">
          Save All Settings
        </button>
      </div>
    </div>
  )
}
