import Sidebar from "@/components/layout/sidebar"
import Topbar from "@/components/layout/topbar"

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 bg-slate-50 dark:bg-slate-950 transition-colors">
          {children}
        </main>
      </div>
    </div>
  )
}
