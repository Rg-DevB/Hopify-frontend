export default function WidgetPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-8 max-w-md w-full text-center">
        <div className="w-12 h-12 bg-teal-600 rounded-xl flex items-center justify-center mx-auto mb-4">
          <span className="text-white font-bold text-xl">M</span>
        </div>
        <h1 className="text-xl font-bold text-slate-900 dark:text-white">Hopify Widget</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">This embeddable widget allows patients to book appointments through AI-powered chat. Configure it in your AI Settings.</p>
      </div>
    </div>
  );
}
