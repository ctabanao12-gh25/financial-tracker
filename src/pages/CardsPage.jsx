export default function CardsPage() {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-base font-bold text-white">Cards</h2>
        <p className="text-[11px] text-slate-500 mt-0.5">Manage your payment cards</p>
      </div>

      <div className="flex flex-col items-center justify-center py-28 bg-slate-900 border border-slate-800/80 rounded-2xl text-center px-6">
        <div className="w-16 h-16 rounded-2xl bg-[var(--accent-subtle)] flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-[var(--accent-light)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
        </div>
        <h3 className="text-base font-bold text-white mb-2">Cards — Coming Soon</h3>
        <p className="text-sm text-slate-500 max-w-xs">
          Connect and manage your debit and credit cards, view per-card spending, and set card-level budgets.
        </p>
        <span className="mt-5 text-xs bg-[var(--accent-subtle)] text-[var(--accent-light)] border border-[var(--accent-border)] px-3 py-1.5 rounded-lg font-medium">
          In Development
        </span>
      </div>
    </div>
  );
}
