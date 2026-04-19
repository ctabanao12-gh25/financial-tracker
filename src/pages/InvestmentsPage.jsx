export default function InvestmentsPage() {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-base font-bold text-white">Investments</h2>
        <p className="text-[11px] text-slate-500 mt-0.5">Track your investment portfolio</p>
      </div>

      <div className="flex flex-col items-center justify-center py-28 bg-slate-900 border border-slate-800/80 rounded-2xl text-center px-6">
        <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        </div>
        <h3 className="text-base font-bold text-white mb-2">Investments — Coming Soon</h3>
        <p className="text-sm text-slate-500 max-w-xs">
          Monitor your stocks, crypto, ETFs, and other assets. Track portfolio performance and returns over time.
        </p>
        <span className="mt-5 text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1.5 rounded-lg font-medium">
          In Development
        </span>
      </div>
    </div>
  );
}
